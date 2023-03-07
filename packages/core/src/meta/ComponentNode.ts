/**
 * 组件节点每一个属性的类型
 */
export type ComponentNodePropType = string | number;

/**
 * 组件节点
 */
export type ComponentNode = {
    /**
     * 组件节点唯一名称
     */
    componentName: string;
    /**
     * 组件各种属性集合
     */
    props: {
        [propName: string]: ComponentNodePropType;
    };
    /**
     * 组件节点子节点
     */
    children?: Array<ComponentNode>;
}