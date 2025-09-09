
import { Category } from "@prisma/client";

export type Statuses = "IN_STOCK" | "ISSUED" | "NOT_AVAILABLE";

export interface IItem {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  quantity: number;
  status: Statuses;
  categoryId?: string;
  category?: Category
  // orderId?: number | null;
  // order?: IOrder;
}

export interface CreateItem {
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  quantity: number;
  status: Statuses;
}

export interface ItemForm {
  name: string;
  quantity: number;
  price: number;
  code: string;
}