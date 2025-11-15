-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'READ', 'REPLIED');

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(500) NOT NULL,
    "message" TEXT NOT NULL,
    "ip" VARCHAR(100),
    "userAgent" TEXT,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_createdAt_idx" ON "contact"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "contact_status_idx" ON "contact"("status");
