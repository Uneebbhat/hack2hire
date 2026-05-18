-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "comapnyName" TEXT NOT NULL,
    "comapnyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_comapnyEmail_key" ON "Company"("comapnyEmail");
