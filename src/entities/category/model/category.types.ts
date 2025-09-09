import { IItem } from "@/entities/item/model/item.types";

export type ICategory  = {
  id: string;
  name: string;
  icon?: string | null;
  parentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface ICategoryWithItems extends ICategory {
  items: IItem[];
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