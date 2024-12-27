/*
  Warnings:

  - You are about to drop the column `name` on the `contractor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contractor" DROP CONSTRAINT "contractor_userId_fkey";

-- AlterTable
ALTER TABLE "contractor" DROP COLUMN "name",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ALTER COLUMN "contact_info" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "contractor" ADD CONSTRAINT "contractor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
