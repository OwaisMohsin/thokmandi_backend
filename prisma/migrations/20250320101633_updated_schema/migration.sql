/*
  Warnings:

  - You are about to drop the column `openingData` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "openingData",
ADD COLUMN     "openingDate" TEXT;
