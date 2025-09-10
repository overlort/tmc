import { IAsset } from "@/entities/asset/model/asset.types";
import { IConsumable } from "@/entities/consumable/model/consumable.types";

export type ICategory  = {
  id: string;
  name: string;
  icon?: string | null;
  parentId?: string | null;
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
  parentId?: string | null;
}

export type CategoryNode = {
  id: string;
  name: string;
  icon?: string | null;
  parentId?: string | null;
  children: CategoryNode[];
};