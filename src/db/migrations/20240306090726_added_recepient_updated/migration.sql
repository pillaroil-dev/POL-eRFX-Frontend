/*
  Warnings:

  - You are about to drop the column `email` on the `recepients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "recepients_email_key";

-- AlterTable
ALTER TABLE "recepients" DROP COLUMN "email";
