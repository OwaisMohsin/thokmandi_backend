/*
  Warnings:

  - You are about to drop the column `longDescription` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SIMPLE', 'VARIABLE', 'AFFILIATE_PRODUCT', 'GROUP_PRODUCT');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'ON_BACKORDER');

-- CreateEnum
CREATE TYPE "BackOrder" AS ENUM ('ALLOW', 'DO_NOT_ALLOW', 'ALLOW_BUT_NOTIFY');

-- CreateEnum
CREATE TYPE "ShippingClass" AS ENUM ('NONE', 'FLAT_RATE', 'PORTUGAL_FLAT_RATE');

-- CreateEnum
CREATE TYPE "TaxStatus" AS ENUM ('TAXABLE', 'SHIPPING_ONLY', 'NONE');

-- CreateEnum
CREATE TYPE "TaxClass" AS ENUM ('STANDARD', 'ZERO_RATE', 'REDUCED_RATE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ONLINE', 'DRAFT');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('VISIBLE', 'SEARCH', 'HIDDEN', 'CATALOG');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "longDescription",
ADD COLUMN     "backOrder" "BackOrder" NOT NULL DEFAULT 'DO_NOT_ALLOW',
ADD COLUMN     "bulkDiscount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "buttonText" TEXT,
ADD COLUMN     "discountPercentage" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "discountedPrice" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "enableReviews" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "from" TIMESTAMP(3),
ADD COLUMN     "height" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "isDownloadable" BOOLEAN DEFAULT false,
ADD COLUMN     "isVirtual" BOOLEAN DEFAULT false,
ADD COLUMN     "length" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "limitOnePerOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lowStockThreshold" INTEGER,
ADD COLUMN     "minQuantity" INTEGER,
ADD COLUMN     "productStatus" "ProductStatus" NOT NULL DEFAULT 'ONLINE',
ADD COLUMN     "productType" "ProductType" NOT NULL,
ADD COLUMN     "productUrl" TEXT,
ADD COLUMN     "purchaseNote" TEXT,
ADD COLUMN     "shippingClass" "ShippingClass" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "shippingRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "stockManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stockQuantity" INTEGER,
ADD COLUMN     "stockStatus" "StockStatus" NOT NULL DEFAULT 'IN_STOCK',
ADD COLUMN     "taxClass" "TaxClass" NOT NULL DEFAULT 'ZERO_RATE',
ADD COLUMN     "taxStatus" "TaxStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "to" TIMESTAMP(3),
ADD COLUMN     "vendorId" INTEGER NOT NULL,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
ADD COLUMN     "weight" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "width" DECIMAL(10,2) DEFAULT 0.0,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "shortDescription" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUpsell" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "upsellProductId" INTEGER NOT NULL,

    CONSTRAINT "ProductUpsell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCrossSell" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "crossSellProductId" INTEGER NOT NULL,

    CONSTRAINT "ProductCrossSell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductGroupItem" (
    "id" SERIAL NOT NULL,
    "parentProductId" INTEGER NOT NULL,
    "childProductId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductGroupItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_productId_categoryId_key" ON "ProductCategory"("productId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTag_productId_tagId_key" ON "ProductTag"("productId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUpsell_productId_upsellProductId_key" ON "ProductUpsell"("productId", "upsellProductId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCrossSell_productId_crossSellProductId_key" ON "ProductCrossSell"("productId", "crossSellProductId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductGroupItem_parentProductId_childProductId_key" ON "ProductGroupItem"("parentProductId", "childProductId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUpsell" ADD CONSTRAINT "ProductUpsell_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUpsell" ADD CONSTRAINT "ProductUpsell_upsellProductId_fkey" FOREIGN KEY ("upsellProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCrossSell" ADD CONSTRAINT "ProductCrossSell_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCrossSell" ADD CONSTRAINT "ProductCrossSell_crossSellProductId_fkey" FOREIGN KEY ("crossSellProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGroupItem" ADD CONSTRAINT "ProductGroupItem_parentProductId_fkey" FOREIGN KEY ("parentProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGroupItem" ADD CONSTRAINT "ProductGroupItem_childProductId_fkey" FOREIGN KEY ("childProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
