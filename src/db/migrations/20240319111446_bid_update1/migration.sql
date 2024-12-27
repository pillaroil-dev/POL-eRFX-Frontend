/*
  Warnings:

  - Made the column `contractor_id` on table `bid` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tender_id` on table `bid` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_contractor_id_fkey";

-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_tender_id_fkey";

-- AlterTable
ALTER TABLE "bid" ALTER COLUMN "contractor_id" SET NOT NULL,
ALTER COLUMN "tender_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
