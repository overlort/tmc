import { ICategory  } from "@/entities/category/model/category.types";

export function buildTree(rows: ICategory []) {
  const map = new Map<string, CategoryRow & { children: any[] }>();
  rows.forEach((r) => map.set(r.id, { ...r, children: [] }));

  const roots: Array<CategoryRow & { children: any[] }> = [];
  map.forEach((node) => {
    if (node.parentId) {
      const p = map.get(node.parentId);
      if (p) p.children.push(node);
      else roots.push(node); // родитель не найден — покажем в корне
    } else {
      roots.push(node);
    }
  });

  // по желанию можно отсортировать children по name
  const sortRec = (arr: any[]) => {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    arr.forEach((c) => c.children && sortRec(c.children));
  };
  sortRec(roots);

  return roots;
}