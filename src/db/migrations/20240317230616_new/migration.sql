/*
  Warnings:

  - Added the required column `quantity` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "cost" DROP NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL,
ALTER COLUMN "unit" SET DATA TYPE TEXT;
