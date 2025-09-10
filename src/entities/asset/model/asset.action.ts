'use server'

import { prisma } from "../../../../shared/lib/prisma";
import { CreateAsset, IAsset } from "@/entities/asset/model/asset.types";

export const createAsset = async (data: CreateAsset): Promise<IAsset> =>
  await prisma.asset.create({ data });

export const getAssetById = async (id: number): Promise<IAsset | null> =>
  await prisma.asset.findUnique({ where: { id } });

export const getAllAssets = async (): Promise<IAsset[]> =>
  await prisma.asset.findMany();

export const updateAsset = async (
  id: number,
  data: Partial<Omit<IAsset, "id" | "lastModified">>
): Promise<IAsset> =>
  await prisma.asset.update({ where: { id }, data });

export const deleteAsset = async (id: number): Promise<IAsset> =>
  await prisma.asset.delete({ where: { id } });


