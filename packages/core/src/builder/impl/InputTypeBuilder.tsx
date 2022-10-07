import {TypeBuilder, TypeBuilderContext} from "../TypeBuilder";
import React, {ReactNode} from "react";
import {Input} from "antd";

export class InputTypeBuilder implements TypeBuilder {
    build(builderContext: TypeBuilderContext,
          childrenReactNode?: ReactNode[]): ReactNode {
        const {path} = builderContext;
        // 使用antd的Input
        return (
            <Input key={path} />
        )
    }
}
