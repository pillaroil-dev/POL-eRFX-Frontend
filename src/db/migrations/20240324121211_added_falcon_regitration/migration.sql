/*
  Warnings:

  - Made the column `falcon_registration` on table `contractor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contractor" ALTER COLUMN "falcon_registration" SET NOT NULL;
