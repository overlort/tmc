'use server'

import { CreateItem, IItem } from "@/entities/item/model/item.types";
import { prisma } from "../../../../shared/lib/prisma";


// CREATE
export const createItem = async (data: CreateItem): Promise<IItem> =>
  await prisma.item.create({ data });

// READ (один)
export const getItemById = async (id: number): Promise<IItem | null> =>
  await prisma.item.findUnique({ where: { id } });

// READ (все)
export const getAllItems = async (): Promise<IItem[]> =>
  await prisma.item.findMany();

// UPDATE
// export const updateItem = async (
//   id: number,
//   data: Partial<Omit<IItem, "id">>
// ): Promise<IItem> =>
//   await prisma.item.update({ where: { id }, data });

// DELETE
export const deleteItem = async (id: number): Promise<IItem> =>
  await prisma.item.delete({ where: { id } });
