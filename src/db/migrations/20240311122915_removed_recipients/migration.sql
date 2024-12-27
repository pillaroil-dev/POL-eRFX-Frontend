/*
  Warnings:

  - You are about to drop the `recipients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_bid_id_fkey";

-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_contractor_id_fkey";

-- DropTable
DROP TABLE "recipients";
