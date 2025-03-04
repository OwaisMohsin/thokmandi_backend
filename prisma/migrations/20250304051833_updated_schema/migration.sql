/*
  Warnings:

  - You are about to drop the column `storeId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_storeId_fkey";

-- DropIndex
DROP INDEX "Address_storeId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "zipCode" TEXT;
