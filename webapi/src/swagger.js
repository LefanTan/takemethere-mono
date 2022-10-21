const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "TakeMe",
    description: "API documentation for TakeMe API",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
