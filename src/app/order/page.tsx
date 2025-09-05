"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateOrderDrawer } from "@/feature/order/createOrder";
import { getAllOrders } from "@/entities/order/model/order.action"; // функция для получения всех заказов
import { IOrder } from "@/entities/order/model/order.types"; // тип заказа
import ListOfOrders from "@/feature/order/listOfOrders"; // компонент для списка заказов

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [preFilledItemName, setPreFilledItemName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const refetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const filteredOrders = orders.filter((order) =>
    order.itemName.includes(search)
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = (e: FormEvent) => e.preventDefault();

  const openOrderDrawerWithSearch = () => {
    setPreFilledItemName(search);
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
          placeholder="Введите название товара для поиска"
          className="flex-1"
        />
        <Button type="button" onClick={openOrderDrawerWithSearch}>
          Создать заказ
        </Button>
      </form>

      {/* Список заказов */}
      {filteredOrders.length > 0 ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <ListOfOrders orders={filteredOrders} search={search} />
        </div>
      ) : (
        <div className="text-center py-8">
          <p>Ничего не найдено, попробуйте изменить запрос или</p>
          <Button variant="outline" onClick={openOrderDrawerWithSearch} className="mt-2">
            Создайте заказ
          </Button>
        </div>
      )}

      {/* Drawer для создания заказа */}
      <CreateOrderDrawer
        isOpen={isOpenOrder}
        onClose={() => setIsOpenOrder(false)}
        preFilledItemName={preFilledItemName}
        refetchOrders={refetchOrders}
      />
    </div>
  );
}
