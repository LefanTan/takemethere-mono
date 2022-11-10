import express from "express";
import { prisma } from "src/config";

const analyticRoutes = express.Router();

/**
 * Submit an analytic entry
 */
analyticRoutes.post("/submit", async (req, res) => {
  // #swagger.summary = 'Submit an analytic entry'
  // #swagger.tags = ['Analytic']

  const data = JSON.parse(req.body);
  await prisma.entryAnalytics.create({
    data,
  });

  try {
    return res.json("Received!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default analyticRoutes;
