/*
  Warnings:

  - You are about to drop the column `comapnyId` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "comapnyId",
ADD COLUMN     "companyId" TEXT;
