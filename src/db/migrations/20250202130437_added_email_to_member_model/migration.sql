/*
  Warnings:

  - Added the required column `email` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "member" ADD COLUMN     "email" TEXT NOT NULL;
