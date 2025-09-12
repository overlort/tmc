"use client";

import { CreateIncomeModal } from "@/feature/income/createIncome";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllIncomes } from "@/entities/income/model/income.action";
import { IIncome } from "@/entities/income/model/income.type";
import { useRouter } from "next/navigation";

const IncomesPage = () => {
  const [isOpenCreation, setIsOpenCreation] = useState(false);
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const list = await getAllIncomes();
      setIncomes(list);
    };
    load();
  }, []);

  const getIncomeSum = (income: IIncome) => {
    let assetSum = 0;
    if (!!income?.asset) assetSum = income.asset.reduce((sum, item) => sum + item.price, 0);
    let consumableSum = 0;
    if (!!income?.consumable) consumableSum = income.consumable.reduce((sum, item) => sum + item.price, 0)
    return assetSum + consumableSum;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => {setIsOpenCreation(true)}}>Создать приход</Button>
      </div>
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-2">Дата создания</th>
              <th className="p-2">Инициатор</th>
              <th className="p-2">Номер</th>
              <th className="p-2">Дата счет фактуры</th>
              <th className="p-2">Продавец</th>
              <th className="p-2">Покупатель</th>
              <th className="p-2">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(i => (
              <tr key={i.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/income/${i.id}`)}>
                <td className="p-2">{new Date(i.createdAt).toLocaleDateString()}</td>
                <td className="p-2">{i.creatorName}</td>
                <td className="p-2">{i.incomeNumber}</td>
                <td className="p-2">{new Date(i.incomeDate).toLocaleDateString()}</td>
                <td className="p-2">{i.buyer}</td>
                <td className="p-2">{i.seller}</td>
                <td className="p-2">{getIncomeSum(i)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateIncomeModal
        isOpen={isOpenCreation}
        onClose={() => setIsOpenCreation(false)}
      />
    </div>
  )
}

export default IncomesPage;