export interface IIncome {
  id: number;
  createdAt: Date;
  creatorName: string;
  incomeNumber: string;
  incomeDate: Date;
  seller: string;
  buyer: string;
  photoUrl: string;
  assetId?: number | null;
  consumableId?: number | null;
}

export interface CreateIncome {
  creatorName: string;
  incomeNumber: string;
  incomeDate: Date;
  photoUrl: string;
  seller: string;
  buyer: string;
}