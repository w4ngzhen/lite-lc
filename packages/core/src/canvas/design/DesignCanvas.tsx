import React, {useMemo, useState} from "react";
import {BuildEngine} from "../../engine/BuildEngine";
import {ElementNodeDesignWrapper, ElementNodeDesignWrapperProps} from "./ElementNodeDesignWrapper";

interface DesignCanvasProps {
    /**
     * Schema JSON字符串
     */
    rootNodeSchemaJson: string;
}

export const DesignCanvas = (props: DesignCanvasProps) => {

    const {
        rootNodeSchemaJson
    } = props;

    // 存储单机选中的path的state
    const [selectedNodePath, setSelectedNodePath] = useState<string>('');

    // 经过切面绑定的buildEngine
    const buildEngine = useMemo(() => {
        const engine = new BuildEngine();
        engine.componentBuildAspectHandler = (reactNode, ctx) => {
            const {path} = ctx;

            const wrapperProps: ElementNodeDesignWrapperProps = {
                nodePath: path,
                isSelected: path === selectedNodePath,
                onClick: () => {
                    console.debug('wrapper onClick')
                    setSelectedNodePath(path)
                }
            }

            return (
                <ElementNodeDesignWrapper {...wrapperProps}>
                    {reactNode}
                </ElementNodeDesignWrapper>
            )
        }
        return engine;
    }, [selectedNodePath]);

    // 经过buildEngine + schema 创建的React组件（已经考虑的基本的异常处理）
    const renderComponent = useMemo(() => {
        try {
            const eleNode = JSON.parse(rootNodeSchemaJson);
            return buildEngine.build(eleNode);
        } catch (e) {
            return <div>构建出错：{e.message}</div>
        }
    }, [rootNodeSchemaJson, selectedNodePath]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '5px'
        }}>
            {renderComponent}
        </div>
    )

}