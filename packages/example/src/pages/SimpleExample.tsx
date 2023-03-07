import {BuildEngine} from "@lite-lc/core";
import {ChangeEvent, useState} from "react";
import {Input} from 'antd';

export function SimpleExample() {

    // 使用构建引擎
    const [buildEngine] = useState(new BuildEngine());

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

    let reactNode;
    try {
        const eleNode = JSON.parse(componentNodeJson);
        reactNode = buildEngine.build(eleNode);
    } catch (e) {
        // 序列化出异常，返回JSON格式出错
        reactNode = <div>JSON格式出错</div>
    }

    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{width: '100%', height: 'calc(50%)'}}>
                <Input.TextArea
                    rows={4}
                    value={componentNodeJson}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value;
                        // 编辑框发生修改，重新设置JSON
                        setComponentNodeJson(value);
                    }}/>
            </div>
            <div style={{width: '100%', height: 'calc(50%)', border: '1px solid gray'}}>
                {reactNode}
            </div>
        </div>
    );
}