/*
  Warnings:

  - You are about to drop the column `entryAnalyticsId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimeClicks` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `entryAnalyticsId` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogId]` on the table `EntryAnalytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkId]` on the table `EntryAnalytics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_entryAnalyticsId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_entryAnalyticsId_fkey";

-- DropIndex
DROP INDEX "Blog_entryAnalyticsId_key";

-- DropIndex
DROP INDEX "Link_entryAnalyticsId_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "entryAnalyticsId",
DROP COLUMN "lifetimeClicks";

-- AlterTable
ALTER TABLE "EntryAnalytics" ADD COLUMN     "blogId" TEXT NOT NULL,
ADD COLUMN     "linkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "entryAnalyticsId";

-- CreateIndex
CREATE UNIQUE INDEX "EntryAnalytics_blogId_key" ON "EntryAnalytics"("blogId");

-- CreateIndex
CREATE UNIQUE INDEX "EntryAnalytics_linkId_key" ON "EntryAnalytics"("linkId");

-- AddForeignKey
ALTER TABLE "EntryAnalytics" ADD CONSTRAINT "EntryAnalytics_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryAnalytics" ADD CONSTRAINT "EntryAnalytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
