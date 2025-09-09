
import { Category } from "@prisma/client";
import { IIncome } from "@/entities/income/model/income.type";

// export type Statuses = "IN_STOCK" | "ISSUED" | "NOT_AVAILABLE";

export interface IItem {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string | null;
  quantity: number;
  categoryId: string | null;
  incomeId: number | null;
}

export interface CreateItem {
  name: string;
  photoUrl?: string;
  inventoryNumber?: string;
  quantity: number;
  incomeId?: number;
}

export interface ItemForm {
  name: string;
  quantity: number;
  price: number;
  code: string;
}

export interface ItemWithCategory extends IItem {
  category: Category | null;
}
export interface ItemWithIncome extends IItem {
  income: IIncome | null;
}