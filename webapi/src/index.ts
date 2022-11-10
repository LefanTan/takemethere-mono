import dotenv from "dotenv";
dotenv.config();

import express from "express";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes";
import pageRoutes from "./routes/pageRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import analyticRoutes from "./routes/analyticRoutes";

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
app.use(compression({ threshold: 0 }));
app.use(morgan("combined"));

app.use(express.json()); // support json encoded bodies
app.use(express.text()); // support text/plain
app.use(
  express.urlencoded({
    extended: true,
  })
); // Support application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.json("Welcome to TakeMe's API");
});

app.use("/users", userRoutes);
app.use("/page", pageRoutes);
app.use("/media", mediaRoutes);
app.use("/analytic", analyticRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.listen(port, () =>
  console.log(`[server]: Server is running on port ${port}`)
);
