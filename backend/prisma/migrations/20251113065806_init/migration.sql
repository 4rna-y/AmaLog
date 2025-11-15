-- DropIndex
DROP INDEX "public"."contact_createdAt_idx";

-- DropIndex
DROP INDEX "public"."contact_status_idx";

-- AlterTable
ALTER TABLE "contact" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "subject" SET DATA TYPE TEXT,
ALTER COLUMN "ip" SET DATA TYPE TEXT;
