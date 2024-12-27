-- CreateTable
CREATE TABLE "fx_bids" (
    "id" SERIAL NOT NULL,
    "fx_id" INTEGER NOT NULL,
    "bidder_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fx_bids_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fx_bids" ADD CONSTRAINT "fx_bids_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx_bids" ADD CONSTRAINT "fx_bids_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "fx_bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
