'use server'
import { Decimal } from "@prisma/client/runtime/library"; // или просто Decimal
import { prisma } from "../../../../shared/lib/prisma";
import { CreateConsumable, IConsumable } from "@/entities/consumable/model/consumable.types";

export const createConsumable = async (data: CreateConsumable): Promise<IConsumable> => {
  const consumable = await prisma.consumable.create({
    data: {
      ...data,
      quantity: new Decimal(data.quantity)
    }
  });
  return {...consumable, quantity: consumable.quantity.toString()};
}

export const getConsumableById = async (id: number): Promise<IConsumable | null> => {
    const consumable = await prisma.consumable.findUnique({ where: { id } });
    if (!consumable) return null;
    return { ...consumable, quantity: consumable.quantity.toString() };
  };
  
  export const getAllConsumables = async (): Promise<IConsumable[]> => {
    const consumables = await prisma.consumable.findMany();
    return consumables.map(c => ({ ...c, quantity: c.quantity.toString() }));
  };
  
  export const updateConsumable = async (
    id: number,
    data: Partial<Omit<IConsumable, "id">>
  ): Promise<IConsumable> => {
    const updateData = {
      ...data,
      quantity: data.quantity !== undefined ? new Decimal(data.quantity) : undefined
    };
    const consumable = await prisma.consumable.update({ where: { id }, data: updateData });
    return { ...consumable, quantity: consumable.quantity.toString() };
  };

  export const deleteConsumable = async (id: number): Promise<void> => {
  await prisma.consumable.delete({ where: { id } });
}




