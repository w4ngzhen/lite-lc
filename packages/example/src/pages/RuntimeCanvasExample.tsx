import React, {useMemo, useState} from "react";
import {ComponentNode, RuntimeCanvas} from "@lite-lc/core";

export function RuntimeCanvasExample() {

    // 使用state存储一个schema的字符串
    const [componentNodeJson] = useState(JSON.stringify({
        "componentName": "page",
        "children": [
            {
                "componentName": "button",
                "props": {
                    "size": "small",
                    "type": "primary"
                },
                "children": [
                    {
                        "componentName": "text",
                        "props": {
                            "value": "hello, my button."
                        }
                    }
                ]
            },
            {
                "componentName": "input"
            }
        ]
    }, null, 2))

    const componentNode = useMemo(() => {
        return JSON.parse(componentNodeJson) as ComponentNode;
    }, [componentNodeJson])

    return (
        <RuntimeCanvas componentNode={componentNode} scripts={[]} dataModel={{}}/>
    );
}