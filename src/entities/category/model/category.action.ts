'use server'

import { prisma } from "../../../../shared/lib/prisma";
import { CreateCategory, ICategory } from "@/entities/category/model/category.types";


// CREATE
export const createCategory = async (data: CreateCategory): Promise<ICategory> => {
  const { name, parentId, icon } = data;

  return await prisma.category.create({
    data: {
      name,
      parentId: parentId || null,
      icon: icon || null,
    },
  });
}

// READ (один)
// export const getItemById = async (id: number): Promise<IItem | null> =>
//   await prisma.item.findUnique({ where: { id } });

// READ (все)
export const getAllCategories = async (): Promise<ICategory[]> =>
  await prisma.category.findMany();

// UPDATE
export const updateCategory = async (
  id: number,
  data: CreateCategory
): Promise<ICategory> => {
  const { name, parentId, icon } = data;

  const updateData: CreateCategory = { name: '' };

  if (name) updateData.name = name;
  if (parentId !== undefined) updateData.parentId = parentId;
  if (icon !== undefined) updateData.icon = icon;

  return prisma.category.update({ where: { id }, data: updateData });
}
// DELETE
export const deleteCategory = async (id: number) => {
  try {
    // удаляем рекурсивно
    const deleteRecursive = async (categoryId: number) => {
      const children = await prisma.category.findMany({ where: { parentId: categoryId } });
      for (const c of children) await deleteRecursive(c.id);

      await prisma.asset.updateMany({ where: { categoryId }, data: { categoryId: null } }); // отвязываем товары
      await prisma.consumable.updateMany({ where: { categoryId }, data: { categoryId: null } }); // отвязываем товары
      await prisma.category.delete({ where: { id: categoryId } });
    };

    await deleteRecursive(id);
  } catch (err) {
    console.error("DELETE /api/categories/:id error", err);
  }}