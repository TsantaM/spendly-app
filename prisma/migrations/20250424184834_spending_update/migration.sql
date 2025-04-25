/*
  Warnings:

  - You are about to drop the `Incomes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incomes" DROP CONSTRAINT "Incomes_UserId_fkey";

-- DropTable
DROP TABLE "Incomes";

-- CreateTable
CREATE TABLE "Spending" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "motif" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spending_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spending" ADD CONSTRAINT "Spending_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
