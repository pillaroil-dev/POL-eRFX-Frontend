/*
  Warnings:

  - You are about to drop the column `description` on the `fx` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `fx` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `fx` table. All the data in the column will be lost.
  - Added the required column `currency` to the `fx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `fx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `fx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `fx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fx" DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "fx-recipients" (
    "id" SERIAL NOT NULL,
    "fx_bidder_id" INTEGER,
    "fx_id" INTEGER,

    CONSTRAINT "fx-recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fx-recipients_fx_bidder_id_key" ON "fx-recipients"("fx_bidder_id");

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_bidder_id_fkey" FOREIGN KEY ("fx_bidder_id") REFERENCES "fx_bidder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE SET NULL ON UPDATE CASCADE;
