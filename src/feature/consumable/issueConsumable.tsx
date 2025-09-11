"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpense } from "@/entities/expense/model/expense.action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const issueSchema = z.object({
  receiver: z.string().min(1, "Укажите получателя"),
  quantity: z.number().positive(),
  comment: z.string().optional().or(z.literal("")),
});

type IssueSchema = z.input<typeof issueSchema>;

export const IssueConsumableModal = ({ isOpen, onClose, consumableId }: { isOpen: boolean; onClose: () => void; consumableId: number; }) => {
  const form = useForm<IssueSchema>({
    resolver: zodResolver(issueSchema),
    defaultValues: { receiver: "", quantity: 1, comment: "" },
  });

  const onSubmit = async (data: IssueSchema) => {
    try {
      await createExpense({ consumableId, receiver: data.receiver, quantity: String(data.quantity), comment: data.comment || undefined });
      toast("✅ Выдача оформлена");
      onClose();
    } catch (e) {
      console.error(e);
      toast("❌ Не удалось оформить выдачу");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-4">Выдать расходник</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="receiver" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Получатель</FormLabel>
                <FormControl><Input autoComplete="off" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="quantity" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Количество</FormLabel>
                <FormControl><Input type="number" autoComplete="off" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="comment" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарий</FormLabel>
                <FormControl><Input autoComplete="off" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">Выдать</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};


