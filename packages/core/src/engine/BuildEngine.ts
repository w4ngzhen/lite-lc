import {ElementNode} from "../meta/ElementNode";
import {TypeBuilderManager} from "../builder/TypeBuilderManager";
import {ReactNode} from "react"

/**
 * 构建引擎
 */
export class BuildEngine {

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     */
    build(rootEleNode: ElementNode): ReactNode | undefined {
        return this.innerBuild(rootEleNode);
    }

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     */
    private innerBuild(rootEleNode: ElementNode): ReactNode | undefined {
        if (!rootEleNode) {
            return undefined;
        }
        
        const {type, children} = rootEleNode;

        // 如果有子元素，则递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode =
            (children || []).map((childEleNode) => {
                return this.innerBuild(childEleNode)
            });

        // 通过 TypeBuilderManager 来统一查找对应ElementType的Builder
        const typeBuilder = TypeBuilderManager.getInstance().getTypeBuilder(type);
        if (!typeBuilder) {
            console.warn(`找不到type="${type}"的builder`)
            return undefined;
        }

        // 调用TypeBuilder的build，让其实例内部生成ReactNode
        const reactNode = typeBuilder.build(
            {
                elementNode: rootEleNode
            },
            childrenReactNode
        )
        return reactNode;
    }
}
