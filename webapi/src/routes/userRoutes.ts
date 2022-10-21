import express from "express";
import { prisma } from "../config";

/**
 * Everything that relates to User
 */

const userRoutes = express.Router();

userRoutes.get("/email/:username", async (req, res) => {
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
