import { PrismaClient } from "@prisma/client";
import * as admin from "firebase-admin";

const adminApp = require("firebase-admin/app");

/**
 * Initialize admin
 */
const firebaseAdmin = admin.initializeApp({
  credential: adminApp.applicationDefault(),
});

/**
 * Instantiate the PrismaClient. Only one instance should be created
 */
const prisma = new PrismaClient();

export { prisma, firebaseAdmin };
