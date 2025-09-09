'use client';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useEffect } from "react";
import { createOrder } from "@/entities/order/model/order.action";

interface CreateOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledItemName?: string; // автозаполнение из поиска
  refetchOrders?: () => void;
}

export const CreateOrderDrawer = ({ isOpen, onClose, preFilledItemName, refetchOrders }: CreateOrderDrawerProps) => {
  const createOrderSchema = z.object({
    itemName: z.string().min(1, "Введите название товара"),
    quantity: z.number().min(1, "Количество должно быть больше 0"),
    initiator: z.string().min(1, "Укажите инициатора"),
    comment: z.string().optional(),
  });

  type CreateOrderSchema = z.infer<typeof createOrderSchema>;

  const form = useForm<CreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      itemName: preFilledItemName || "",
      quantity: 1,
      initiator: "",
      comment: "",
    },
  });

  // обновляем поле itemName при изменении preFilledItemName
  // (например, если Drawer открылся с поиском)
  useEffect(() => {
    if (preFilledItemName) {
      form.setValue("itemName", preFilledItemName);
    }
  }, [form, preFilledItemName]);

  const handleCreateOrder = async (data: CreateOrderSchema) => {
    try {
      await createOrder({...data});
      form.reset({ quantity: 1 }); // сбрасываем форму, quantity по умолчанию = 1
      toast("✅ Заказ успешно создан");
      onClose();
      if (refetchOrders) refetchOrders()
    } catch (err) {
      console.error(err);
      toast("❌ Ошибка при создании заказа");
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="p-4 w-full sm:w-1/3">
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Создать заказ</DrawerTitle>
            <DrawerClose />
          </div>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateOrder)} className="space-y-8">
            {/* Item Name */}
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название товара</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Initiator */}
            <FormField
              control={form.control}
              name="initiator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Инициатор</FormLabel>
                  <FormControl>
                    <Input placeholder="Укажите инициатора" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Input placeholder="Комментарий (необязательно)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Создать заказ</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
