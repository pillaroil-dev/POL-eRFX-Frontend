/*
  Warnings:

  - You are about to drop the column `documentPassword` on the `bid_placements` table. All the data in the column will be lost.
  - Added the required column `document_password` to the `bid_placements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bid_placements" DROP COLUMN "documentPassword",
ADD COLUMN     "document_password" TEXT NOT NULL;
