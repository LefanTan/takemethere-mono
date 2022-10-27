-- AlterTable
ALTER TABLE "PageEntry" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileMediaUrl" TEXT;
