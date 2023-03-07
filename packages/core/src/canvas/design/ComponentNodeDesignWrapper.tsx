import React, {CSSProperties, FC, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";

export type ComponentNodeDesignWrapperProps = {
    /**
     * 标识当前节点path
     */
    nodePath: string;
    /**
     * 是否被选中
     */
    isSelected?: boolean;
    /**
     * 点击事件
     */
    onClick?: () => void;
}


export const ComponentNodeDesignWrapper: FC<PropsWithChildren<ComponentNodeDesignWrapperProps>> = (props) => {

    const {
        nodePath,
        isSelected = false,
        children,
        onClick = () => {
        }
    } = props;

    const ref = useRef<HTMLDivElement | null>(null);

    const [
        targetNodeHtmlType,
        setTargetNodeHtmlType
    ] = useState<string>();

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }
        const currentEle: HTMLDivElement = ref.current;
        const eleNodeName = currentEle.firstChild.nodeName;
        setTargetNodeHtmlType(eleNodeName);
    });

    const style: CSSProperties = useMemo(() => {
        // Wrapper内部以下实际的HTML元素在展示的过程中，需要使用inline-block
        // 否则会显示异常
        const inlineBlockEle = ['A', 'SPAN', 'BUTTON', 'B', 'I'];
        return {
            boxSizing: 'border-box',
            // 元素被选中，则使用蓝色高亮边框，否则使用灰色虚线
            outline: isSelected ? '2px solid blue' : '1px dashed gray',
            display: inlineBlockEle.includes(targetNodeHtmlType) ? 'inline-block' : '',
            padding: '3px',
            margin: '3px'
        }
    }, [isSelected, targetNodeHtmlType]);

    return (
        <div key={nodePath + '_wrapper_key'}
             style={style}
             ref={ref}
             onClick={(event) => {
                 event.stopPropagation();
                 onClick();
             }}>
            {children}
        </div>
    )
}