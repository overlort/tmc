-- AlterTable
ALTER TABLE "public"."Income" ADD COLUMN     "assetId" INTEGER,
ADD COLUMN     "consumableId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Income" ADD CONSTRAINT "Income_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "public"."Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Income" ADD CONSTRAINT "Income_consumableId_fkey" FOREIGN KEY ("consumableId") REFERENCES "public"."Consumable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
