/*
  Warnings:

  - You are about to drop the `recepients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recepients" DROP CONSTRAINT "recepients_bid_id_fkey";

-- DropForeignKey
ALTER TABLE "recepients" DROP CONSTRAINT "recepients_contractorId_fkey";

-- DropTable
DROP TABLE "recepients";

-- CreateTable
CREATE TABLE "recipients" (
    "id" SERIAL NOT NULL,
    "contractor_id" INTEGER NOT NULL,
    "bid_id" INTEGER NOT NULL,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipients_contractor_id_key" ON "recipients"("contractor_id");

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
