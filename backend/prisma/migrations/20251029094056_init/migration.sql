/*
  Warnings:

  - You are about to drop the column `after` on the `blogUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `before` on the `blogUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `line` on the `blogUpdate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."blogUpdate" DROP CONSTRAINT "blogUpdate_blogId_fkey";

-- AlterTable
ALTER TABLE "blogUpdate" DROP COLUMN "after",
DROP COLUMN "before",
DROP COLUMN "line";

-- CreateTable
CREATE TABLE "blogContentUpdate" (
    "id" TEXT NOT NULL,
    "blogUpdateId" TEXT NOT NULL,
    "line" INTEGER NOT NULL,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,

    CONSTRAINT "blogContentUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogContentUpdate_id_key" ON "blogContentUpdate"("id");

-- AddForeignKey
ALTER TABLE "blogUpdate" ADD CONSTRAINT "blogUpdate_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogContentUpdate" ADD CONSTRAINT "blogContentUpdate_blogUpdateId_fkey" FOREIGN KEY ("blogUpdateId") REFERENCES "blogUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
