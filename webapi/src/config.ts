import { PrismaClient } from "@prisma/client";

/**
 * Instantiate the PrismaClient. Only one instance should be created
 */
const prisma = new PrismaClient();

function initConfig() {
  return prisma;
}

export { initConfig, prisma };
