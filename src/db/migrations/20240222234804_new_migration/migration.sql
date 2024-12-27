/*
  Warnings:

  - You are about to drop the column `contact_info` on the `contractor` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `contractor` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `contractor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contractor" DROP COLUMN "contact_info",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "business_phone" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "home_phone" TEXT;
