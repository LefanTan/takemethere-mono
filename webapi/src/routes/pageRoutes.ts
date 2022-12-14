/**
 * Everything that relates to User
 */

import { PageEntry } from "@prisma/client";
import express from "express";
import { body, validationResult } from "express-validator";

import { prisma } from "../config";
import { authenticateJWT } from "../middlewares/auth";
import { AuthorizedRequest } from "../types/request";
import { PageEntriesWithData } from "@common/types/client";

const pageRoutes = express.Router();

/**
 * Grab the Authorized user's page entries sorted by updatedAt
 */
pageRoutes.get(
  "/:pageId/entries",
  authenticateJWT,
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Grab the authenticated user's page, page entries sorted by updatedAt'
    // #swagger.parameters['page'] = { description: 'How many page entries to skip (page * pageSize)' }
    // #swagger.parameters['pageSize'] = { description: 'How many page entries to take' }
    // #swagger.tags = ['Pages']
    /* #swagger.responses[200] = {
      description: 'Returns ',
    } */

    try {
      const uid = req.uid ?? "";

      const entries = await getPageEntriesByPage(req.params.pageId, uid, 0, 50);

      return res.json(entries);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

/**
 * Get the authenticated user's page (without entries)
 */
pageRoutes.get("/", authenticateJWT, async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Get the authenticated user\'s page (without entries)'
  // #swagger.tags = ['Pages']
  /* #swagger.responses[200] = {
      description: 'Returns the user\'s page'
    } */

  try {
    const result = await prisma.page.findUniqueOrThrow({
      where: {
        userId: req.uid,
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

/**
 * Grab the user\'s page given a username
 * TODO: Change this get a paginated GetPageEntries instead
 */
pageRoutes.get("/:username/page", async (req, res) => {
  // #swagger.summary = 'Grab the user\'s page given a username'
  // #swagger.tags = ['Pages']
  /* #swagger.responses[200] = {
      description: 'Returns the user\'s page'
    } */

  try {
    const username = req.params.username;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
      include: {
        page: {
          include: {
            pageEntries: {
              orderBy: {
                order: "desc",
              },
              where: {
                OR: [{ hidden: false }, { hidden: null }],
              },
              include: {
                review: true,
                link: true,
                blog: true,
                audioSnippet: true,
              },
            },
          },
        },
      },
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * TODO: Clean up this function. Add more validation.
 * Update the authenticated user's page and its entries. Page Entries that aren't being passed in are considered as deleted!
 */
pageRoutes.put(
  "/pageEntries",
  body("pageEntries").notEmpty(),
  authenticateJWT,
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

    const pageEntries: PageEntriesWithData[] = req.body.pageEntries;
    if (!pageEntries) {
      return res.status(204).json({ message: "PageEntries not included" });
    }

    try {
      // Prisma upsert task that will create/update all page entries
      const entryTasks: Promise<unknown>[] = [];

      // Create a copy of the original pageEnries, because we're deleting some attributes
      const copiedPageEntries: PageEntriesWithData[] = JSON.parse(
        JSON.stringify(pageEntries)
      );

      // Create/update all page entries
      copiedPageEntries.forEach((entry) => {
        // Delete revoew and link attributes because they don't exist in the db model
        delete entry.review;
        delete entry.link;
        delete entry.blog;
        delete entry.audioSnippet;
        delete entry.click;

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

      // Prisma upsert task that will create/update all links
      const entryItemTasks: Promise<unknown>[] = [];

      // Create/update all entries
      pageEntries.forEach((entry) => {
        // If link object is being passed in
        if (entry.link) {
          entryItemTasks.push(
            prisma.link.upsert({
              where: {
                id: entry.link.id,
              },
              update: entry.link,
              create: entry.link,
            })
          );
        }

        if (entry.review) {
          entryItemTasks.push(
            prisma.review.upsert({
              where: {
                id: entry.review.id,
              },
              update: entry.review,
              create: entry.review,
            })
          );
        }

        if (entry.blog) {
          entryItemTasks.push(
            prisma.blog.upsert({
              where: {
                id: entry.blog.id,
              },
              update: entry.blog,
              create: entry.blog,
            })
          );
        }

        if (entry.audioSnippet) {
          entryItemTasks.push(
            prisma.audioSnippet.upsert({
              where: {
                id: entry.audioSnippet.id,
              },
              update: entry.audioSnippet,
              create: entry.audioSnippet,
            })
          );
        }
      });

      await Promise.all(entryItemTasks);
      return res.sendStatus(200);
    } catch (error) {
      console.error({ error });
    }
  }
);

/**
 * Delete one of the authenticated user\'s pageEntry
 */
pageRoutes.delete(
  "/page/:pageId/entry/:entryId",
  authenticateJWT,
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Delete one of the authenticated user\'s pageEntry'
    // #swagger.tags = ['Pages']
    /* #swagger.responses[200] = {
        description: 'Returns the updated page',
      } */

    try {
      // Try to find a page that matches the req.uid
      // If failed, req.params.pageId doesn't belong to the user
      await prisma.page.findFirstOrThrow({
        where: {
          AND: [{ id: req.params.pageId }, { userId: req.uid }],
        },
      });

      // Delete the entry if previous statement was successful
      await prisma.pageEntry.delete({
        where: {
          id: req.params.entryId,
        },
      });

      return res.json({ message: "Entry deleted" });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

/**
 * Get paginated Page Entries for a given page
 * @param userId
 * @param page
 * @param pageSize
 * @returns
 */
async function getPageEntriesByPage(
  pageId: string,
  userId: string,
  page: number,
  pageSize: number
) {
  const entries = await prisma.pageEntry.findMany({
    where: {
      pageId: pageId,
    },
    include: {
      blog: true,
      review: true,
      link: true,
      audioSnippet: true,
    },
    orderBy: {
      order: "desc",
    },
    skip: page * pageSize,
    take: pageSize,
  });

  // Result is a 1:1 mapping of
  const result = await Promise.all(
    entries.flatMap((entry) => {
      if (entry.link) {
        // Find all analytic count regarding link click, that belonged to the user and entry.link
        return prisma.entryAnalytics.count({
          where: {
            propertyId: userId,
            eventId: "LinkClick",
            eventProperties: {
              path: ["linkId"],
              equals: entry.link.id,
            },
          },
        });
      }

      if (entry.review) {
        // Combine both cta click count
        return prisma.entryAnalytics.count({
          where: {
            propertyId: userId,
            eventId: "ReviewCTAClick",
            eventProperties: {
              path: ["reviewId"],
              equals: entry.review.id,
            },
          },
        });
      }

      if (entry.blog) {
        // Combine both cta click count
        return prisma.entryAnalytics.count({
          where: {
            propertyId: userId,
            eventId: "BlogClick",
            eventProperties: {
              path: ["blogId"],
              equals: entry.blog.id,
            },
          },
        });
      }

      if (entry.audioSnippet) {
        // Combine both cta click count
        return prisma.entryAnalytics.count({
          where: {
            propertyId: userId,
            eventId: "AudioClick",
            eventProperties: {
              path: ["audioSnippetId"],
              equals: entry.audioSnippet.id,
            },
          },
        });
      }

      // No analytic available for this entry type
      return [null];
    })
  );

  const entriesWithClickCount = entries.map(
    (entry, i) =>
      ({
        ...entry,
        click: result[i],
      } as PageEntriesWithData)
  );

  return entriesWithClickCount;
}

export default pageRoutes;
