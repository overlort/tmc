"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IConsumable } from "@/entities/consumable/model/consumable.types";
import { deleteConsumable, getConsumableById, updateConsumable } from "@/entities/consumable/model/consumable.action";
import { getAllCategories } from "@/entities/category/model/category.action";
import type { ICategory } from "@/entities/category/model/category.types";
import { useRouter } from "next/navigation";
import { IssueConsumableModal } from "@/feature/consumable/issueConsumable";

interface PageProps { params: { id: string } }

const ConsumableDetailsPage = ({ params }: PageProps) => {
  const id = Number(params.id);
  const [consumable, setConsumable] = useState<IConsumable | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [issueOpen, setIssueOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Number.isNaN(id)) return;
    const load = async () => {
      const c = await getConsumableById(id);
      setConsumable(c);
      const cats = await getAllCategories();
      setCategories(cats);
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    await deleteConsumable(id);
    router.push("/consumable");
  };

  const attachCategory = async (formData: FormData) => {
    const categoryIdValue = formData.get("categoryId");
    const categoryId = categoryIdValue ? Number(categoryIdValue) : null;
    await updateConsumable(id, { categoryId: categoryId ?? undefined });
  };

  return (
    <div className="space-y-6">
      {!consumable ? (
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      ) : (
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            {consumable.photoUrl ? (
              <div className="relative w-full h-64">
                <Image src={consumable.photoUrl} alt={consumable.name} fill style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className="h-64 bg-gray-100 text-gray-500 flex items-center justify-center">Нет фото</div>
            )}
          </div>
          <div className="md:col-span-2 space-y-2">
            <div className="text-2xl font-bold">{consumable.name}</div>
            <div>Инвентарный номер: {consumable.inventoryNumber}</div>
            <div>Артикул: {consumable.article}</div>
            <div>Бренд: {consumable.brand}</div>
            <div>Местоположение: {consumable.location}</div>
            <div>Количество: {consumable.quantity} {consumable.quantityUnit}</div>
            <div>Цена: {consumable.price}</div>
            {consumable.comment && <div>Комментарий: {consumable.comment}</div>}
            {consumable.categoryId && <div>Категория: {consumable.categoryId}</div>}
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
            <form action={async () => { /* заглушка редактирования */}}>
              <Button type="submit" variant="outline">Изменить (заглушка)</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="font-semibold">Операции</div>
            <Button variant="outline" onClick={() => setIssueOpen(true)}>Выдать</Button>
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

      <IssueConsumableModal isOpen={issueOpen} onClose={() => setIssueOpen(false)} consumableId={id} />
    </div>
  );
}

export default ConsumableDetailsPage;


