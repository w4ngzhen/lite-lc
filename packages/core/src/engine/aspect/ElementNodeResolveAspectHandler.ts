import {ElementNode} from "../../meta/ElementNode";

export interface ElementNodeResolveAspectHandleContext {
    /**
     * 当前构建的节点的path
     */
    path: string;
}

/**
 * 元素节点解析切面处理
 */
export type ElementNodeResolveAspectHandler =
    (elementNode: ElementNode, context: ElementNodeResolveAspectHandleContext) => ElementNode | undefined;
