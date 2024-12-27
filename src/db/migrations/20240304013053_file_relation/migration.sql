/*
  Warnings:

  - Added the required column `contractor_id` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "contractor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
