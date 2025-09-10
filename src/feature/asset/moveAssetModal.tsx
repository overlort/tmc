"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MoveAssetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MoveAssetModal({ open, setOpen }: MoveAssetModalProps) {
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>Переместить</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
            <h3 className="text-lg font-semibold mb-4">Перемещение актива</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Новый владелец</label>
                <Input name="owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="ФИО или отдел" autoComplete="off" />
              </div>
              <div>
                <label className="block text-sm mb-1">Куда переместить</label>
                <Input name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Локация/кабинет" autoComplete="off" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
                <Button type="submit" onClick={() => setOpen(false)}>Сохранить</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


