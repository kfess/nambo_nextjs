/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "memberId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberId_key" ON "Member"("memberId");
