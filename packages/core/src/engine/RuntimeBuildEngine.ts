import {BuildEngine} from "./BuildEngine";
import {ElementNode} from "../meta/ElementNode";

/**
 * 运行时BuildEngine
 */
export class RuntimeBuildEngine {
    private readonly _buildEngine: BuildEngine;

    constructor() {
        this._buildEngine = new BuildEngine();
        this._buildEngine.elementNodeResolveAspectHandler =
            (eleNode, ctx) => {
                console.debug(`[elementNodeResolveAspectHandler] current elementNode: ${eleNode.type}, path: ${ctx.path}`)
                // 务必返回节点
                return eleNode
            }
        this._buildEngine.componentBuildAspectHandler =
            (reactNode, ctx) => {
                console.debug(`[componentBuildAspectHandler] current reactNode: `, reactNode, ctx);
                // 务必返回节点
                return reactNode;
            }
    }

    /**
     * 内部代理BuildEngine.build
     * @param rootEleNode
     */
    build(rootEleNode: ElementNode) {
        return this._buildEngine.build(rootEleNode);
    }
}
