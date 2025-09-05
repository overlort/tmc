import { PrismaClient } from "@prisma/client";
import {IOrder} from "@/entities/order/model/order.types";

const prisma = new PrismaClient();

// CREATE
export async function createOrder(data: Omit<IOrder, "id" | "createdAt">): Promise<IOrder> {
  return prisma.order.create({ data });
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
  data: Partial<Omit<IOrder, "id" | "createdAt">>
): Promise<IOrder> {
  return prisma.order.update({ where: { id }, data });
}

// DELETE
export async function deleteOrder(id: number): Promise<IOrder> {
  return prisma.order.delete({ where: { id } });
}
