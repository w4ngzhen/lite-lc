import {ElementNode} from "../../meta/ElementNode";
import {ReactNode} from "react";

export interface ComponentBuildAspectHandleContext {
    /**
     * 当前构建的节点的path
     */
    path: string;
    /**
     * 当前构建的元素节点数据
     */
    elementNode: Omit<ElementNode, ''>;
}
/**
 * 构建切面
 * @param reactNode 通过typeBuilder构建出的reactNode
 * @param handleContext 封装的一些支持切面处理的上下文
 */
export type ComponentBuildAspectHandler =
    (reactNode: ReactNode,
     handleContext: ComponentBuildAspectHandleContext) => ReactNode
