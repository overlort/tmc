// import { IOrder } from "@/entities/order/model/order.types";

export type Statuses = "IN_STOCK" | "ISSUED" | "NOT_AVAILABLE";

export interface IItem {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  quantity: number;
  status: Statuses;
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