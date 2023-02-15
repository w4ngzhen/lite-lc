import React, {useEffect, useMemo, useState} from "react";
import {ElementNode} from "../../meta/ElementNode";
import {Tree} from 'antd';
import { generateFullPathChainListByPath } from "../../utils";

interface ElementNodeDesignTreePanelProps {
    /**
     * 根ElementNode
     */
    rootElementNode: ElementNode;
    /**
     * 选中的元素节点
     */
    selectedElementNodePath: string;
    /**
     * 点击选中Tree中的某个节点的事件回调
     * @param selectedPath 选中指定的ElementNode的Path，譬如："/page/panel@0/button@0"
     * @param selectedPathList 选中的指定的ElementNode的完整链路Path列表
     * 譬如：["/page", "/page/panel@0", "/page/panel@0/button@0"]
     */
    onElementNodeSelected: (selectedPath: string) => void;
}

export const ElementNodeDesignTreePanel = (props: ElementNodeDesignTreePanelProps) => {

    const {
        rootElementNode,
        selectedElementNodePath,
        onElementNodeSelected,
    } = props;

    const [expandedPathList, setExpandedPathList] = useState<string[]>([]);

    useEffect(() => {
        setExpandedPathList(generateFullPathChainListByPath(selectedElementNodePath));
    }, [selectedElementNodePath]);

    const treeData = useMemo(() => {
        /**
         * 通过递归，对rootElementNode进行递归构建为 Tree 组件所需要的数据TreeNode
         * @param eleNode
         * @param eleNodePath
         */
        function loopBuildTreeNode(eleNode: ElementNode, eleNodePath: string): InnerElementNodeTreeNodeType {
            const key = eleNodePath;
            const title = eleNode.type;
            const treeNodeChildren =
                (eleNode.children || []).map((childNode, idx) => {
                    const childPath = `${eleNodePath}/${childNode.type}@${idx}`;
                    return loopBuildTreeNode(childNode, childPath);
                })
            return {
                key,
                title,
                children: treeNodeChildren
            }
        }

        // root 节点需要放入数组返回
        return [loopBuildTreeNode(rootElementNode, `/${rootElementNode.type}`)]
    }, [rootElementNode]);

    return (
        <Tree treeData={treeData}
              blockNode={true}

              titleRender={nodeData => {
                  return <div>{nodeData.title}</div>
              }}

              onSelect={(selectedKeys: string[]) => {
                  if (selectedKeys.length === 0) {
                      // 为空，代表取消了某个节点的选中
                      onElementNodeSelected('');
                  } else {
                      // 在单选的模式下，如果有选中，则selectedKeys有且仅有一个选中的key的数组
                      const selectedNodePath = selectedKeys[0];
                      onElementNodeSelected(selectedNodePath);
                  }
              }}
              onExpand={(expandedKeys: string[]) => {
                  // expandedKeys 在展开或关闭下，是一个包含1个或多个元素的数组，是整个展开的链路
                  setExpandedPathList(expandedKeys);
              }}

              expandedKeys={expandedPathList}
              selectedKeys={[selectedElementNodePath]}
        />
    )
}

/**
 * 定义树形控件所需要的树状节点类型
 */
type InnerElementNodeTreeNodeType = {
    key: string;
    title: string;
    children: InnerElementNodeTreeNodeType[];
}
