/*
  Warnings:

  - You are about to drop the column `bid_id` on the `item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_bid_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "bid_id";
