import express from "express";
import { check, validationResult } from "express-validator";
import { firebaseAdmin, prisma } from "../config";
import authenticateJWT from "../middlewares/auth";

/**
 * Everything that relates to User
 */

const userRoutes = express.Router();

userRoutes.get("/email/:username", async (req, res) => {
  // #swagger.summary = 'Retrieve email based on a given username'
  // #swagger.tags = ['Users']
  /* #swagger.responses[200] = {
      schema: {
         email: 'lefan@gmail.com',
      }
    } */

  const username = req.params.username;

  const email = await prisma.user
    .findUniqueOrThrow({
      where: {
        username,
      },
      select: {
        email: true,
      },
    })
    .catch((reason) => res.status(404).json({ message: "Username not found" }));
  res.json(email);
});

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

userRoutes.get("/user/:uid/allLinks", authenticateJWT, async (res, req) => {
  // #swagger.summary = 'Grab all the links and blogs created by user, sorted by updatedAt'
  // #swagger.tags = ['Users']
  /* #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $username: 'lefanTan',
                $email: 'lefantan@lol.com',
                password: 'veryNicePassword'
            }
        } */
  /* #swagger.responses[200] = {
      description: 'Returns a list of PageEntry',
      schema: {
        id: 'adfn123nasdfnj1j129',
        email: 'lefan@gmail.com',
        username: 'lefan',
        homePageId: '123'
      }
    } */
});

export default userRoutes;
