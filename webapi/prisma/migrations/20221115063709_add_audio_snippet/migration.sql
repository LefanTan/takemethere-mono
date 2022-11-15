-- CreateTable
CREATE TABLE "AudioSnippet" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pageEntryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AudioSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AudioSnippet_pageEntryId_key" ON "AudioSnippet"("pageEntryId");

-- AddForeignKey
ALTER TABLE "AudioSnippet" ADD CONSTRAINT "AudioSnippet_pageEntryId_fkey" FOREIGN KEY ("pageEntryId") REFERENCES "PageEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
