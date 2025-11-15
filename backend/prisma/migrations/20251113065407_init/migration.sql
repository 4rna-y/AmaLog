/*
  Warnings:

  - The primary key for the `contact` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "contact" DROP CONSTRAINT "contact_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "contact_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "contact_id_seq";
