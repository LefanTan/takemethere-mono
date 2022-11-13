import express from "express";
import { body, validationResult } from "express-validator";
import { prisma } from "src/config";
import { authenticateJWT } from "src/middlewares/auth";
import { AuthorizedRequest } from "src/types/request";

const blogRoutes = express.Router();

blogRoutes.get("/:blogId", async (req, res) => {
  // #swagger.summary = 'Grab a Blog based on blog id'
  // #swagger.tags = ['Blog']

  try {
    const { blogId } = req.params;

    const result = await prisma.blog.findUniqueOrThrow({
      where: {
        id: blogId,
      },
    });

    return res.json(result);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

blogRoutes.put(
  "/update/:pageEntryId/blog/:blogId",
  body("blog").notEmpty(),
  authenticateJWT,
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Update the authenticated user\'s Blog based on blog id'
    // #swagger.parameter[''] = 'Update the authenticated user's Blog based on blog id'
    // #swagger.tags = ['Blog']

    const errors = validationResult(req);

    // If validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { blogId } = req.params;

      const result = await prisma.pageEntry.findFirstOrThrow({
        where: {
          id: req.params.pageEntryId,
        },
        include: {
          blog: true,
        },
      });

      if (result.blog?.id === blogId) {
        await prisma.blog.update({
          where: {
            id: blogId,
          },
          data: req.body.blog,
        });
        return res.json(result.blog);
      } else
        return res
          .status(400)
          .send({ error: "BlogId doesn't belong to PageEntryId" });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
);

export default blogRoutes;
