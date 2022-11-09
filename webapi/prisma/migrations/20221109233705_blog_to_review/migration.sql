/*
  Warnings:

  - You are about to drop the column `blogId` on the `EntryAnalytics` table. All the data in the column will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `EntryAnalytics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pageEntryId_fkey";

-- DropForeignKey
ALTER TABLE "EntryAnalytics" DROP CONSTRAINT "EntryAnalytics_blogId_fkey";

-- DropIndex
DROP INDEX "EntryAnalytics_blogId_key";

-- AlterTable
ALTER TABLE "EntryAnalytics" DROP COLUMN "blogId",
ADD COLUMN     "reviewId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Blog";

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "location" TEXT,
    "externalLink" TEXT,
    "pageEntryId" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "shortReview" TEXT,
    "firstButtonText" TEXT,
    "firstButtonLink" TEXT,
    "secondButtonText" TEXT,
    "secondButtonLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_pageEntryId_key" ON "Review"("pageEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "EntryAnalytics_reviewId_key" ON "EntryAnalytics"("reviewId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_pageEntryId_fkey" FOREIGN KEY ("pageEntryId") REFERENCES "PageEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryAnalytics" ADD CONSTRAINT "EntryAnalytics_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
