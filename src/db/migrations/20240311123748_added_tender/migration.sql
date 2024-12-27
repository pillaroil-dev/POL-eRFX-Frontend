/*
  Warnings:

  - You are about to drop the column `contractor_id` on the `bid` table. All the data in the column will be lost.
  - Added the required column `tender_id` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tender_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_contractor_id_fkey";

-- DropIndex
DROP INDEX "idx_bid_contractorId";

-- AlterTable
ALTER TABLE "bid" DROP COLUMN "contractor_id";

-- AlterTable
ALTER TABLE "file" ADD COLUMN     "tender_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "tender_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tender" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
