import express from "express";
import { prisma } from "../config";

/**
 * Everything that relates to User
 */

const userRoutes = express.Router();

userRoutes.get("/email/:username", async (req, res) => {
  // #swagger.tags = ['Users']
  /* #swagger.responses[200] = {
      description: 'Some description...',
      schema: {
         email: 'lefan@gmail.com',
      }
    } */

  const username = req.params.username;

  const email = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      email: true,
    },
  });

  res.json(email);
});

export default userRoutes;
