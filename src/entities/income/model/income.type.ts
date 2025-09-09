import { ItemForm } from "@/entities/item/model/item.types";

export interface IIncome {
  id: number;
  createdAt: Date;
  creatorName: string;
  incomeNumber: string;
  incomeDate: Date;
  seller: string;
  buyer: string;
}

export interface CreateIncome {
  creatorName: string;
  incomeNumber: string;
  incomeDate: Date;
  photoUrl: string;
  seller: string;
  buyer: string;
}

export interface CreateIncomeForm {
  creatorName: string;
  incomeNumber: string;
  incomeDate: string;
  seller: string;
  photoUrl: string;
  buyer: string;
  items: ItemForm[];
}