import { PrismaClient } from "@prisma/client";
import * as admin from "firebase-admin";

/**
 * Initialize admin
 */
const firebaseAdmin = admin.initializeApp();

/**
 * Instantiate the PrismaClient. Only one instance should be created
 */
const prisma = new PrismaClient();

export { prisma, firebaseAdmin };
