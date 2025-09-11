"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IIncome } from "@/entities/income/model/income.type";
import { toast } from "sonner";

export const EditIncomeButton = ({ income }: { income: IIncome }) => {
  const [pending, setPending] = useState(false);

  const onEdit = async () => {
    setPending(true);
    try {
      // Тут можно открыть модал редактирования; пока заглушка
      toast("Редактирование пока не реализовано");
    } finally {
      setPending(false);
    }
  };

  return <Button disabled={pending} onClick={onEdit}>Редактировать</Button>;
};


