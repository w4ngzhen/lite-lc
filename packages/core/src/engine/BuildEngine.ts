import {ComponentNode} from "../meta/ComponentNode";
import {COMPONENT_MAP} from "../component-map/ComponentMap";
import React from "react";
import {CustomCreateElementHandle} from "./aspect/CustomCreateElementHandle";

/**
 * 构建参数
 */
export interface BuildOptions {
    /**
     * 允许外部使用者自定义组件的构建过程
     */
    onCustomCreateElement?: CustomCreateElementHandle;
}

export class BuildEngine {

    /**
     * 构建：通过传入 ComponentNode 信息，得到该节点对应供React渲染的ReactNode
     * @param componentNode
     * @param buildOptions
     */
    build(componentNode: ComponentNode, buildOptions?: BuildOptions) {
        // 起始节点，需要构造一个起始path传入innerBuild
        // 根节点由于不属于某一个父级的子元素，所以不存在'@${index}'
        return this.innerBuild(componentNode, '/' + componentNode.componentName, buildOptions);
    }

    /**
     * 构建：通过传入 ComponentNode 信息，得到该节点对应供React渲染的ReactNode
     * @param componentNode
     * @param path
     * @param buildOptions
     */
    private innerBuild(componentNode: ComponentNode, path: string, buildOptions?: BuildOptions) {

        if (!componentNode) {
            return undefined;
        }

        const {componentName, children, props} = componentNode;

        // 如果有子元素，则递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode =
            (children || []).map((childNode, index) => {
                // 子元素路径：
                // 父级路径（也就是当前path）+ '/' + 子元素名称 + '@' + 子元素所在索引
                const childPath = `${path}/${childNode.componentName}@${index}`;
                return this.innerBuild(childNode, childPath, buildOptions);
            });

        // 通过 COMPONENT_MAP 来查找对应组件的构造器
        const componentConstructor = COMPONENT_MAP[componentName];

        if (typeof buildOptions?.onCustomCreateElement === 'function') {
            // 如果外部提供了对应的自定义创建实现，则使用之
            return buildOptions.onCustomCreateElement({
                componentNode,
                path,
                ComponentConstructor: componentConstructor,
                props: {...props},
                children: childrenReactNode.length > 0 ? childrenReactNode : undefined
            })
        }

        return React.createElement(
            componentConstructor,
            {...props, key: path},
            childrenReactNode.length > 0 ? childrenReactNode : undefined
        )
    }
}