"use client"

import { getAssetById, deleteAsset, updateAsset } from "@/entities/asset/model/asset.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveAssetModal } from "@/feature/asset/moveAssetModal";
import { getAllCategories } from "@/entities/category/model/category.action";
import { ConfirmDisposeButton } from "@/feature/asset/confirmDispose";
import { useEffect, useState } from "react";
import type { IAsset } from "@/entities/asset/model/asset.types";
import type { ICategory } from "@/entities/category/model/category.types";

interface AssetPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AssetDetailsPage = ({ params, searchParams }: AssetPageProps) => {
  const id = Number(params.id);
  const [moveModalOpen, setMoveModalOpen] = useState(false)
  const [asset, setAsset] = useState<IAsset | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (Number.isNaN(id)) return;
    const load = async () => {
      const a = await getAssetById(id);
      setAsset(a);
      const cats = await getAllCategories();
      setCategories(cats);
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    await deleteAsset(id);
    redirect("/asset");
  }

  const handleDispose = async () => {
    await updateAsset(id, { status: "DISPOSED" });
  }

  const handleMove = async (formData: FormData) => {
    const owner = String(formData.get("owner") || "");
    const location = String(formData.get("location") || "");
    await updateAsset(id, { owner, location });
  }

  const attachCategory = async (formData: FormData) => {
    const categoryIdValue = formData.get("categoryId");
    const categoryId = categoryIdValue ? Number(categoryIdValue) : null;
    await updateAsset(id, { categoryId: categoryId ?? undefined });
  }

  return (
    <div className="space-y-6">
      {!asset ? (
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      ) : (
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            {asset.photoUrl ? (
              <div className="relative w-full h-64">
                <Image src={asset.photoUrl} alt={asset.name} fill style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className="h-64 bg-gray-100 text-gray-500 flex items-center justify-center">Нет фото</div>
            )}
          </div>
          <div className="md:col-span-2 space-y-2">
            <div className="text-2xl font-bold">{asset.name}</div>
            <div>Инвентарный номер: {asset.inventoryNumber}</div>
            <div>Артикул: {asset.article}</div>
            <div>Бренд: {asset.brand}</div>
            <div>Местоположение: {asset.location}</div>
            <div>Владелец: {asset.owner}</div>
            <div>Статус: {asset.status}</div>
            <div>Цена: {asset.price}</div>
            {asset.comment && <div>Комментарий: {asset.comment}</div>}
            {asset.categoryId && <div>Категория: {asset.categoryId}</div>}
            <div>Последнее изменение: {new Date(asset.lastModified).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="font-semibold">Критичные действия</div>
            <form action={handleDelete}>
              <Button type="submit" variant="destructive">Удалить</Button>
            </form>
            <form action={async () => { /* заглушка */}}>
              <Button type="submit" variant="outline">Изменить (заглушка)</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="font-semibold">Операции</div>
            <form action={handleDispose} className="inline">
              <ConfirmDisposeButton onConfirm={() => {}} />
            </form>
            <form action={handleMove}>
              <MoveAssetModal  open={moveModalOpen} setOpen={setMoveModalOpen} />
            </form>
            <form action={attachCategory} className="flex items-center gap-2">
              <select name="categoryId" className="border rounded h-10 px-3">
                <option value="">Без категории</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <Button type="submit" variant="outline">Привязать к категории</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AssetDetailsPage;


