/**
 * Everything that relates to User
 */

import { PageEntry } from "@prisma/client";
import express from "express";
import { body, validationResult } from "express-validator";

import { prisma } from "../config";
import authenticateJWT from "../middlewares/auth";
import { AuthorizedRequest } from "../types/request";
import {
  PageEntriesWithBlogAndLink,
  PageWithEntries,
} from "@common/types/client";

const pageRoutes = express.Router();

/**
 * Grab the user's page, page entries sorted by updatedAt
 */
pageRoutes.get("/", authenticateJWT, async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Grab the authenticated user's page, page entries sorted by updatedAt'
  // #swagger.tags = ['Pages']
  /* #swagger.responses[200] = {
      description: 'Returns a user',
    } */

  try {
    const uid = req.uid;
    const page = await getPageByUserId(uid!);

    return res.json(page);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

/**
 * Grab the user's page given a username
 */
pageRoutes.get("/:username", async (req, res) => {
  // #swagger.summary = 'Grab the user's page given a username'
  // #swagger.tags = ['Pages']
  /* #swagger.responses[200] = {
      description: 'Returns the user\'s page'
    } */

  try {
    // Find the user belonged to the name passed in username
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: req.params.username,
      },
      include: {
        page: {
          include: {
            pageEntries: {
              include: {
                blog: {
                  include: {
                    entryAnalytics: true,
                  },
                },
                link: {
                  include: {
                    entryAnalytics: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.json(user.page);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

/**
 * Update the authenticated user's page and its entries. Page Entries that aren't being passed in are considered as deleted!
 */
pageRoutes.put(
  "/pageEntries",
  authenticateJWT,
  body("pageEntries").notEmpty(),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Update the authenticated user\'s page.'
    /* #swagger.parameters['body'] = {
          in: 'body',
      } */
    // #swagger.tags = ['Pages']
    /* #swagger.responses[200] = {
        description: 'Returns the updated page',
      } */

    const errors = validationResult(req);

    // If validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pageEntries: PageEntriesWithBlogAndLink[] = req.body.pageEntries;
    if (!pageEntries) {
      return res.status(204).json({ message: "PageEntries not included" });
    }
    try {
      const { pageEntries: oldPageEntries } =
        await prisma.page.findFirstOrThrow({
          where: {
            userId: req.uid,
          },
          select: {
            pageEntries: true,
          },
        });

      // Delete entries that aren't being passed in the request body
      await Promise.all(
        oldPageEntries
          .filter((old) => !pageEntries.find((cur) => cur.id === old.id))
          .map((entry) =>
            prisma.pageEntry.delete({
              where: {
                id: entry.id,
              },
            })
          )
      );

      // Prisma upsert task that will create/update all page entries
      const entryTasks: Promise<any>[] = [];

      // Create a copy of the original pageEnries, because we're deleting some attributes
      const copiedPageEntries: PageEntriesWithBlogAndLink[] = JSON.parse(
        JSON.stringify(pageEntries)
      );

      // Create/update all page entries
      copiedPageEntries.forEach((entry) => {
        // Delete blog and link attributes because they don't exist in the db model
        delete entry.blog;
        delete entry.link;

        entryTasks.push(
          prisma.pageEntry.upsert({
            where: {
              id: entry.id,
            },
            update: entry as PageEntry,
            create: entry as PageEntry,
          })
        );
      });

      await Promise.all(entryTasks);

      // Prisma upsert task that will create/update all link or blog links
      const linkAndBlogTasks: Promise<any>[] = [];

      // Create/update all blog and link entries
      pageEntries.forEach((entry) => {
        // If link object is being passed in
        if (entry.link) {
          linkAndBlogTasks.push(
            prisma.link.upsert({
              where: {
                id: entry.link.id,
              },
              update: entry.link,
              create: entry.link,
            })
          );
        }

        if (entry.blog) {
          linkAndBlogTasks.push(
            prisma.blog.upsert({
              where: {
                id: entry.blog.id,
              },
              update: entry.blog,
              create: entry.blog,
            })
          );
        }
      });

      await Promise.all(linkAndBlogTasks);
      return res.sendStatus(200);
    } catch (error) {
      console.error({ error });
    }
  }
);

/**
 * Get page for a given user id
 * @param userId
 * @returns
 */
async function getPageByUserId(userId: string) {
  const page = await prisma.page.findFirstOrThrow({
    where: {
      userId,
    },
    include: {
      pageEntries: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          blog: true,
          link: true,
        },
      },
    },
  });

  return page;
}

export default pageRoutes;
