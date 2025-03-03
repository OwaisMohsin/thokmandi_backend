/*
  Warnings:

  - You are about to drop the column `shopUrl` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "shopUrl",
ADD COLUMN     "storeUrl" TEXT;
