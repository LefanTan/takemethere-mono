/*
  Warnings:

  - You are about to drop the column `pageId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_pageId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "pageId";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "pageId";

-- CreateTable
CREATE TABLE "PageEntry" (
    "id" TEXT NOT NULL,
    "linkId" TEXT,
    "blogId" TEXT,
    "pageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageEntry" ADD CONSTRAINT "PageEntry_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageEntry" ADD CONSTRAINT "PageEntry_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageEntry" ADD CONSTRAINT "PageEntry_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
