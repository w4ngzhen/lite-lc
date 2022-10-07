export interface ElementNode {
    /**
     * Element 唯一类型type
     */
    type: string;
    /**
     * 组件的各种属性：
     * 扩展的、UI的
     */
    props: {
        [propsKey: string]: any;
    };
    /**
     * Element 的所有子元素
     */
    children?: ElementNode[]
}
