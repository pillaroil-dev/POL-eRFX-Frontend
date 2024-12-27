/*
  Warnings:

  - You are about to drop the column `contractorId` on the `bid_placements` table. All the data in the column will be lost.
  - You are about to drop the column `tenderId` on the `bid_placements` table. All the data in the column will be lost.
  - Added the required column `contractor_id` to the `bid_placements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tender_id` to the `bid_placements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bid_placements" DROP CONSTRAINT "bid_placements_contractorId_fkey";

-- DropForeignKey
ALTER TABLE "bid_placements" DROP CONSTRAINT "bid_placements_tenderId_fkey";

-- AlterTable
ALTER TABLE "bid_placements" DROP COLUMN "contractorId",
DROP COLUMN "tenderId",
ADD COLUMN     "contractor_id" INTEGER NOT NULL,
ADD COLUMN     "tender_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bid_placements" ADD CONSTRAINT "bid_placements_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_placements" ADD CONSTRAINT "bid_placements_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
