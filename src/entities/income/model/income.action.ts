'use server';

import { CreateIncomeForm, IIncome } from "@/entities/income/model/income.type";
import { prisma } from "../../../../shared/lib/prisma";

export const createIncomeWithItems = async (data: CreateIncomeForm) => {
  await prisma.$transaction(async (tx) => {
    const { items, ...creationData } = data
    const { id } = await prisma.income.create({
      data: {
        ...creationData,
        incomeDate: new Date(creationData.incomeDate)
      }
    });

    await tx.item.createMany({
      data: items.map((i) => ({
        incomeId: id,
        name: i.name,
        quantity: i.quantity,
      }))
    })
  })
}

// READ (один)
export const getIncomeById = async (id: number): Promise<IIncome | null> =>
  await prisma.income.findUnique({ where: { id } });

// READ (все)
export const getAllIncomes = async (): Promise<IIncome[]> =>
  await prisma.income.findMany();

// UPDATE
export const updateIncome = async (
  id: number,
  data: Partial<Omit<IIncome, "id" | "createdAt">>
): Promise<IIncome> =>
  await prisma.income.update({ where: { id }, data });

// DELETE
export const deleteIncome = async (id: number): Promise<IIncome> =>
  await prisma.income.delete({ where: { id } });
