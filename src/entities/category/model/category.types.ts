import { IAsset } from "@/entities/asset/model/asset.types";
import { IConsumable } from "@/entities/consumable/model/consumable.types";

export type ICategory  = {
  id: number;
  name: string;
  icon?: string | null;
  parentId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface ICategoryWithItems extends ICategory {
  asset: IAsset[];
  consumable: IConsumable[];
}

export interface CreateCategory {
  name: string;
  icon?: string | null;
  parentId?: number | null;
}

export type CategoryNode = {
  id: number;
  name: string;
  icon?: string | null;
  parentId?: number | null;
  children: CategoryNode[];
};