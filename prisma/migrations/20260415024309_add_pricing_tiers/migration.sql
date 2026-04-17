/*
  Warnings:

  - You are about to drop the column `deliveryArea` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `Catalog` table. All the data in the column will be lost.
  - Added the required column `tierId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "deliveryArea",
DROP COLUMN "updatedAt",
ADD COLUMN     "addonTv" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tierId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "basePrice",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "PricingTier" (
    "id" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "oldPrice" DECIMAL(10,2),

    CONSTRAINT "PricingTier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PricingTier" ADD CONSTRAINT "PricingTier_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "PricingTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
