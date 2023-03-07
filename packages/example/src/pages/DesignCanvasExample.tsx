import {ChangeEvent, useMemo, useState} from "react";
import {Input} from 'antd';
import {ComponentNode, DesignCanvas} from "@lite-lc/core";

export function DesignCanvasExample() {

    // 使用state存储一个schema的字符串
    const [componentNodeJson, setComponentNodeJson] = useState(JSON.stringify({
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
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{width: '100%', height: 'calc(50%)'}}>
                <Input.TextArea
                    autoSize={{minRows: 2, maxRows: 10}}
                    value={componentNodeJson}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value;
                        // 编辑框发生修改，重新设置JSON
                        setComponentNodeJson(value);
                    }}/>
            </div>
            <div style={{width: '100%', height: 'calc(50%)', border: '1px solid gray'}}>
                <DesignCanvas componentNode={componentNode}/>
            </div>
        </div>
    );
}