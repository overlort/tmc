"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDisposeButtonProps {
  onConfirm: () => Promise<void> | void;
}

export function ConfirmDisposeButton({ onConfirm }: ConfirmDisposeButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (confirmOpen) {
    return (
      <div className="flex items-center gap-2">
        <span>Подтвердите списание?</span>
        <Button type="submit" variant="secondary" onClick={() => setConfirmOpen(false)}>Да, списать</Button>
        <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>Отмена</Button>
      </div>
    );
  }

  return (
    <Button type="button" variant="secondary" onClick={() => setConfirmOpen(true)}>Списать</Button>
  );
}




