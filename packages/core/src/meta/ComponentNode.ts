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

/**
 * 组件节点每一个属性的类型
 * 如果直接是string或number，则视为字面数据；
 * 否则，如果属于如下的具备type+value的结构，则按照具体的类型解析对应数据
 */
export type ComponentNodePropType = string | number | {
    /**
     * Expression 表达式
     * Literal 字面值
     * ScriptMethod 脚本方法
     */
    type: "Expression" | "Literal" | 'ScriptMethod';
    /**
     *
     * 根据上述的type，
     * 如果是Expression表达式，则该值只会是字符串，
     * 且一般形式为：" $DataModel@foo.bar"，从数据模型中推导出来
     *
     * 如果是Literal字面值，则有一下几种情况：
     * 1. 字符串，例如："hello"
     * 2. 数字，例如：123
     * 3. JSON数据（内部会转换为JSON对象，传入给实际的组件），例如：{"name": "Tom"}
     *
     * 如果是ScriptMethod脚本方法，则该属性视为一个需要传给当前节点对应组件事件的方法，
     * value值理论只会是字符串，表明绑定到哪个脚本："$ScriptModel@脚本名称"
     */
    value: any;
};