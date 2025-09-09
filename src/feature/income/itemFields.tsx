import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Control, UseFormWatch } from "react-hook-form";
import { CreateIncomeForm } from "@/entities/income/model/income.type";

export const ItemFields = ({
  control,
  index,
  remove,
  watch,
}: {
  control: Control<CreateIncomeForm>;
  index: number;
  remove: (index: number) => void;
  watch: UseFormWatch<CreateIncomeForm>;
}) => {
  const quantity = watch(`items.${index}.quantity`);
  const price = watch(`items.${index}.price`);
  const total = (Number(quantity) || 0) * (Number(price) || 0);

  return (
    <div className="border p-3 rounded mb-3 flex items-end gap-3">
      <div className="flex-1">
        <FormField
          control={control}
          name={`items.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Наименование</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Товар" autoComplete="off"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-24">
        <FormField
          control={control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кол-во</FormLabel>
              <FormControl>
                <Input type="number" {...field} autoComplete="off"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-28">
        <FormField
          control={control}
          name={`items.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input type="number" {...field} autoComplete="off"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-28">
        <FormField
          control={control}
          name={`items.${index}.code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-28">
        <FormLabel>Сумма</FormLabel>
        <div className="p-2 border rounded bg-gray-50 text-right">
          {total.toFixed(2)}
        </div>
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};