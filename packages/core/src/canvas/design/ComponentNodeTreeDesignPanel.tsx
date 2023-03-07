import {ComponentNode} from "../../meta/ComponentNode";
import React, {useEffect, useMemo, useState} from "react";
import {generateFullPathChainListByPath} from "../../utils";
import {Tree} from "antd";

interface ComponentNodeTreeDesignPanelProps {
    /**
     * 根 ComponentNode
     */
    componentNode: ComponentNode;
    /**
     * 选中的元素节点
     */
    selectedComponentNodePath: string;
    /**
     * 点击选中Tree中的某个节点的事件回调
     * @param selectedNodePath 选中指定的节点的Path，
     * 譬如："/page/panel@0/button@0"
     */
    onComponentNodeSelected: (selectedNodePath: string) => void;
}


export const ComponentNodeTreeDesignPanel = (props: ComponentNodeTreeDesignPanelProps) => {

    const {
        componentNode,
        selectedComponentNodePath,
        onComponentNodeSelected
    } = props;

    const [expandedPathList, setExpandedPathList] = useState<string[]>([]);

    useEffect(() => {
        setExpandedPathList(generateFullPathChainListByPath(selectedComponentNodePath));
    }, [selectedComponentNodePath]);

    const treeData = useMemo(() => {
        /**
         * 通过递归，对 ComponentNode 进行递归构建为 Tree 组件所需要的数据TreeNode
         * @param compNode
         * @param nodePath
         */
        function loopBuildTreeNode(compNode: ComponentNode, nodePath: string): InnerUiTreeNodeType {
            const key = nodePath;
            const title = compNode.componentName;
            const treeNodeChildren =
                (compNode.children || []).map((childNode, idx) => {
                    const childPath = `${nodePath}/${childNode.componentName}@${idx}`;
                    return loopBuildTreeNode(childNode, childPath);
                })
            return {
                key,
                title,
                children: treeNodeChildren
            }
        }

        // root 节点需要放入数组返回
        return [loopBuildTreeNode(componentNode, `/${componentNode.componentName}`)]
    }, [componentNode]);

    return (
        <Tree treeData={treeData}
              blockNode={true}

              titleRender={nodeData => {
                  return <div>{nodeData.title}</div>
              }}

              onSelect={(selectedKeys: string[]) => {
                  if (selectedKeys.length === 0) {
                      // 为空，代表取消了某个节点的选中
                      onComponentNodeSelected('');
                  } else {
                      // 在单选的模式下，如果有选中，则selectedKeys有且仅有一个选中的key的数组
                      const selectedNodePath = selectedKeys[0];
                      onComponentNodeSelected(selectedNodePath);
                  }
              }}
              onExpand={(expandedKeys: string[]) => {
                  // expandedKeys 在展开或关闭下，是一个包含1个或多个元素的数组，是整个展开的链路
                  setExpandedPathList(expandedKeys);
              }}

              expandedKeys={expandedPathList}
              selectedKeys={[selectedComponentNodePath]}
        />
    )
}

/**
 * 定义树形控件所需要的树状节点类型
 */
type InnerUiTreeNodeType = {
    key: string;
    title: string;
    children: InnerUiTreeNodeType[];
}