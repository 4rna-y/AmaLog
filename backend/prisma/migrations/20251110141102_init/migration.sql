-- CreateTable
CREATE TABLE "repository" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isProduct" BOOLEAN NOT NULL,
    "langs" TEXT[],
    "content" TEXT[],

    CONSTRAINT "repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repository_id_key" ON "repository"("id");
