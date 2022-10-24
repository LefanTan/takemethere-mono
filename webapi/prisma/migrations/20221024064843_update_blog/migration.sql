/*
  Warnings:

  - You are about to drop the column `blogId` on the `PageEntry` table. All the data in the column will be lost.
  - You are about to drop the column `linkId` on the `PageEntry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageEntryId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageEntryId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageEntryId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageEntryId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageEntry" DROP CONSTRAINT "PageEntry_blogId_fkey";

-- DropForeignKey
ALTER TABLE "PageEntry" DROP CONSTRAINT "PageEntry_linkId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "pageEntryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "pageEntryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PageEntry" DROP COLUMN "blogId",
DROP COLUMN "linkId";

-- CreateIndex
CREATE UNIQUE INDEX "Blog_pageEntryId_key" ON "Blog"("pageEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_pageEntryId_key" ON "Link"("pageEntryId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_pageEntryId_fkey" FOREIGN KEY ("pageEntryId") REFERENCES "PageEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_pageEntryId_fkey" FOREIGN KEY ("pageEntryId") REFERENCES "PageEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
