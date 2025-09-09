"use client";

import { CreateIncomeModal } from "@/feature/income/createIncome";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function IncomesPage() {
  const [isOpenCreation, setIsOpenCreation] = useState(false);

  return (
    <div>
      <Button onClick={() => {setIsOpenCreation(true)}}>Button</Button>
      <CreateIncomeModal
        isOpen={isOpenCreation}
        onClose={() => setIsOpenCreation(false)}
      />
    </div>
  )
}