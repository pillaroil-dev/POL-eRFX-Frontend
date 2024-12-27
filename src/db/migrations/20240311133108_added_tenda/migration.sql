/*
  Warnings:

  - You are about to drop the column `bid_id` on the `file` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_bid_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_contractor_id_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_tender_id_fkey";

-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "contractor_id" INTEGER;

-- AlterTable
ALTER TABLE "file" DROP COLUMN "bid_id",
ALTER COLUMN "contractor_id" DROP NOT NULL,
ALTER COLUMN "tender_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "idx_bid_contractorId" ON "bid"("contractor_id");

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
