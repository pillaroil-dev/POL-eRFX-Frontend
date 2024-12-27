/*
  Warnings:

  - You are about to drop the column `smtp_email` on the `settings` table. All the data in the column will be lost.
  - Added the required column `smtp_user` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" DROP COLUMN "smtp_email",
ADD COLUMN     "smtp_user" TEXT NOT NULL;
