-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payerId_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
