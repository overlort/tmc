"use client";

import { useFieldArray, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { Loader2Icon, PlusCircle } from "lucide-react";
import { ItemFields } from "@/feature/income/itemFields";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { CreateIncomeForm } from "@/entities/income/model/income.type";
import Image from "next/image";
import { createIncomeWithItems } from "@/entities/income/model/income.action";

interface CreateIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreation?: () => void;
}

export const CreateIncomeModal = ({ isOpen, onClose, onCreation }: CreateIncomeModalProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const createIncomeSchema = z.object({
    creatorName: z.string().min(1, "Введите имя создателя"),
    incomeNumber: z.string().min(1, "Введите номер счёта"),
    incomeDate: z.string().min(1, "Укажите дату"),
    seller: z.string().min(1, "Введите продавца"),
    buyer: z.string().min(1, "Введите покупателя"),
    photoUrl: z.string(),
    items: z.array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        price: z.number().min(0),
        code: z.string().min(1),
      })
    ),
  });

  const form = useForm<CreateIncomeForm>({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      creatorName: "",
      incomeNumber: "",
      incomeDate: "",
      photoUrl: "",
      seller: "",
      buyer: "",
      items: [],
    },
  });

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
      toast("Фото загружено ✅");
    } catch (err) {
      console.error(err);
      toast("Ошибка при загрузке фото ❌");
    } finally {
      setUploading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watch = form.watch;
  const items = watch("items") || [];
  const totalDoc = items.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0
  );

  const handleCreateIncome = async (data: CreateIncomeForm) => {
    if (data.items.length === 0) {
      throw new Error("Нельзя создать коробку без вещей");
    }
    try {
      setLoading(true)
      console.log(1211113)
      console.log("Создаём счёт:", data);
      await createIncomeWithItems(data);

      toast("✅ Счёт успешно создан");

      form.reset();
      setPreviewUrl(null);
      onClose()
      if (onCreation) onCreation();
    } catch (err) {
      console.error(err);
      toast("❌ Ошибка при создании счёта");
    } finally {
      setLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-5xl p-6 shadow-lg relative max-h-[700px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Создать счёт</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateIncome)} className="space-y-4">
            {/* Поля счета */}
            <FormField
              control={form.control}
              name="creatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя создателя</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите имя" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incomeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер счёта</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите номер счета" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incomeDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата счёта</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Продавец</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите продавца" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Покупатель</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите покупателя" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Зона товаров */}
            <div className="border border-gray-300 rounded p-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Товары</h3>
              </div>

              {fields.map((field, index) => (
                <ItemFields
                  key={field.id}
                  control={form.control}
                  index={index}
                  remove={remove}
                  watch={watch}
                />
              ))}

              {/* Сумма документа */}
              <div className="flex justify-between border-t">
                <button
                  type="button"
                  onClick={() =>
                    append({ name: "", quantity: 1, price: 0, code: "" })
                  }
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle size={20} className="mr-1" /> Добавить товар
                </button>

                <div className="mt-4 p-3  text-right font-semibold">
                  Сумма документа: {totalDoc.toFixed(2)}
                </div>
              </div>


            </div>

            {!loading ? (
              <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Создать счёт
              </button>) : (
              <button type="submit" disabled={true} className=" flex flex-row gap-2 mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                <Loader2Icon className="animate-spin" />
                Сохранение
              </button>
              )}
          </form>
        </Form>
      </div>
    </div>
  );
};
