export const hM = (value: string | number, search: string | number): string => {
  if (!search) return String(value);

  const valueStr = String(value);
  const searchStr = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // экранируем спец. символы

  const regex = new RegExp(`(${searchStr})`, 'gi');

  return valueStr.replace(regex, '<mark>$1</mark>');
}
