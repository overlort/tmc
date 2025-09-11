"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllConsumables } from "@/entities/consumable/model/consumable.action";
import { IConsumable } from "@/entities/consumable/model/consumable.types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CreateConsumableModal } from "@/feature/consumable/createConsumable";
import { Input } from "@/components/ui/input";
import { hM } from "@/lib/highlightMatches";

const ConsumablePage = () => {
  const [consumables, setConsumables] = useState<IConsumable[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const list = await getAllConsumables();
      setConsumables(list);
    };
    load();
  }, []);

  const filtered = consumables.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.inventoryNumber || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Введите текст для поиска" className="flex-1" />
        <Button onClick={() => setIsOpen(true)}>Создать расходник</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Link key={c.id} href={`/consumable/${c.id}`} className="block">
            <Card className="hover:shadow-md flex flex-col cursor-pointer">
              {c.photoUrl ? (
                <div className="relative w-full h-48">
                  <Image src={c.photoUrl} alt={c.name} fill style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 text-gray-500 flex items-center justify-center">Нет фото</div>
              )}
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="font-bold mb-2" dangerouslySetInnerHTML={{ __html: hM(c.name, search) }} />
                <div>Инв. номер: <span dangerouslySetInnerHTML={{ __html: hM(c.inventoryNumber || '', search) }} /></div>
                <div>Кол-во: {c.quantity} {c.quantityUnit}</div>
                <div>Цена: {c.price}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <CreateConsumableModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreation={() => setIsOpen(false)} />
    </div>
  );
}

export default ConsumablePage;


