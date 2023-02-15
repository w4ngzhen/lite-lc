/**
 * 工具方法：根据ElementNode的path，得到该节点的整个链路path形成的数组
 * 该方法的依据是每一个元素节点的path，总是按如下方式构成：
 * 父级元素节点的path
 * 拼上斜杠（"/"），
 * 再拼上当前节点的type
 * 再拼上当前节点位于父级children的索引位置（基于0）
 *
 * 例如：path = "/page/panel@0/button@2"
 * 代表该元素的type = "button"，且位于父级元素（path = "/page/panel@0"）children索引为2的位置（第3个）
 * 所以，该元素的ElementNode Json大致为：
 * {
 *     "type": "page",
 *     "children": [
 *         {
 *             "type": "panel",
 *             "children": [
 *                 {... ...},
 *                 {... ...},
 *                 // 不管前面2个是什么，但是索引2（第3个）节点是button
 *                 {
 *                     "type": "button",
 *                 }
 *             ]
 *         },
 *         // 不管后面还有啥，但是上面是children[0] => panel
 *         ... ...
 *     ]
 * }
 * @param path
 */
export function generateFullPathChainListByPath(path: string): string[] {

    if (!path || !path.includes('/')) {
        return [];
    }

    // /a/b/c
    // ['a', 'b', 'c']
    const pathSegments = path.split('/').filter(seg => seg && seg !== '');

    // ['/a', '/a/b', '/a/b/c']
    const pathList = [];
    for (let i = 0; i < pathSegments.length; i++) {
        const currSeg = pathSegments[i];
        const currPostPath = '/' + currSeg;
        if (i === 0) {
            pathList.push(currPostPath);
        } else {
            pathList.push(pathList[i - 1] + currPostPath);
        }
    }

    return pathList;
}