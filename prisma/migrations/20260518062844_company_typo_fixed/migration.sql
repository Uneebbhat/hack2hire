/*
  Warnings:

  - You are about to drop the column `comapnyEmail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `comapnyName` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyEmail]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyEmail` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_comapnyEmail_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "comapnyEmail",
DROP COLUMN "comapnyName",
ADD COLUMN     "companyEmail" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyEmail_key" ON "Company"("companyEmail");
