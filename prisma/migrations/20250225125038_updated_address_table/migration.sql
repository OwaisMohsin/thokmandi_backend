/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "province" DROP NOT NULL;
