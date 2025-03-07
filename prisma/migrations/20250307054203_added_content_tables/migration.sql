-- CreateTable
CREATE TABLE "FinTerm" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorTerm" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerTerm" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyerTerm_pkey" PRIMARY KEY ("id")
);
