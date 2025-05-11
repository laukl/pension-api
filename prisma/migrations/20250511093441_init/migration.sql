-- CreateTable
CREATE TABLE "PensionPot" (
    "id" TEXT NOT NULL,
    "potName" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "annualInterestRate" DOUBLE PRECISION NOT NULL,
    "defaultAnnualInterestRate" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "monthlyPayment" DOUBLE PRECISION NOT NULL,
    "isWorkplacePension" BOOLEAN NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "providerId" TEXT,

    CONSTRAINT "PensionPot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PensionProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PensionProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PensionPot_id_key" ON "PensionPot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PensionProvider_id_key" ON "PensionProvider"("id");

-- AddForeignKey
ALTER TABLE "PensionPot" ADD CONSTRAINT "PensionPot_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "PensionProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
