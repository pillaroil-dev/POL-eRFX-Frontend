/*
  Warnings:

  - A unique constraint covering the columns `[xata_id]` on the table `bid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `bid_placements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `contractor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `fx` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `fx-recipients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `fx_bid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `fx_bid_placement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `fx_bidder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `recipients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `settings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `tender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[xata_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bid" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "bid_placements" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "contractor" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "file" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fx" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fx-recipients" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fx_bid" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fx_bid_placement" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fx_bidder" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tender" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
ADD COLUMN     "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "xata_version" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "bid__pgroll_new_xata_id_key" ON "bid"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "bid_placements__pgroll_new_xata_id_key" ON "bid_placements"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "contractor__pgroll_new_xata_id_key" ON "contractor"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "file__pgroll_new_xata_id_key" ON "file"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "fx__pgroll_new_xata_id_key" ON "fx"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "fx-recipients__pgroll_new_xata_id_key" ON "fx-recipients"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "fx_bid__pgroll_new_xata_id_key" ON "fx_bid"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "fx_bid_placement__pgroll_new_xata_id_key" ON "fx_bid_placement"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "fx_bidder__pgroll_new_xata_id_key" ON "fx_bidder"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "item__pgroll_new_xata_id_key" ON "item"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipients__pgroll_new_xata_id_key" ON "recipients"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "settings__pgroll_new_xata_id_key" ON "settings"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "tender__pgroll_new_xata_id_key" ON "tender"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "user__pgroll_new_xata_id_key" ON "user"("xata_id");
