/*
  Warnings:

  - You are about to drop the column `lifetimeClicks` on the `EntryAnalytics` table. All the data in the column will be lost.
  - You are about to drop the column `linkId` on the `EntryAnalytics` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `EntryAnalytics` table. All the data in the column will be lost.
  - Added the required column `appId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `EntryAnalytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EntryAnalytics" DROP CONSTRAINT "EntryAnalytics_linkId_fkey";

-- DropForeignKey
ALTER TABLE "EntryAnalytics" DROP CONSTRAINT "EntryAnalytics_reviewId_fkey";

-- DropIndex
DROP INDEX "EntryAnalytics_linkId_key";

-- DropIndex
DROP INDEX "EntryAnalytics_reviewId_key";

-- AlterTable
ALTER TABLE "EntryAnalytics" DROP COLUMN "lifetimeClicks",
DROP COLUMN "linkId",
DROP COLUMN "reviewId",
ADD COLUMN     "appId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "eventProperties" JSONB,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT;
