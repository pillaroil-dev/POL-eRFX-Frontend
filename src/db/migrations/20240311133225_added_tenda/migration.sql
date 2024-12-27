/*
  Warnings:

  - You are about to drop the column `contractor_id` on the `file` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_contractor_id_fkey";

-- AlterTable
ALTER TABLE "file" DROP COLUMN "contractor_id";
