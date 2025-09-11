"use client";

import { Button } from "@/components/ui/button";
import { deleteIncome } from "@/entities/income/model/income.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteIncomeButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await deleteIncome(id);
      toast("✅ Счёт удалён");
      router.push("/income");
    } catch (e) {
      console.error(e);
      toast("❌ Не удалось удалить счёт");
    }
  };

  return <Button variant="destructive" onClick={onDelete}>Удалить</Button>;
};


