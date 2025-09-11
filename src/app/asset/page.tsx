"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListOfAssets from "@/feature/asset/listOfAssets";
import { CreateAssetModal } from "@/feature/asset/createAsset";
import { IAsset } from "@/entities/asset/model/asset.types";
import { getAllAssets } from "@/entities/asset/model/asset.action";

const AssetPage = () => {
  const [search, setSearch] = useState("");
  const [isOpenItem, setIsOpenItem] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [preFilledName, setPreFilledName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllAssets();
      setAssets(data);
    };
    getData();
  }, []);

  const refetch = async () => {
    const data = await getAllAssets();
    setAssets(data);
  };

  const onCreationItem = () => {
    refetch();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = (e: FormEvent) => e.preventDefault();

  const openOrderDrawerWithSearch = () => {
    setPreFilledName(search);
  };

  const filteredItems = assets.filter((item) => {
    const matchesSearch =
      item?.inventoryNumber?.includes(search) || item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategoryId || item.categoryId === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
      >
        <Input value={search} onChange={handleInputChange} placeholder="Введите текст для поиска" className="flex-1" />
        <Button type="button" onClick={() => setIsOpenItem(true)}>
          Добавить товар
        </Button>
      </form>

      {filteredItems.length > 0 ? (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          <ListOfAssets items={filteredItems} search={search} />
        </div>
      ) : (
        <div className="text-center py-8">
          <p>Ничего не найдено, попробуйте изменить запрос или</p>
          <Button variant="outline" onClick={openOrderDrawerWithSearch} className="mt-2">
            Создайте заявку
          </Button>
        </div>
      )}

      <CreateAssetModal onCreation={onCreationItem} isOpen={isOpenItem} onClose={() => setIsOpenItem(false)} />
    </div>
  );
}

export default AssetPage;


