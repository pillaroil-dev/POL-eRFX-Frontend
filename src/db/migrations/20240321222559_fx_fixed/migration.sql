-- DropForeignKey
ALTER TABLE "fx-recipients" DROP CONSTRAINT "fx-recipients_fx_bidder_id_fkey";

-- DropForeignKey
ALTER TABLE "fx-recipients" DROP CONSTRAINT "fx-recipients_fx_id_fkey";

-- DropIndex
DROP INDEX "fx-recipients_fx_bidder_id_key";

-- DropIndex
DROP INDEX "recipients_contractor_id_key";

-- AlterTable
ALTER TABLE "fx-recipients" ALTER COLUMN "fx_bidder_id" DROP NOT NULL,
ALTER COLUMN "fx_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_bidder_id_fkey" FOREIGN KEY ("fx_bidder_id") REFERENCES "fx_bidder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fx-recipients" ADD CONSTRAINT "fx-recipients_fx_id_fkey" FOREIGN KEY ("fx_id") REFERENCES "fx"("id") ON DELETE SET NULL ON UPDATE CASCADE;
