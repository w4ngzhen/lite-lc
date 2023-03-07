import React, {useMemo, useState} from "react";
import {BuildEngine} from "../../engine/BuildEngine";
import {ComponentNodeDesignWrapper, ComponentNodeDesignWrapperProps} from "./ComponentNodeDesignWrapper";
import {ComponentNode} from "../../meta/ComponentNode";
import {ComponentNodeTreeDesignPanel} from "./ComponentNodeTreeDesignPanel";

interface DesignCanvasProps {
    /**
     * 传入的合法 ComponentNode
     */
    componentNode: ComponentNode;
}

export const DesignCanvas = (props: DesignCanvasProps) => {

    const {
        componentNode
    } = props;

    // 存储单机选中的path的state
    const [selectedNodePath, setSelectedNodePath] = useState<string>('');

    // buildEngine
    const buildEngine = useMemo(() => {
        return new BuildEngine();
    }, []);

    // 经过buildEngine + schema 创建的React组件（已经考虑的基本的异常处理）
    const renderComponent = useMemo(() => {
        try {
            return buildEngine.build(componentNode, {
                onCustomCreateElement: ctx => {
                    const {path, ComponentConstructor, props, children} = ctx;

                    // 不加Wrapper的原始构造后的组件
                    const originReactComp = (
                        <ComponentConstructor {...props}>
                            {children}
                        </ComponentConstructor>
                    )

                    const wrapperProps: ComponentNodeDesignWrapperProps = {
                        nodePath: path,
                        isSelected: path === selectedNodePath,
                        onClick: () => {
                            console.debug('wrapper onClick')
                            setSelectedNodePath(path)
                        }
                    }
                    return (
                        <ComponentNodeDesignWrapper {...wrapperProps}>
                            {originReactComp}
                        </ComponentNodeDesignWrapper>
                    )
                }
            });
        } catch (e) {
            return <div>构建出错：{e.message}</div>
        }
    }, [componentNode, selectedNodePath]);

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
                <ComponentNodeTreeDesignPanel
                    componentNode={componentNode}
                    selectedComponentNodePath={selectedNodePath}
                    onComponentNodeSelected={(selectedPath) => {
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