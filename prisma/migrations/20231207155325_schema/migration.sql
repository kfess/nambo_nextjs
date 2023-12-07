/*
  Warnings:

  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `otherNames` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `payer` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "name",
DROP COLUMN "otherNames",
ADD COLUMN     "payer" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Payee" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Payee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payee" ADD CONSTRAINT "Payee_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
