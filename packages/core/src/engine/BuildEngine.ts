import {ElementNode} from "../meta/ElementNode";
import {TypeBuilderManager} from "../builder/TypeBuilderManager";
import {ReactNode} from "react"
import {ComponentBuildAspectHandler} from "./aspect/ComponentBuildAspectHandler";

/**
 * 构建引擎
 */
export class BuildEngine {

    /**
     * 引擎所持有的“组件构建切面处理器”
     * @private
     */
    private _componentBuildAspectHandler?: ComponentBuildAspectHandler;

    set componentBuildAspectHandler(value: ComponentBuildAspectHandler | undefined) {
        this._componentBuildAspectHandler = value;
    }

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     */
    build(rootEleNode: ElementNode): ReactNode | undefined {
        return this.innerBuild(rootEleNode, '/' + rootEleNode.type);
    }

    /**
     * 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
     * @param rootEleNode
     * @param rootPath
     */
    private innerBuild(rootEleNode: ElementNode, rootPath: string): ReactNode | undefined {
        if (!rootEleNode) {
            return undefined;
        }

        const {type, children} = rootEleNode;

        // 如果有子元素，则递归调用自身，获取子元素处理后的ReactNode
        const childrenReactNode =
            (children || []).map((childEleNode, index) => {
                // 子元素路径：
                // 父级路径（也就是当前path）+ '/' + 子元素类型 + 子元素所在索引
                const childPath = `${rootPath}/${childEleNode.type}@${index}`;
                return this.innerBuild(childEleNode, childPath);
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
                path: rootPath,
                elementNode: rootEleNode
            },
            childrenReactNode
        )

        if (this._componentBuildAspectHandler) {
            // BuildEngine使用者可以定义ReactNode切面处理，实现定制化
            console.debug('进入组件构建切面处理')
            return this._componentBuildAspectHandler(reactNode, {
                path: rootPath,
                elementNode: rootEleNode
            })
        }

        return reactNode;
    }
}
