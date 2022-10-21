import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import cors, { CorsOptions } from "cors";

const openapiSpec = require("../swagger-output.json");

const app = express();
const port = process.env.PORT || 5080;

const allowedOrigins = ["https://takeme.blog"];

const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV !== "production"
      ? "*"
      : function (origin, callback) {
          // allow requests with no origin
          // (like mobile apps or curl requests)
          if (!origin) return callback(null, true);

          console.log(origin);

          if (allowedOrigins.indexOf(origin) === -1) {
            return callback(
              new Error(
                "The CORS policy for this site does not allow access from the specified Origin."
              ),
              false
            );
          }
          return callback(null, true);
        },
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
