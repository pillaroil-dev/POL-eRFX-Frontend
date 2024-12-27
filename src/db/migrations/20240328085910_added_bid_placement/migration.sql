-- AlterTable
ALTER TABLE "file" ADD COLUMN     "bidPlacementId" INTEGER;

-- CreateTable
CREATE TABLE "bid_placements" (
    "id" SERIAL NOT NULL,
    "documentPassword" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'placed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractorId" INTEGER NOT NULL,
    "tenderId" INTEGER NOT NULL,

    CONSTRAINT "bid_placements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_bidPlacementId_fkey" FOREIGN KEY ("bidPlacementId") REFERENCES "bid_placements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_placements" ADD CONSTRAINT "bid_placements_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_placements" ADD CONSTRAINT "bid_placements_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
