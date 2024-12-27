/*
  Warnings:

  - You are about to drop the column `quantity` on the `item` table. All the data in the column will be lost.
  - Added the required column `path` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "item" DROP COLUMN "quantity",
ADD COLUMN     "cost" TEXT NOT NULL,
ADD COLUMN     "unit" INTEGER NOT NULL;
