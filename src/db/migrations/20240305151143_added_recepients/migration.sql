-- CreateTable
CREATE TABLE "Recepients" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contractorId" INTEGER NOT NULL,
    "bid_id" INTEGER NOT NULL,

    CONSTRAINT "Recepients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recepients_email_key" ON "Recepients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recepients_contractorId_key" ON "Recepients"("contractorId");

-- AddForeignKey
ALTER TABLE "Recepients" ADD CONSTRAINT "Recepients_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recepients" ADD CONSTRAINT "Recepients_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
