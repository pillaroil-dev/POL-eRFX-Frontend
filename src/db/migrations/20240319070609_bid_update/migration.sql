/*
  Warnings:

  - You are about to drop the column `description` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `bid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bid" DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "location",
DROP COLUMN "startDate",
DROP COLUMN "title",
ADD COLUMN     "tender_id" INTEGER;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
