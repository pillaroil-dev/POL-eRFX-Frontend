/*
  Warnings:

  - You are about to drop the column `bidPlacementId` on the `file` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_bidPlacementId_fkey";

-- AlterTable
ALTER TABLE "file" DROP COLUMN "bidPlacementId",
ADD COLUMN     "bid_placement_id" INTEGER;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_bid_placement_id_fkey" FOREIGN KEY ("bid_placement_id") REFERENCES "bid_placements"("id") ON DELETE SET NULL ON UPDATE CASCADE;
