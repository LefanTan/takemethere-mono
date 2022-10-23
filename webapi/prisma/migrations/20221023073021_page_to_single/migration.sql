/*
  Warnings:

  - You are about to drop the column `userId` on the `Page` table. All the data in the column will be lost.
  - Added the required column `pageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_userId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
