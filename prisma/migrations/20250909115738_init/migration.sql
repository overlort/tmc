-- CreateEnum
CREATE TYPE "public"."AssetStatus" AS ENUM ('IN_STOCK', 'DISPOSED');

-- CreateEnum
CREATE TYPE "public"."Unit" AS ENUM ('PCS', 'BOX', 'PACK', 'L', 'ML', 'KG', 'G', 'M', 'CM');

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Asset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "inventoryNumber" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" "public"."AssetStatus" NOT NULL DEFAULT 'IN_STOCK',
    "price" INTEGER NOT NULL,
    "comment" TEXT,
    "categoryId" INTEGER,
    "lastModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Consumable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "inventoryNumber" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "quantityUnit" "public"."Unit" NOT NULL DEFAULT 'PCS',
    "quantity" DECIMAL(65,30) NOT NULL,
    "price" INTEGER NOT NULL,
    "comment" TEXT,
    "categoryId" INTEGER,

    CONSTRAINT "Consumable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "consumableId" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receiver" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Income" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorName" TEXT NOT NULL,
    "incomeNumber" TEXT NOT NULL,
    "incomeDate" TIMESTAMP(3) NOT NULL,
    "seller" TEXT NOT NULL,
    "buyer" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Income_incomeNumber_key" ON "public"."Income"("incomeNumber");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Asset" ADD CONSTRAINT "Asset_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consumable" ADD CONSTRAINT "Consumable_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_consumableId_fkey" FOREIGN KEY ("consumableId") REFERENCES "public"."Consumable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
