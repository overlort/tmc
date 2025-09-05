export interface IOrder {
  id: number;
  createdAt: Date;
  dueDate?: Date | null;
  initiator: string;
  comment?: string | null;
  itemName: string;
  quantity: number;
  analogLinks?: string | null;
}