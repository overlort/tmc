export interface IExpense {
  id: number;
  consumableId: number;
  quantity: string; // Prisma Decimal -> string
  date: Date;
  receiver: string;
  comment?: string | null;
}

export interface CreateExpense {
  consumableId: number;
  quantity: string;
  date?: Date;
  receiver: string;
  comment?: string | null;
}


