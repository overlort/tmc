'use server'
import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../../../shared/lib/prisma";
import { CreateExpense, IExpense } from "@/entities/expense/model/expense.types";

export const createExpense = async (data: CreateExpense): Promise<IExpense> => {
  const expense = await prisma.expense.create({
    data: {
      ...data,
      quantity: new Decimal(data.quantity),
    },
  });
  return { ...expense, quantity: expense.quantity.toString() };
}

export const getExpenseById = async (id: number): Promise<IExpense | null> => {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) return null;
  return { ...expense, quantity: expense.quantity.toString() };
}

export const getAllExpenses = async (): Promise<IExpense[]> => {
  const expenses = await prisma.expense.findMany();
  return expenses.map(e => ({ ...e, quantity: e.quantity.toString() }));
}

export const updateExpense = async (
  id: number,
  data: Partial<Omit<IExpense, "id">>
): Promise<IExpense> => {
  const updateData = {
    ...data,
    quantity: data.quantity !== undefined ? new Decimal(data.quantity) : undefined,
  };
  const expense = await prisma.expense.update({ where: { id }, data: updateData });
  return { ...expense, quantity: expense.quantity.toString() };
}

export const deleteExpense = async (id: number): Promise<void> => {
  await prisma.expense.delete({ where: { id } });
}


