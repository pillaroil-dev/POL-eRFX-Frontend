/*
  Warnings:

  - You are about to drop the `fx_bids` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fx_bids" DROP CONSTRAINT "fx_bids_bidder_id_fkey";

-- DropForeignKey
ALTER TABLE "fx_bids" DROP CONSTRAINT "fx_bids_fx_id_fkey";

-- DropTable
DROP TABLE "fx_bids";

-- CreateTable
CREATE TABLE "fx_bid" (
    "id" SERIAL NOT NULL,
    "fx_id" INTEGER NOT NULL,
    "bidder_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fx_bid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fx_bid" ADD CONSTRAINT "fx_bid_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx_bid" ADD CONSTRAINT "fx_bid_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "fx_bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
