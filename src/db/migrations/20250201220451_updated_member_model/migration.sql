/*
  Warnings:

  - Added the required column `fullname` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "member" ADD COLUMN     "address" TEXT,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;
