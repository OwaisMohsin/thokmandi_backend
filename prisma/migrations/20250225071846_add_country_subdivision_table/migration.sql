-- CreateEnum
CREATE TYPE "DivisionType" AS ENUM ('CANTON', 'PROVINCE', 'REGION', 'COUNTY');

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "has_subdivision" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDivision" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DivisionType" NOT NULL,
    "countryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubDivision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubDivision" ADD CONSTRAINT "SubDivision_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
