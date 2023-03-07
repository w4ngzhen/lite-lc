import {ComponentNode} from "../meta/ComponentNode";
import {COMPONENT_MAP} from "../component-map/ComponentMap";
import React from "react";

export class BuildEngine {

    /**
     * 构建：通过传入 ComponentNode 信息，得到该节点对应供React渲染的ReactNode
     * @param componentNode
     */
    build(componentNode: ComponentNode) {
        return this.innerBuild(componentNode);
    }

    /**
     * 构建：通过传入 ComponentNode 信息，得到该节点对应供React渲染的ReactNode
     * @param componentNode
     */
    private innerBuild(componentNode: ComponentNode) {

        if (!componentNode) {
            return undefined;
        }

        const {componentName, children, props} = componentNode;

        // 如果有子元素，则递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode =
            (children || []).map((childNode) => {
                return this.innerBuild(childNode);
            });

        // 通过 COMPONENT_MAP 来查找对应组件的构造器
        const componentConstructor = COMPONENT_MAP[componentName];

        return React.createElement(
            componentConstructor,
            {...props},
            childrenReactNode.length > 0 ? childrenReactNode : undefined
        )
    }
}