/**
 * 获取值
 *
 * @param obj 对象
 * @param key 键
 */
export default function getValue(obj: any, key: string) {
  let result: any = obj;
  const keys = key.split('.');
  for (const item of keys) {
    if (result && result instanceof Object) {
      result = result[item];
    } else {
      return undefined;
    }
  }

  return result;
}
