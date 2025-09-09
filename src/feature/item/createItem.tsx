"use client";

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
import { useState } from "react";
import Image from "next/image";

interface CreateItemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreation: () => void;
}

export const CreateItemDrawer = ({ onCreation, isOpen, onClose }: CreateItemDrawerProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const handleCreateItem = async (data: CreateItem) => {
    try {
      await createItem(data);
      form.reset();
      setPreviewUrl(null); // сбрасываем превью
      onCreation();
      toast("✅ Успешно создано");
    } catch (err) {
      console.error(err);
      toast("❌ Ошибка при создании товара");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Сначала показываем превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Загружаем на Cloudinary
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "items_photo"); // замените на свой

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dwoakn183/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      form.setValue("photoUrl", data.secure_url);
      console.log({photo: data?.secure_url, previewUrl})
      toast("Фото загружено ✅");
    } catch (err) {
      console.error(err);
      toast("Ошибка при загрузке фото ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="p-4 w-full sm:w-1/3">
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Создать новый товар</DrawerTitle>
            <DrawerClose />
          </div>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateItem)} className="space-y-6">
            {/* Название */}
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

            {/* Фото */}
            <FormField
              control={form.control}
              name="photoUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Фото товара</FormLabel>
                  <FormControl>
                    <div>
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                      {previewUrl && (
                        <div className="mt-2 w-full h-48 relative border border-gray-200">
                          <Image src={previewUrl} alt="Preview" fill style={{ objectFit: "cover" }} />
                        </div>
                      )}
                      {uploading && <p className="text-sm text-gray-500 mt-1">Загрузка...</p>}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Инвентарный номер */}
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

            {/* Количество */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={uploading}>
              {uploading ? "Загрузка..." : "Создать предмет"}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
