
export interface IOrder {
  id: number;
  createdAt: Date;
  dueDate?: Date | null;
  initiator: string;
  comment?: string | null;
  itemName: string;
  quantity: number;
}
export interface CreateOrder {
  dueDate?: Date | null;
  initiator: string;
  comment?: string | null;
  itemName: string;
  quantity: number;
}