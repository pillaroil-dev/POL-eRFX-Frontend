-- CreateTable
CREATE TABLE "recipients" (
    "id" SERIAL NOT NULL,
    "contractor_id" INTEGER,
    "tender_id" INTEGER,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipients_contractor_id_key" ON "recipients"("contractor_id");

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
