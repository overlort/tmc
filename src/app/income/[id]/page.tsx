import { getIncomeById } from "@/entities/income/model/income.action";
import { notFound } from "next/navigation";
import { DeleteIncomeButton } from "@/feature/income/ui/DeleteIncomeButton";
import { EditIncomeButton } from "@/feature/income/ui/EditIncomeButton";
import { AddAssetToIncome } from "@/feature/income/ui/AddAssetToIncome";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

const IncomeDetailsPage = async ({ params }: PageProps) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) return notFound();

  const income = await getIncomeById(id);
  if (!income) return notFound();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Счёт № {income.incomeNumber}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div><span className="text-gray-500">Создатель:</span> {income.creatorName}</div>
          <div><span className="text-gray-500">Дата счёта:</span> {new Date(income.incomeDate).toLocaleDateString()}</div>
          <div><span className="text-gray-500">Продавец:</span> {income.seller}</div>
          <div><span className="text-gray-500">Покупатель:</span> {income.buyer}</div>
        </div>
        <div>
          <div className="text-gray-500">Скан счёта:</div>
          <div className="mt-2 w-48 h-48 relative border border-gray-200">
            <Image src={income.photoUrl} alt="scan" fill className="mt-2 w-48 h-48 object-cover border" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <DeleteIncomeButton id={income.id} />
        <EditIncomeButton income={income} />
        <AddAssetToIncome incomeId={income.id} />
      </div>
    </div>
  );
}

export default IncomeDetailsPage;
