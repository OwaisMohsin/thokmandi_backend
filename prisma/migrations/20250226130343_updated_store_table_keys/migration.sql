/*
  Warnings:

  - You are about to drop the column `shopUrl` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "shopUrl";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "shopUrl" TEXT;
