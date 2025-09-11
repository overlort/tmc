"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateAssetModal } from "@/feature/asset/createAsset";

export const AddAssetToIncome = ({ incomeId }: { incomeId: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Добавить актив</Button>
      <CreateAssetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreation={() => setIsOpen(false)}
      />
    </>
  );
};


