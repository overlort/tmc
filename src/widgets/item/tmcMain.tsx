"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListOfItems from "@/feature/item/listOfItems";
import { IItem } from "@/entities/item/model/item.types";
import { getAllItems } from "@/entities/item/model/item.action";
import { CreateItemDrawer } from "@/feature/item/createItem";
import { CreateOrderDrawer } from "@/feature/order/createOrder"; // новый Drawer для заказов

export default function TmcMain() {
  const [search, setSearch] = useState("");
  const [isOpenItem, setIsOpenItem] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [items, setItems] = useState<IItem[]>([]);
  const [preFilledName, setPreFilledName] = useState(""); // Для автозаполнения

  useEffect(() => {
    const getData = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    getData();
  }, []);

  const refetch = async () => {
    const data = await getAllItems();
    setItems(data);
  };

  const onCreationItem = () => {
    refetch();
  };

  const filteredItems = items.filter(
    (item) =>
      item.inventoryNumber.includes(search) || item.name.includes(search)
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = (e: FormEvent) => e.preventDefault();

  const openOrderDrawerWithSearch = () => {
    setPreFilledName(search);
    setIsOpenOrder(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Форма поиска и кнопка */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
      >
        <Input
          value={search}
          onChange={handleInputChange}
          placeholder="Введите текст для поиска"
          className="flex-1"
        />
        <Button type="button" onClick={() => setIsOpenItem(true)}>
          Добавить товар
        </Button>
      </form>

      {/* Сетка карточек */}
      {filteredItems.length > 0 ? (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          <ListOfItems items={filteredItems} search={search} />
        </div>
      ) : (
        <div className="text-center py-8">
          <p>Ничего не найдено, попробуйте изменить запрос или</p>
          <Button variant="outline" onClick={openOrderDrawerWithSearch} className="mt-2">
            Создайте заявку
          </Button>
        </div>
      )}

      {/* Drawer для создания товара */}
      <CreateItemDrawer
        onCreation={onCreationItem}
        isOpen={isOpenItem}
        onClose={() => setIsOpenItem(false)}
      />

      {/* Drawer для создания заказа */}
      <CreateOrderDrawer
        isOpen={isOpenOrder}
        onClose={() => setIsOpenOrder(false)}
        preFilledItemName={preFilledName}
      />
    </div>
  );
}
