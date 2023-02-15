import {ChangeEvent, useState} from "react";
import {Input} from 'antd';
import {DesignCanvas} from "@lite-lc/core";

export function SimpleExample() {

    // 使用state存储一个schema的字符串
    const [elementNodeJson, setElementNodeJson] = useState(JSON.stringify({
        "type": "page",
        "props": {
            "backgroundColor": "pink", // page的 backgroundColor 配置
        },
        "children": [
            {
                "type": "button",
                "props": {
                    "size": "blue" // button的size配置
                },
            },
            {
                "type": "page",
                "children": [
                    {
                        "type": "button",
                        "props": {
                            "size": "blue" // button的size配置
                        },
                    },
                    {
                        "type": "page",
                        "children": [
                            {
                                "type": "input"
                            }
                        ]
                    }
                ]
            }
        ]
    }, null, 2))

    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{width: '100%', height: 'calc(50%)'}}>
                <Input.TextArea
                    autoSize={{minRows: 2, maxRows: 10}}
                    value={elementNodeJson}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value;
                        // 编辑框发生修改，重新设置JSON
                        setElementNodeJson(value);
                    }}/>
            </div>
            <div style={{width: '100%', height: 'calc(50%)', border: '1px solid gray'}}>
                <DesignCanvas rootNodeSchemaJson={elementNodeJson}/>
            </div>
        </div>
    );
}
