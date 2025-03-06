/*
  Warnings:

  - You are about to drop the column `hasShippingAddress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasShippingAddress",
ADD COLUMN     "isApprovalRequired" BOOLEAN NOT NULL DEFAULT false;
