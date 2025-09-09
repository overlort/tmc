'use server';

import { CreateIncome, IIncome } from "@/entities/income/model/income.type";
import { prisma } from "../../../../shared/lib/prisma";

export const createIncome = async (data: CreateIncome): Promise<IIncome> =>
  await prisma.income.create({ data });

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
