/*
  Warnings:

  - Added the required column `type` to the `blogContentUpdate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "blogUpdateType" AS ENUM ('CATEGORY', 'TAG', 'COVERIMGID', 'STATUS', 'TITLE', 'CONTENTS');

-- AlterTable
ALTER TABLE "blogContentUpdate" ADD COLUMN     "type" "blogUpdateType" NOT NULL;
