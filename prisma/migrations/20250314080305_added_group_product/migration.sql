/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `parentProductId` on the `ProductGroupItem` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `ProductGroupItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,childProductId]` on the table `ProductGroupItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ProductGroupItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductGroupItem" DROP CONSTRAINT "ProductGroupItem_parentProductId_fkey";

-- DropIndex
DROP INDEX "ProductGroupItem_parentProductId_childProductId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "ProductGroupItem" DROP COLUMN "parentProductId",
DROP COLUMN "sortOrder",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductGroupItem_productId_childProductId_key" ON "ProductGroupItem"("productId", "childProductId");

-- AddForeignKey
ALTER TABLE "ProductGroupItem" ADD CONSTRAINT "ProductGroupItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
