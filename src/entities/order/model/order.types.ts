import { Item } from "@prisma/client";

export interface IOrder {
  id: number;
  createdAt: Date;
  dueDate?: Date | null;
  initiator: string;
  comment?: string | null;
  itemName: string;
  quantity: number;
  items?: Item[] | null;
}
export interface CreateOrder {
  dueDate?: Date | null;
  initiator: string;
  comment?: string | null;
  itemName: string;
  quantity: number;
  items?: Item[];
}