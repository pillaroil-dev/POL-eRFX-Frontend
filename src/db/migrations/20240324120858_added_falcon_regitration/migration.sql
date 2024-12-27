/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `contractor` table. All the data in the column will be lost.
  - You are about to drop the column `bid_balance` on the `contractor` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `contractor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contractor" DROP COLUMN "avatar_url",
DROP COLUMN "bid_balance",
DROP COLUMN "rating",
ADD COLUMN     "falcon_registration" BOOLEAN DEFAULT false;
