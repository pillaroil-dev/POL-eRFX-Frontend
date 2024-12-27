/*
  Warnings:

  - You are about to drop the column `fx_bidder_id` on the `fx` table. All the data in the column will be lost.
  - Made the column `fx_bidder_id` on table `fx-recipients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fx_id` on table `fx-recipients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "fx" DROP CONSTRAINT "fx_fx_bidder_id_fkey";

-- DropForeignKey
ALTER TABLE "fx-recipients" DROP CONSTRAINT "fx-recipients_fx_bidder_id_fkey";

-- DropForeignKey
ALTER TABLE "fx-recipients" DROP CONSTRAINT "fx-recipients_fx_id_fkey";

-- DropIndex
DROP INDEX "idx_fx_fixBidderId";

-- AlterTable
ALTER TABLE "fx" DROP COLUMN "fx_bidder_id";

-- AlterTable
ALTER TABLE "fx-recipients" ALTER COLUMN "fx_bidder_id" SET NOT NULL,
ALTER COLUMN "fx_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_bidder_id_fkey" FOREIGN KEY ("fx_bidder_id") REFERENCES "fx_bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
