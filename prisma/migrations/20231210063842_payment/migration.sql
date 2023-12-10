/*
  Warnings:

  - Added the required column `memberId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "memberId" INTEGER NOT NULL;
