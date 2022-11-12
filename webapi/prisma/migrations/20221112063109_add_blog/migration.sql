-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pageEntryId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_pageEntryId_key" ON "Blog"("pageEntryId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_pageEntryId_fkey" FOREIGN KEY ("pageEntryId") REFERENCES "PageEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
