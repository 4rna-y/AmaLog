/*
  Warnings:

  - You are about to drop the `blogContentUpdate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."blogContentUpdate" DROP CONSTRAINT "blogContentUpdate_blogUpdateId_fkey";

-- DropTable
DROP TABLE "public"."blogContentUpdate";

-- CreateTable
CREATE TABLE "blogUpdateContent" (
    "id" TEXT NOT NULL,
    "blogUpdateId" TEXT NOT NULL,
    "type" "blogUpdateType" NOT NULL,
    "line" INTEGER NOT NULL,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,

    CONSTRAINT "blogUpdateContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogUpdateContent_id_key" ON "blogUpdateContent"("id");

-- AddForeignKey
ALTER TABLE "blogUpdateContent" ADD CONSTRAINT "blogUpdateContent_blogUpdateId_fkey" FOREIGN KEY ("blogUpdateId") REFERENCES "blogUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
