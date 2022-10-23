import { PrismaClient } from "@prisma-client/index";
import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { isProduction } from "./helpers/misc";

/**
 * Initialize admin
 */
const firebaseAdmin = admin.initializeApp();

/**
 * Instantiate the PrismaClient. Only one instance should be created
 */
const prisma = new PrismaClient();

export { prisma, firebaseAdmin };
