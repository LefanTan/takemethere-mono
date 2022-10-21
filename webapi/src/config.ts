import { PrismaClient } from "@prisma/client";
import swaggerJsDoc from "swagger-jsdoc";

// const openapiTS = require("openapi-typescript-codegen");

// /**
//  * Swagger JsDoc Options
//  */
// const options: swaggerJsDoc.Options = {
//   failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "TakeMe API",
//       version: "1.0.0",
//     },
//   },
//   apis: ["./src/routes/*.ts"], // files containing annotations as above
// };
// const openapiSpec = swaggerJsDoc(options);

// // Generate typescript schemas
// openapiTS.generate({ input: openapiSpec, output: "../common/webapi" });

/**
 * Instantiate the PrismaClient. Only one instance should be created
 */
const prisma = new PrismaClient();

export { prisma };
