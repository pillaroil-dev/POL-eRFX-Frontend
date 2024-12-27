/*
  Warnings:

  - You are about to drop the column `contractor_id` on the `bid` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_contractor_id_fkey";

-- DropIndex
DROP INDEX "idx_bid_contractorId";

-- AlterTable
ALTER TABLE "bid" DROP COLUMN "contractor_id";
