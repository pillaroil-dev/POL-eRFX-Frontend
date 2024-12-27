/*
  Warnings:

  - Added the required column `smtp_email` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smtp_host` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smtp_password` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smtp_port` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "smtp_email" TEXT NOT NULL,
ADD COLUMN     "smtp_host" TEXT NOT NULL,
ADD COLUMN     "smtp_password" TEXT NOT NULL,
ADD COLUMN     "smtp_port" TEXT NOT NULL;
