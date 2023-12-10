/*
  Warnings:

  - You are about to drop the column `name` on the `Payee` table. All the data in the column will be lost.
  - You are about to drop the column `payer` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Payee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payee" DROP COLUMN "name",
ADD COLUMN     "memberId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payer",
ADD COLUMN     "payerId" INTEGER NOT NULL;
