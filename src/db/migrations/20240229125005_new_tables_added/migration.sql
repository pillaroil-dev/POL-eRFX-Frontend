/*
  Warnings:

  - You are about to drop the column `amount` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `bid` table. All the data in the column will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `bid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_project_id_fkey";

-- DropIndex
DROP INDEX "idx_bid_projectId";

-- AlterTable
ALTER TABLE "bid" DROP COLUMN "amount",
DROP COLUMN "project_id",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "project";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bid_id" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "bid_id" INTEGER NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
