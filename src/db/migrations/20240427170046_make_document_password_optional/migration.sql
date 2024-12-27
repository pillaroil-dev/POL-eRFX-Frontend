-- AlterTable
ALTER TABLE "bid_placements" ALTER COLUMN "document_password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "settings" ALTER COLUMN "app_name" DROP NOT NULL,
ALTER COLUMN "app_url" DROP NOT NULL,
ALTER COLUMN "app_logo" DROP NOT NULL,
ALTER COLUMN "smtp_host" DROP NOT NULL,
ALTER COLUMN "smtp_password" DROP NOT NULL,
ALTER COLUMN "smtp_port" DROP NOT NULL,
ALTER COLUMN "smtp_user" DROP NOT NULL;
