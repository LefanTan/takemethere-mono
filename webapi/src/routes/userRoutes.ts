import express from "express";
import { check, validationResult } from "express-validator";
import authenticateJWT from "src/middlewares/auth";
import { AuthorizedRequest } from "src/types/request";
import { firebaseAdmin, prisma } from "../config";

/**
 * Everything that relates to User
 */

const userRoutes = express.Router();

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

userRoutes.get("/", authenticateJWT, async (req: AuthorizedRequest, res) => {
  // #swagger.summary = 'Get User data through JWT'
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
