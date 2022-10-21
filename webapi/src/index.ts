import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { initConfig } from "./config";

dotenv.config();
initConfig();

const app = express();
const port = process.env.PORT || 5080;

app.use("/users", userRoutes);

app.listen(port, () =>
  console.log(`[server]: Server is running on port ${port}`)
);
