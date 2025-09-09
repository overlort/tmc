/*
  Warnings:

  - Added the required column `photoUrl` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Income" ADD COLUMN     "photoUrl" TEXT NOT NULL;
