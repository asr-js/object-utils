/**
 * 扁平化
 *
 * @param data 数据列表
 * @param cKey 子列表Key
 * @param pKey 父Key
 * @param idKey Id Key
 */
export default function flattened<T extends any>(
  data: T[],
  cKey: string,
  pKey: string,
  idKey: string,
) {
  const list: T[] = [];
  data.forEach((item) => {
    list.push(item);
    if (item[cKey] && item[cKey].length) {
      flattened(item[cKey], cKey, pKey, idKey).forEach((child) => {
        list.push(child);
      });
      item[cKey] = [];
    }
  });

  const result: T[] = [];
  list.forEach((item) => {
    for (const temp of result) {
      if (temp[idKey] === item[idKey] && temp[pKey] === item[pKey]) {
        return;
      }
    }
    result.push(item);
  });

  return result;
}
