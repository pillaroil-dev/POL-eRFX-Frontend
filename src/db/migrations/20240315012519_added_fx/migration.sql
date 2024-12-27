-- CreateTable
CREATE TABLE "settings" (
    "id" INTEGER NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_url" TEXT NOT NULL,
    "app_logo" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fx_bidder" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "business_phone" TEXT,
    "userId" INTEGER,

    CONSTRAINT "fx_bidder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fx_bidder_email_key" ON "fx_bidder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fx_bidder_userId_key" ON "fx_bidder"("userId");

-- AddForeignKey
ALTER TABLE "fx_bidder" ADD CONSTRAINT "fx_bidder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
