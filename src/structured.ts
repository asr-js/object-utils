import flattened from './flattened';

/**
 * 获取父对象
 *
 * @param list 列表
 * @param parentId 父对象Id
 */
function findParent<T extends any>(list: T[], parentId: any) {
  return list.find((temp) => temp.id === parentId);
}

/**
 * 结构化
 *
 * @param data 数据列表
 * @param cKey 子列表Key
 * @param pKey 父Key
 * @param idKey Id Key
 */
export default function structured<T extends any>(
  data: T[],
  cKey: string,
  pKey: string,
  idKey: string,
) {
  // 扁平化数据列表
  const list = flattened(data, cKey, pKey, idKey);

  // 获取父子对象列表
  const pcs = list
    .filter((item) => item[pKey] && item[pKey] !== 0 && item[pKey] !== '0') // 获取子对象
    .map((item) => ({
      child: item,
      parent: findParent(list, item[pKey]),
    })) // 获取父对象, 与子对象组成父子对象
    .filter((item) => item.parent); // 获取包含父对象的父子对象

  // 设置未初始化的子列表
  pcs
    .map((item) => item.parent) // 获取父子对象中的父对象
    .filter((item: T) => !item[cKey]) // 获取未初始化子列表的对象
    .forEach((item: T) => (item.param = [])); // 初始化子列表

  // 将子对象归入父对象的子对象列表
  pcs.forEach((item) => {
    (item.parent as T)[cKey].push(item.child);
  });

  return list.filter(
    (item: T) => !item[pKey] || item[pKey] === 0 || item[pKey] === '0',
  );
}
