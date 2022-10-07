import {ReactNode} from "react";
import {ElementNode} from "../meta/ElementNode";

/**
 * 构建器构建上下文，至少包含ElementNode的相关数据
 */
export interface TypeBuilderContext {
    elementNode: Omit<ElementNode, ''>;
}

/**
 * 绑定Type的构建器
 */
export interface TypeBuilder {
    /**
     * 根据ElementNode上下文信息，得到ReactNode供React渲染
     * @param builderContext 构建器接受的数据上下文
     * @param childrenReactNode 已经完成构建的子节点的 ReactNode
     */
    build(
        builderContext: TypeBuilderContext,
        childrenReactNode?: ReactNode[],
    ): ReactNode;
}

/**
 * TypeBuilder构造函数类型
 */
export type TypeBuilderConstructor = new (args: any) => TypeBuilder;
