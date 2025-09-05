"use client"
import { IItem } from "@/entities/item/model/item.types";
import Image from "next/image";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListOfItemsProps {
  search: string;
  items: IItem[];
}

export default function ListOfItems ({items, search }: ListOfItemsProps){

  const getStatusBadge = (status: IItem["status"]) => {
    switch (status) {
      case "IN_STOCK":
        return <Badge variant="outline" color="green">На складе</Badge>;
      case "ISSUED":
        return <Badge variant="outline" color="blue">Выдан</Badge>;
      case "NOT_AVAILABLE":
        return <Badge variant="outline" color="red">Нет в наличии</Badge>;
      default:
        return null;
    }
  };

  if (!items.length) {
    return (
      <div className="py-10 flex justify-center">
        <div>Товары не найдены</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md flex flex-col">
          {item.photoUrl ? (
            <div className="relative w-full h-48">
              <Image
                // src={item.photoUrl}
                src={"https://img-webcalypt.ru/img/thumb/lg/images/meme-templates/7662012bb4b0acd4e1d2240f3dc7250b.jpg.jpg"}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-100 text-gray-500 flex items-center justify-center">
              Нет фото
            </div>
          )}

          <CardContent className="p-4 flex flex-col flex-1">
            <CardHeader className="mb-2">
              <div className="font-bold">{item.name}</div>
            </CardHeader>
            <div>Инв. номер: {item.inventoryNumber}</div>
            <div>Количество: {item.quantity}</div>
            <div className="mt-2">{getStatusBadge(item.status)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
