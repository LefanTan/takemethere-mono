/**
 * Everything that relates to User
 */

import { Page, PageEntry } from "@prisma/client";
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

// All routes must be authenticated
pageRoutes.use(authenticateJWT);

/**
 * Grab the user's page, page entries sorted by updatedAt
 */
pageRoutes.get("/", async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Grab the authenticated user's page, page entries sorted by updatedAt'
  // #swagger.tags = ['Pages']
  /* #swagger.responses[200] = {
      description: 'Returns a user',
    } */

  const uid = req.uid;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
      include: {
        page: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const page = await prisma.page.findFirst({
      where: {
        id: user.page?.id,
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

    return res.json(page);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

/**
 * Update the authenticated user's page and its entries.
 */
pageRoutes.put(
  "/pageEntries",
  body("page").notEmpty(),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Update the authenticated user's page.'
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

    const pageEntries: PageEntriesWithBlogAndLink[] = req.body.page.pageEntries;
    if (!pageEntries) {
      return res.status(204).json({ message: "PageEntries not included" });
    }

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
  }
);

export default pageRoutes;
