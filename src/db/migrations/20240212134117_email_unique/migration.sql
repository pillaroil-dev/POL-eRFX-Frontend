/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contractor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contractor_email_key" ON "contractor"("email");
