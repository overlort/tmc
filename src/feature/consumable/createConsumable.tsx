"use client";

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
import { useEffect, useState } from "react";
import Image from "next/image";
import { createConsumable } from "@/entities/consumable/model/consumable.action";
import type { Unit } from "@/entities/consumable/model/consumable.types";

interface CreateConsumableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreation: () => void;
}

export const CreateConsumableModal = ({ onCreation, isOpen, onClose }: CreateConsumableModalProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const createConsumableSchema = z.object({
    name: z.string().min(1, "Введите название"),
    photoUrl: z.string().optional().or(z.literal("")),
    inventoryNumber: z.string().min(1, "Введите инвентарный номер"),
    article: z.string().min(1, "Введите артикул"),
    brand: z.string().min(1, "Введите бренд"),
    location: z.string().min(1, "Введите местоположение"),
    quantityUnit: z.enum(["PCS","BOX","PACK","L","ML","KG","G","M","CM"] as [Unit, ...Unit[]]).default("PCS" as Unit),
    quantity: z.number().nonnegative(),
    price: z.number().int().nonnegative(),
    comment: z.string().optional().or(z.literal("")),
  });

  type CreateConsumableSchema = z.input<typeof createConsumableSchema>;

  const form = useForm<CreateConsumableSchema>({
    resolver: zodResolver(createConsumableSchema),
    defaultValues: {
      name: "",
      photoUrl: "",
      inventoryNumber: "",
      article: "",
      brand: "",
      location: "",
      quantityUnit: "PCS" as Unit,
      quantity: 0,
      price: 0,
      comment: "",
    },
  });

  const UNIT_LABELS: Record<Unit, string> = {
    PCS: "Штука",
    BOX: "Коробка",
    PACK: "Комплект",
    L: "Литр",
    ML: "Миллилитр",
    KG: "Килограмм",
    G: "Грамм",
    M: "Метр",
    CM: "Сантиметр",
  } as const;

  const handleCreate = async (data: CreateConsumableSchema) => {
    try {
      const payload = {
        ...data,
        photoUrl: data.photoUrl || undefined,
        comment: data.comment || undefined,
        quantity: String(data.quantity),
      };
      await createConsumable(payload);
      form.reset();
      setPreviewUrl(null);
      onCreation();
      onClose();
      toast("✅ Расходник создан");
    } catch (err) {
      console.error(err);
      toast("❌ Ошибка при создании расходника");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => { setPreviewUrl(reader.result as string); };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "items_photo");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dwoakn183/upload`, { method: "POST", body: formData });
      const data = await res.json();
      form.setValue("photoUrl", data.secure_url);
      toast("Фото загружено ✅");
    } catch (err) {
      console.error(err);
      toast("Ошибка при загрузке фото ❌");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg relative max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-4">Создать расходник</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl><Input placeholder="Введите название" autoComplete="off" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="photoUrl" render={() => (
              <FormItem>
                <FormLabel>Фото</FormLabel>
                <FormControl>
                  <div>
                    <Input type="file" accept="image/*" autoComplete="off" onChange={handleFileChange} />
                    {previewUrl && (
                      <div className="mt-2 w-full h-48 relative border border-gray-200">
                        <Image src={previewUrl} alt="Preview" fill style={{ objectFit: "cover" }} />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="inventoryNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Инвентарный номер</FormLabel>
                <FormControl><Input placeholder="12345" autoComplete="off" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="article" render={({ field }) => (
                <FormItem>
                  <FormLabel>Артикул</FormLabel>
                  <FormControl><Input placeholder="Введите артикул" autoComplete="off" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="brand" render={({ field }) => (
                <FormItem>
                  <FormLabel>Бренд</FormLabel>
                  <FormControl><Input placeholder="Введите бренд" autoComplete="off" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Местоположение</FormLabel>
                  <FormControl><Input placeholder="Склад A" autoComplete="off" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="quantity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество</FormLabel>
                  <FormControl><Input type="number" autoComplete="off" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl><Input type="number" autoComplete="off" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="quantityUnit" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ед. изм.</FormLabel>
                  <FormControl>
                    <select className="border rounded h-10 px-3" value={field.value} onChange={(e) => field.onChange(e.target.value as Unit)}>
                      {(["PCS","BOX","PACK","L","ML","KG","G","M","CM"] as Unit[]).map(u => (
                        <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="comment" render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарий</FormLabel>
                <FormControl><Input placeholder="Примечание" autoComplete="off" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={uploading}>{uploading ? "Загрузка..." : "Создать расходник"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};


