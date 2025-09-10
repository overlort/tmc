"use client"
import { IAsset } from "@/entities/asset/model/asset.types";
import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { hM } from "@/lib/highlightMatches";

interface ListOfItemsProps {
  search: string;
  items: IAsset[];
}

const ListOfItems = ({items, search }: ListOfItemsProps) => {

  // const getStatusBadge = (status: IItem["status"]) => {
  //   switch (status) {
  //     case "IN_STOCK":
  //       return <Badge variant="outline" color="green">На складе</Badge>;
  //     case "ISSUED":
  //       return <Badge variant="outline" color="blue">Выдан</Badge>;
  //     case "NOT_AVAILABLE":
  //       return <Badge variant="outline" color="red">Нет в наличии</Badge>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link key={item.id} href={`/asset/${item.id}`} className="block">
          <Card className="hover:shadow-md flex flex-col cursor-pointer">
            {item.photoUrl ? (
              <div className="relative w-full h-48">
                <Image
                  src={item.photoUrl}
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
                <div className="font-bold">{hM(item.name, search)}</div>
              </CardHeader>
              <div>Инв. номер: {hM(item?.inventoryNumber ?? '', search)}</div>
              <div>Бренд: {hM(item.brand ?? '', search)}</div>
              {/*<div className="mt-2">{getStatusBadge(item.status)}</div>*/}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default ListOfItems;
