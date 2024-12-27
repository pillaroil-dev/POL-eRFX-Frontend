-- CreateTable
CREATE TABLE "fx" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "fx_bidder_id" INTEGER,

    CONSTRAINT "fx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_fx_fixBidderId" ON "fx"("fx_bidder_id");

-- AddForeignKey
ALTER TABLE "fx" ADD CONSTRAINT "fx_fx_bidder_id_fkey" FOREIGN KEY ("fx_bidder_id") REFERENCES "fx_bidder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
