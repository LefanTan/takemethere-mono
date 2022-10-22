/*
  Warnings:

  - You are about to drop the column `homePageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `HomePage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PLAN" AS ENUM ('FREE', 'PREMIUM');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_homePageId_fkey";

-- DropIndex
DROP INDEX "User_homePageId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "homePageId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan" "PLAN" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "HomePage";

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "entryAnalyticsId" TEXT NOT NULL,
    "pageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "location" TEXT,
    "externalLink" TEXT,
    "entryAnalyticsId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "lifetimeClicks" INTEGER NOT NULL DEFAULT 0,
    "pageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryAnalytics" (
    "id" TEXT NOT NULL,
    "lifetimeClicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EntryAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_entryAnalyticsId_key" ON "Link"("entryAnalyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_entryAnalyticsId_key" ON "Blog"("entryAnalyticsId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_entryAnalyticsId_fkey" FOREIGN KEY ("entryAnalyticsId") REFERENCES "EntryAnalytics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_entryAnalyticsId_fkey" FOREIGN KEY ("entryAnalyticsId") REFERENCES "EntryAnalytics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
