import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const openapiSpec = require("../swagger-output.json");

const app = express();
const port = process.env.PORT || 5080;

const corsOptions = {
  origin: process.env.NODE_ENV !== "production" ? "*" : "*.takeme.blog",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
); // Support application/x-www-form-urlencoded

app.use("/users", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.listen(port, () =>
  console.log(`[server]: Server is running on port ${port}`)
);
