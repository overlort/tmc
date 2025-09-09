// "use client";
//
// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CreateOrderDrawer } from "@/feature/order/createOrder";
// import { getAllOrders } from "@/entities/order/model/order.action"; // функция для получения всех заказов
// import { IOrder } from "@/entities/order/model/order.types"; // тип заказа
// import ListOfOrders from "@/feature/order/listOfOrders"; // компонент для списка заказов
//
// export default function OrdersPage() {
//   const [search, setSearch] = useState("");
//   const [isOpenOrder, setIsOpenOrder] = useState(false);
//   const [orders, setOrders] = useState<IOrder[]>([]);
//   const [preFilledItemName, setPreFilledItemName] = useState("");
//
//   useEffect(() => {
//     const fetchOrders = async () => {
//       const data = await getAllOrders();
//       setOrders(data);
//     };
//     fetchOrders();
//   }, []);
//
//   const refetchOrders = async () => {
//     const data = await getAllOrders();
//     setOrders(data);
//   };
//
//   const filteredOrders = orders.filter((order) =>
//     order.itemName.includes(search)
//   );
//
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
//   const handleSearch = (e: FormEvent) => e.preventDefault();
//
//   const openOrderDrawerWithSearch = () => {
//     setPreFilledItemName(search);
//     setIsOpenOrder(true);
//   };
//
//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       {/* Форма поиска и кнопка */}
//       <form
//         onSubmit={handleSearch}
//         className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
//       >
//         <Input
//           value={search}
//           onChange={handleInputChange}
//           placeholder="Введите название товара для поиска"
//           className="flex-1"
//         />
//         <Button type="button" onClick={openOrderDrawerWithSearch}>
//           Создать заказ
//         </Button>
//       </form>
//
//       {/* Список заказов */}
//       {filteredOrders.length > 0 ? (
//         <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
//           <ListOfOrders orders={filteredOrders} search={search} />
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <p>Ничего не найдено, попробуйте изменить запрос или</p>
//           <Button variant="outline" onClick={openOrderDrawerWithSearch} className="mt-2">
//             Создайте заказ
//           </Button>
//         </div>
//       )}
//
//       {/* Drawer для создания заказа */}
//       <CreateOrderDrawer
//         isOpen={isOpenOrder}
//         onClose={() => setIsOpenOrder(false)}
//         preFilledItemName={preFilledItemName}
//         refetchOrders={refetchOrders}
//       />
//     </div>
//   );
// }
"use client";

import { Accessibility, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";

const positions = [10, 40, 70]; // проценты пути

export default function RaceTrack() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">🏁🏁🏁🏁🏁🏁🏁</h2>

      <div >
        {positions.map((pos, index) => (
          <Card key={index} className="relative h-16 flex items-center px-4 overflow-hidden bg-gray-100">
            {/* Трек */}
            <div className="absolute inset-0 flex items-center">
              <div className="h-[2px] w-full bg-gray-300" />
            </div>

            {/* Иконка инвалидной коляски */}
            <Accessibility
              className="absolute text-blue-600 w-6 h-6 transition-all duration-500"
              style={{ left: `${pos}%` }}
            />

            {/* Финиш */}
            <div className="absolute right-4 flex items-center gap-1 text-red-500">
              <Flag className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
