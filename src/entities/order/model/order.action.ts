"use server"

import { PrismaClient } from "@prisma/client";
import { CreateOrder, IOrder } from "@/entities/order/model/order.types";

const prisma = new PrismaClient();

// CREATE
export async function createOrder(data: CreateOrder): Promise<IOrder> {
  return prisma.order.create({
    data: {
      dueDate: data.dueDate,
      initiator: data.initiator,
      comment: data.comment,
      itemName: data.itemName,
      quantity: data.quantity,
    }});
}

// READ (один)
export async function getOrderById(id: number): Promise<IOrder | null> {
  return prisma.order.findUnique({ where: { id }, include: { items: true } });
}

// READ (все)
export async function getAllOrders(): Promise<IOrder[]> {
  return prisma.order.findMany({ include: { items: true } });
}

// UPDATE
export async function updateOrder(
  id: number,
  data: CreateOrder
): Promise<IOrder> {
  return prisma.order.update({ where: { id }, data: {
      dueDate: data.dueDate,
      initiator: data.initiator,
      comment: data.comment,
      itemName: data.itemName,
      quantity: data.quantity,
    } });
}

// DELETE
export async function deleteOrder(id: number): Promise<IOrder> {
  return prisma.order.delete({ where: { id } });
}
