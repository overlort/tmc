import { IExpense } from "@/entities/expense/model/expense.types";
export type Unit =
  | 'PCS'
  | 'BOX'
  | 'PACK'
  | 'L'
  | 'ML'
  | 'KG'
  | 'G'
  | 'M'
  | 'CM';

export interface IConsumable {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  article: string;
  brand: string;
  location: string;
  quantityUnit: Unit;
  quantity: string; // Prisma Decimal -> string in TS client
  price: number;
  comment?: string | null;
  categoryId?: number | null;
}

export interface CreateConsumable {
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  article: string;
  brand: string;
  location: string;
  quantityUnit?: Unit;
  quantity: string;
  price: number;
  comment?: string | null;
  categoryId?: number | null;
}


