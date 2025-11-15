-- CreateTable
CREATE TABLE "blogUpdate" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "line" INTEGER NOT NULL,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogUpdate_id_key" ON "blogUpdate"("id");

-- AddForeignKey
ALTER TABLE "blogUpdate" ADD CONSTRAINT "blogUpdate_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
