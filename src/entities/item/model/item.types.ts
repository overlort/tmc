import { IOrder } from "@/entities/order/model/order.types";

export interface IItem {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  quantity: number;
  status: "IN_STOCK" | "ISSUED" | "NOT_AVAILABLE";
  // orderId?: number | null;
  // order?: IOrder;
}

export interface CreateItem {
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  quantity: number;
  status: "IN_STOCK" | "ISSUED" | "NOT_AVAILABLE";
}