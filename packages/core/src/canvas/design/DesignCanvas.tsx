import React, {useMemo, useState} from "react";
import {BuildEngine} from "../../engine/BuildEngine";
import {ElementNodeDesignWrapper, ElementNodeDesignWrapperProps} from "./ElementNodeDesignWrapper";
import {ElementNode} from "../../meta/ElementNode";
import {ElementNodeDesignTreePanel} from "./ElementNodeDesignTreePanel";

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

    // 譬如：selectedNodePath => "/page/panel/button"
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
                    setSelectedNodePath(path);
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

    const elementNode = useMemo(() => {
        return JSON.parse(rootNodeSchemaJson) as ElementNode;
    }, [rootNodeSchemaJson]);

    // 经过buildEngine + schema 创建的React组件（已经考虑的基本的异常处理）
    const renderComponent = useMemo(() => {
        try {
            return buildEngine.build(elementNode);
        } catch (e) {
            return <div>构建出错：{e.message}</div>
        }
    }, [elementNode, selectedNodePath]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div style={{
                width: '250px',
                height: '100%'
            }}>
                <ElementNodeDesignTreePanel
                    rootElementNode={elementNode}
                    selectedElementNodePath={selectedNodePath}
                    onElementNodeSelected={(selectedPath) => {
                        if (selectedPath === '') {
                            // 代表再次点击节点，取消了选中
                            console.debug('取消选中');
                        }
                        setSelectedNodePath(selectedPath);
                    }}
                />
            </div>
            <div style={{
                width: 'calc(100% - 250px)',
                height: '100%'
            }}>
                {renderComponent}
            </div>
        </div>
    )

}

