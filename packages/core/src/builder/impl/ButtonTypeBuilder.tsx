import {TypeBuilder, TypeBuilderContext} from "../TypeBuilder";
import React, {ReactNode} from "react";
import {Button} from "antd";

export class ButtonTypeBuilder implements TypeBuilder {
    build(builderContext: TypeBuilderContext,
          childrenReactNode?: ReactNode[]): ReactNode {
        const {path, elementNode} = builderContext;
        const {text = 'button'} = elementNode.props;
        // 直接使用antd的Button
        return (
            <Button
                key={path}
                type='primary'>
                {text}
            </Button>
        )
    }
}
