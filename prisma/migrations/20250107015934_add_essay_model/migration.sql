-- CreateTable
CREATE TABLE "Essay" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileLink" TEXT NOT NULL,

    CONSTRAINT "Essay_pkey" PRIMARY KEY ("id")
);
