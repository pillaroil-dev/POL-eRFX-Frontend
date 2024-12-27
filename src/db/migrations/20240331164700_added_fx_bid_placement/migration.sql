-- CreateTable
CREATE TABLE "fx_bid_placement" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'placed',
    "amount" TEXT NOT NULL,
    "fx_id" INTEGER NOT NULL,
    "bidder_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fx_bid_placement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fx_bid_placement" ADD CONSTRAINT "fx_bid_placement_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx_bid_placement" ADD CONSTRAINT "fx_bid_placement_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "fx_bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
