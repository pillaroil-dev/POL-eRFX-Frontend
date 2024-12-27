/*
  Warnings:

  - You are about to drop the `Recepients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recepients" DROP CONSTRAINT "Recepients_bid_id_fkey";

-- DropForeignKey
ALTER TABLE "Recepients" DROP CONSTRAINT "Recepients_contractorId_fkey";

-- DropTable
DROP TABLE "Recepients";

-- CreateTable
CREATE TABLE "recepients" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contractorId" INTEGER NOT NULL,
    "bid_id" INTEGER NOT NULL,

    CONSTRAINT "recepients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recepients_email_key" ON "recepients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recepients_contractorId_key" ON "recepients"("contractorId");

-- AddForeignKey
ALTER TABLE "recepients" ADD CONSTRAINT "recepients_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepients" ADD CONSTRAINT "recepients_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
