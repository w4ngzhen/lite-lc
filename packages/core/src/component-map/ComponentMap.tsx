import {Button, Input} from "antd";
import React from "react";


/**
 * lite-lc内置的文本字面量节点，支持string、number
 */
const Text = ({value}: { value: string | number }) => {
    return <>{value}</>;
}

export const COMPONENT_MAP = {
    'page': 'div', // page直接使用div
    'button': Button,
    'input': Input,
    'text': Text
}
