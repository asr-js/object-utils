/**
 * 扁平化
 *
 * @param data 数据列表
 * @param cKey 子列表Key
 * @param pKey 父Key
 * @param idKey Id Key
 */
export default function flattened(data, cKey, pKey, idKey) {
    const list = [];
    data.forEach((item) => {
        list.push(item);
        if (item[cKey] && item[cKey].length) {
            flattened(item[cKey], cKey, pKey, idKey).forEach((child) => {
                list.push(child);
            });
            item[cKey] = [];
        }
    });
    const result = [];
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
//# sourceMappingURL=flattened.js.map