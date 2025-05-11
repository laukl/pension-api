-- CreateEnum
CREATE TYPE "SearchStatus" AS ENUM ('FOUND', 'TO_HUNT');

-- AlterTable
ALTER TABLE "PensionPot" ADD COLUMN     "annualFee" DOUBLE PRECISION,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "policyNumber" INTEGER,
ADD COLUMN     "previousAddress" TEXT,
ADD COLUMN     "previousName" TEXT,
ALTER COLUMN "isWorkplacePension" SET DEFAULT false;

-- CreateTable
CREATE TABLE "PotSearch" (
    "id" TEXT NOT NULL,
    "status" "SearchStatus" NOT NULL,
    "foundOn" TIMESTAMP(3) NOT NULL,
    "potId" TEXT NOT NULL,

    CONSTRAINT "PotSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PotSearch_id_key" ON "PotSearch"("id");

-- AddForeignKey
ALTER TABLE "PotSearch" ADD CONSTRAINT "PotSearch_potId_fkey" FOREIGN KEY ("potId") REFERENCES "PensionPot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
