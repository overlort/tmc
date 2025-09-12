"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, Folder } from "lucide-react";
import { iconsList, RenderIcon } from "@/components/renderIcon";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from "@/entities/category/model/category.action";
import { buildTree } from "../../../shared/utils/buildTree";

type CategoryNode = {
  id: number;
  name: string;
  icon?: string | null;
  parentId?: number | null;
  children?: CategoryNode[];
};

const CatalogTree = () => {
  const [tree, setTree] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [folderSearch, setFolderSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (renamingId && inputRef.current) {

      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renamingId]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      const preparedTree = buildTree(data)
      setTree(preparedTree);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCat = async (parentId?: number | null) => {
    const newCat = await createCategory({ name: "Новая папка", parentId: parentId || null, icon: "folder" })
    await load();
    setRenamingId(newCat.id);
    if (parentId) setExpanded((s) => ({ ...s, [parentId]: true }));
  };

  const deleteCat = async (id: number) => {
    if (!confirm("Удалить папку и все вложенные?")) return;
    try {
      await deleteCategory(id)
      if (selectedCategoryId === id) console.log(null);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = (id: number) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const filterTree = useCallback((nodes: CategoryNode[], q: string): CategoryNode[] => {
    if (!q) return nodes;
    const lowered = q.toLowerCase();
    return nodes
      .map((n) => {
        const children = filterTree(n.children ?? [], q);
        if (n.name.toLowerCase().includes(lowered) || children.length > 0) {
          return { ...n, children };
        }
        return null;
      })
      .filter(Boolean) as CategoryNode[];
  }, []);

  const filtered = useMemo(() => filterTree(tree, folderSearch), [filterTree, tree, folderSearch]);

  const TreeNode: React.FC<{ node: CategoryNode; depth?: number }> = ({ node, depth = 0 }) => {
    const [localEditingValue, setLocalEditingValue] = useState(node.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const isSelected = selectedCategoryId === node.id;
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isExpanded = expanded[node.id];

    // Фокус при старте редактирования
    useEffect(() => {
      if (renamingId === node.id && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [node.id]);

    const handleRename = async () => {
      if (localEditingValue.trim() === "") return; // не позволять пустое имя
      await updateCategory(node.id, { name: localEditingValue });
      setRenamingId(null);
      setTree((prev) => {
        const updateName = (nodes: CategoryNode[]): CategoryNode[] =>
          nodes.map((n) =>
            n.id === node.id
              ? { ...n, name: localEditingValue }
              : { ...n, children: n.children ? updateName(n.children) : undefined }
          );
        return updateName(prev);
      });
    };

    return (
      <li>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm w-full ${
                isSelected ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              style={{ paddingLeft: depth * 12 + 8 }}
              onClick={() => console.log(node.id)}
            >
              {/* Шеврон */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) toggle(node.id);
                }}
                className="flex items-center"
              >
                {hasChildren ? (
                  isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 inline-block" />
                )}
              </button>

              {/* Иконка */}
              <span className="mr-1">
              {renamingId === node.id ? null : <RenderIcon name={node.icon} />}
            </span>

              {/* Название / редактирование */}
              {renamingId === node.id ? (
                <Input
                  key={node.id}
                  ref={inputRef}
                  value={localEditingValue}
                  onChange={(e) => setLocalEditingValue(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRename();
                    } else if (e.key === "Escape") {
                      setRenamingId(null);
                      setLocalEditingValue(node.name);
                    }
                  }}
                  className="w-full"
                />
              ) : (
                <span className="truncate">{node.name}</span>
              )}
            </div>
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem onClick={() => createCat(node.id)}>
              <Plus className="mr-2 w-4 h-4" /> Создать вложенную папку
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                setRenamingId(node.id);
                setLocalEditingValue(node.name); // важно!
              }}
            >
              <Edit2 className="mr-2 w-4 h-4" /> Переименовать
            </ContextMenuItem>
            <ContextMenuItem onClick={() => deleteCat(node.id)}>
              <Trash2 className="mr-2 w-4 h-4" /> Удалить
            </ContextMenuItem>

            <ContextMenuSub>
              <ContextMenuSubTrigger>
              <span className="flex items-center gap-2">
                <Folder className="w-4 h-4" /> Сменить иконку
              </span>
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="grid grid-cols-5 gap-2 p-2 w-48">
                {iconsList.map((iconName) => (
                  <button
                    key={iconName}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await updateCategory(node.id, { name: node.name, icon: iconName });
                      setTree((prev) => {
                        const updateIcon = (nodes: CategoryNode[]): CategoryNode[] =>
                          nodes.map((n) =>
                            n.id === node.id
                              ? { ...n, icon: iconName }
                              : { ...n, children: n.children ? updateIcon(n.children) : undefined }
                          );
                        return updateIcon(prev);
                      });
                    }}
                    className="flex items-center justify-center w-8 h-8 hover:bg-gray-200 rounded"
                  >
                    <RenderIcon name={iconName} className="w-5 h-5" />
                  </button>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>

        {/* Рекурсивный рендер дочерних узлов */}
        {hasChildren && isExpanded && (
          <ul className="mt-1">
            {node.children!.map((c) => (
              <TreeNode key={c.id} node={c} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };


  return (
    <aside className="w-64 h-full border-r pr-4">
      <div className="flex items-center gap-2 mb-3">
        <Input
          value={folderSearch}
          onChange={(e) => setFolderSearch(e.target.value)}
          placeholder="Поиск папок"
          className="flex-1"
        />
        <Button onClick={() => createCat(selectedCategoryId)}>Новая папка</Button>
      </div>

      <div className="overflow-auto max-h-[60vh]">
        {loading ? (
          <div>Загружаю...</div>
        ) : filtered.length > 0 ? (
          <ul className="space-y-1">
            {filtered.map((n) => (
              <TreeNode key={n.id} node={n} />
            ))}
          </ul>
        ) : (
          <div className="text-sm text-center py-6">Папки не найдены</div>
        )}
      </div>
    </aside>
  );
}

export default CatalogTree;
