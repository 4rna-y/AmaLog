-- CreateTable
CREATE TABLE "img" (
    "id" TEXT NOT NULL,
    "ext" TEXT NOT NULL,

    CONSTRAINT "img_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "img_id_key" ON "img"("id");
