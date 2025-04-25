-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "revision_date" TIMESTAMP(3),
ADD COLUMN     "revision_notes" TEXT;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "revision_date" TIMESTAMP(3),
ADD COLUMN     "revision_notes" TEXT;
