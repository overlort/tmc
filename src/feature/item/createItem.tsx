'use client';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createItem } from "@/entities/item/model/item.action";
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
import { CreateItem } from "@/entities/item/model/item.types";

interface CreateItemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreation: () => void;
}

export const CreateItemDrawer = ({onCreation, isOpen, onClose }: CreateItemDrawerProps) => {

  const createItemSchema = z.object({
    name: z.string().min(1, "Введите название"),
    photoUrl: z.string().optional(),
    inventoryNumber: z.string().min(1, "Введите инвентарный номер"),
    quantity: z.number(),
  });

  type CreateItemSchema = z.infer<typeof createItemSchema>;

  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "",
      photoUrl: "",
      inventoryNumber: "",
      quantity: 0,
    },
  });
  const handleCreateItem = async (data: Omit<CreateItem, "status">) => {
    console.log(data)
    const createData: CreateItem = {
      name: data.name,
      photoUrl: data.photoUrl,
      inventoryNumber: data.inventoryNumber,
      quantity: data.quantity,
      status: "IN_STOCK"
    }

    try {

      await createItem(createData);
      form.reset()
      onCreation();
      toast("Успешно создано" +
        "");
    } catch (err) {
      toast("Ошибка при создании товара");
      console.error(err);
    } finally {
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className=" p-4 w-full sm:w-1/3">
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Создать новый товар</DrawerTitle>
            <DrawerClose />
          </div>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateItem)} className="space-y-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photo URL */}
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на фото</FormLabel>
                  <FormControl>
                    <Input placeholder="Ведите" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Inventory Number */}
            <FormField
              control={form.control}
              name="inventoryNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Инвентарный номер</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => {
                console.log(field)
                return (
                  <FormItem>
                    <FormLabel>Количество</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )
              }}
            />

            <Button type="submit">Создать предмет</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
