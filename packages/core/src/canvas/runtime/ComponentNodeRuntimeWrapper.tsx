import React, {CSSProperties, FC, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";

export type ComponentNodeRuntimeWrapperProps = {
    /**
     * 标识当前节点path
     */
    nodePath: string;
}


export const ComponentNodeRuntimeWrapper: FC<PropsWithChildren<ComponentNodeRuntimeWrapperProps>> = (props) => {

    const {
        nodePath,
        children,
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
            display: inlineBlockEle.includes(targetNodeHtmlType) ? 'inline-block' : '',
            padding: '3px',
            margin: '3px'
        }
    }, [targetNodeHtmlType]);

    return (
        <div key={nodePath + '_wrapper_key'}
             style={style}
             ref={ref}>
            {children}
        </div>
    )
}