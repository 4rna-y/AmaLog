/*
  Warnings:

  - You are about to drop the `keyPair` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."keyPair";

-- CreateTable
CREATE TABLE "keyValuePair" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyValuePair_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "keyValuePair_key_key" ON "keyValuePair"("key");
