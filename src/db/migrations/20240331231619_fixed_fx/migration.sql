/*
  Warnings:

  - You are about to drop the column `fx_id` on the `fx_bid_placement` table. All the data in the column will be lost.
  - Added the required column `fx_bid_id` to the `fx_bid_placement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fx_bid_placement" DROP CONSTRAINT "fx_bid_placement_fx_id_fkey";

-- AlterTable
ALTER TABLE "fx_bid_placement" DROP COLUMN "fx_id",
ADD COLUMN     "fx_bid_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "fx_bid_placement" ADD CONSTRAINT "fx_bid_placement_fx_bid_id_fkey" FOREIGN KEY ("fx_bid_id") REFERENCES "fx_bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
