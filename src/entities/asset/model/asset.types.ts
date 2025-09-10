export interface IAsset {
  id: number;
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  article: string;
  brand: string;
  location: string;
  owner: string;
  status: 'IN_STOCK' | 'DISPOSED';
  price: number;
  comment?: string | null;
  categoryId?: number | null;
  lastModified: Date;
}

export interface CreateAsset {
  name: string;
  photoUrl?: string | null;
  inventoryNumber: string;
  article: string;
  brand: string;
  location: string;
  owner: string;
  status?: 'IN_STOCK' | 'DISPOSED';
  price: number;
  comment?: string | null;
  categoryId?: number | null;
}


