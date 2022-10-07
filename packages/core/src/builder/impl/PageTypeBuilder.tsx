import {TypeBuilder, TypeBuilderContext} from "../TypeBuilder";
import React, {CSSProperties, ReactNode} from "react";

export class PageTypeBuilder implements TypeBuilder {

    build(builderContext: TypeBuilderContext,
          childrenReactNode?: ReactNode[]): ReactNode {
        const style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }
        // 对于type = 'page'，就是用一个div作为UI组件
        // 注意，对于容器类组件，始终需要将传入的子元素放到对应的位置，控制子元素的展示
        return (
            <div style={style}>
                {childrenReactNode}
            </div>
        )
    }
}
