"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListOfItems from "@/feature/item/listOfItems";
import { IItem } from "@/entities/item/model/item.types";
import { getAllItems } from "@/entities/item/model/item.action";
import { CreateItemDrawer } from "@/feature/item/createItem";

export default function TmcMain() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getAllItems()
      setItems(data)
    };
    getData();
  }, [])

  const onCreation = () => {
    refetch();
  }

  const refetch = async () => {
    const data = await getAllItems();
    setItems(data)
  }

  const filteredItems = items.filter(
    (item) =>
      item.inventoryNumber.includes(search) || item.name.includes(search)
  );

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = (e: FormEvent) => e.preventDefault();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Форма поиска и кнопка */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Input
          value={search}
          onChange={handleInputChange}
          placeholder="Введите текст для поиска"
          className="flex-1"
        />
        <Button type="button" onClick={onOpen}>
          Добавить товар
        </Button>
      </form>

      {/* Сетка карточек */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}>
        <ListOfItems items={filteredItems} search={search} />
      </div>

      {/* Drawer для создания товара */}
      <CreateItemDrawer onCreation={onCreation} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
