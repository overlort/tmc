-- CreateEnum
CREATE TYPE "public"."ItemStatus" AS ENUM ('IN_STOCK', 'ISSUED', 'NOT_AVAILABLE');

-- CreateTable
CREATE TABLE "public"."Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "inventoryNumber" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "public"."ItemStatus" NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "initiator" TEXT NOT NULL,
    "comment" TEXT,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "analogLinks" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryNumber_key" ON "public"."Item"("inventoryNumber");

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
