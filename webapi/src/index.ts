import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT || 5080;

app.get("/", async (req, res) => {
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "lefantan@hotmail.com",
      username: "lefan",
      homePage: { create: {} },
    },
  });

  console.log(user);
});

app.listen(port, () =>
  console.log(`[server]: Server is running on port ${port}`)
);
