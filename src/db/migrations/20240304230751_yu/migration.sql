/*
  Warnings:

  - Added the required column `contractor_id` to the `bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "contractor_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "idx_bid_contractorId" ON "bid"("contractor_id");

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
