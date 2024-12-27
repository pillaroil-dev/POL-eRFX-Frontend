-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_contractor_id_fkey";

-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_bid_id_fkey";

-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_contractor_id_fkey";

-- AlterTable
ALTER TABLE "bid" ALTER COLUMN "contractor_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipients" ALTER COLUMN "contractor_id" DROP NOT NULL,
ALTER COLUMN "bid_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
