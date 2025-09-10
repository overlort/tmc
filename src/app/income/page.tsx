"use client";

import { CreateIncomeModal } from "@/feature/income/createIncome";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const IncomesPage = () => {
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

export default IncomesPage;