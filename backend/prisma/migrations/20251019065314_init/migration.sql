-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'ONLYKNOWSURL', 'UNPUBLISHED');

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tag" TEXT[],
    "coverImgId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT[],
    "likes" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_id_key" ON "blog"("id");
