'use client';

import { IOrder } from "@/entities/order/model/order.types";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hM } from "@/lib/highlightMatches";

interface ListOfOrdersProps {
  search: string;
  orders: IOrder[];
}

export default function ListOfOrders({ orders, search }: ListOfOrdersProps) {
  const getStatusBadge = (order: IOrder) => {
    const now = new Date();
    if (order.dueDate && new Date(order.dueDate) < now) {
      return <Badge variant="outline" color="red">Просрочен</Badge>;
    }
    return <Badge variant="outline" color="green">Активен</Badge>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md flex flex-col">
          {/* Фото первого товара в заказе */}
          {order.items && order.items.length > 0 ? (
            <div className="relative w-full h-48">
              <Image
                src={order.items[0].photoUrl || "https://img-webcalypt.ru/img/thumb/lg/images/meme-templates/7662012bb4b0acd4e1d2240f3dc7250b.jpg.jpg"}
                alt={order.items[0].name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-100 text-gray-500 flex items-center justify-center">
              Нет товаров
            </div>
          )}

          <CardContent className="p-4 flex flex-col flex-1">
            <CardHeader className="mb-2">
              <div className="font-bold">{hM(order.itemName, search)}</div>
            </CardHeader>

            <div>Инициатор запроса: {hM(order.initiator, search)}</div>
            <div>Заказано товаров: {order?.items?.length ?? 0}</div>
            <div>Заявка создана: {hM(new Date(order.createdAt).toLocaleString(), search)}</div>
            {order.dueDate && (
              <div>Заявка будет выполнена примерно: {new Date(order.dueDate).toLocaleString()}</div>
            )}
            <div className="mt-2">{getStatusBadge(order)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
