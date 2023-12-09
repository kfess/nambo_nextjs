/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Payee" DROP CONSTRAINT "Payee_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId");

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "eventId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payee" ALTER COLUMN "paymentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "id",
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payee" ADD CONSTRAINT "Payee_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("paymentId") ON DELETE RESTRICT ON UPDATE CASCADE;
