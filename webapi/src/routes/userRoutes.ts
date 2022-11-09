import express from "express";
import { body, check, validationResult } from "express-validator";
import { authenticateJWT } from "src/middlewares/auth";
import { AuthorizedRequest } from "src/types/request";
import { firebaseAdmin, prisma } from "../config";

/**
 * Everything that relates to User
 */

const userRoutes = express.Router();

/**
 * Check if a given username is available or taken
 */
userRoutes.get("/:username/available", async (req, res) => {
  // #swagger.summary = 'Check if a given username is available or taken'
  // #swagger.tags = ['Users']

  const user = await prisma.user.findFirst({
    where: {
      username: req.params.username,
    },
  });

  if (!user) {
    return res.sendStatus(200);
  }
  return res.status(400).json({ message: "Username taken!" });
});

/**
 * Retrieve email based on a given username
 */
userRoutes.get("/email/:username", async (req, res) => {
  // #swagger.summary = 'Retrieve email based on a given username'
  // #swagger.tags = ['Users']
  /* #swagger.responses[200] = {
      schema: {
         email: 'lefan@gmail.com',
      }
    } */

  try {
    const username = req.params.username;
    const email = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
      select: {
        email: true,
      },
    });

    return res.json(email);
  } catch (error) {
    return res.status(404).json({ message: "Username not found", error });
  }
});

/**
 * Retrieve user object and all page data based on a given username
 */
userRoutes.get("/:username/page", async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Get User data (without page) through JWT'
  // #swagger.tags = ['Users']

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
              include: {
                review: true,
                link: true,
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
 * Retrieve user object (without page)
 */
userRoutes.get("/", authenticateJWT, async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Get User data (without page) through JWT'
  // #swagger.tags = ['Users']

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.uid,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update user data
 */
userRoutes.put("/", authenticateJWT, async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Update TakeMe user data through JWT'
  /*  #swagger.parameters['body'] = {
            in: 'body',
        } */
  // #swagger.tags = ['Users']

  try {
    const user = await prisma.user.update({
      where: {
        id: req.uid,
      },
      data: {
        // TODO: add validation
        ...req.body,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Create a new user. Returns 404 if user already exists
 */
userRoutes.post(
  "/create",

  // Validators
  check("username").exists(),
  check("email").exists().isEmail(),
  check("password").exists(),

  async (req, res) => {
    // #swagger.summary = 'Create a new user. Returns 404 if user already exists'
    // #swagger.tags = ['Users']
    /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $username: 'lefanTan',
                $email: 'lefantan@lol.com',
                password: 'veryNicePassword'
            }
        } */
    /* #swagger.responses[200] = {
      description: 'Returns a user',
      schema: {
        id: 'adfn123nasdfnj1j129',
        email: 'lefan@gmail.com',
        username: 'lefan',
      }
    } */

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;

      // Check if user already exists (if matching username or email since both has to be unique)
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: {
                equals: username,
              },
            },
            {
              email: {
                equals: email,
              },
            },
          ],
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const userRecord = await firebaseAdmin.auth().createUser({
        email: email,
        password: password,
        displayName: username,
      });

      const user = await prisma.user.create({
        data: {
          id: userRecord.uid,
          username,
          displayName: username,
          email,
          // Create a new Page for the user
          page: {
            create: {},
          },
        },
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: "Error creating user", error });
    }
  }
);

export default userRoutes;
