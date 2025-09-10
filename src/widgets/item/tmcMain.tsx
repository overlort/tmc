"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListOfItems from "@/feature/item/listOfItems";
import { IItem } from "@/entities/item/model/item.types";
import { getAllItems } from "@/entities/item/model/item.action";
import { CreateItemModal } from "@/feature/item/createItem";
import CatalogTree from "@/feature/category/catalogTree";

const TmcMain = () => {
  const [search, setSearch] = useState("");
  const [isOpenItem, setIsOpenItem] = useState(false);
  // const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [items, setItems] = useState<IItem[]>([]);
  const [preFilledName, setPreFilledName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  console.log(preFilledName)
  useEffect(() => {
    const getData = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    getData();
  }, []);

  const refetch = async () => {
    const data = await getAllItems();
    setItems(data);
  };

  const onCreationItem = () => {
    refetch();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = (e: FormEvent) => e.preventDefault();

  const openOrderDrawerWithSearch = () => {
    setPreFilledName(search);
    // setIsOpenOrder(true);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item?.inventoryNumber?.includes(search) || item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategoryId || item.categoryId === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  return (
    <div />
  );
}

export default TmcMain;
