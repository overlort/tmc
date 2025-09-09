/*
  Warnings:

  - You are about to drop the column `status` on the `Item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Item_inventoryNumber_key";

-- AlterTable
ALTER TABLE "public"."Item" DROP COLUMN "status",
ADD COLUMN     "incomeId" INTEGER;

-- DropEnum
DROP TYPE "public"."ItemStatus";

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "public"."Income"("id") ON DELETE SET NULL ON UPDATE CASCADE;
