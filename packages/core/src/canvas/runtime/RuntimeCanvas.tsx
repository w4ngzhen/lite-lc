import React, {useMemo} from "react";
import {BuildEngine} from "../../engine/BuildEngine";
import {ComponentNode, ComponentNodePropType} from "../../meta/ComponentNode";
import {ComponentNodeRuntimeWrapper, ComponentNodeRuntimeWrapperProps} from "./ComponentNodeRuntimeWrapper";
import {Script} from "../../meta/Script";
import {DataModel} from "../../meta/DataModel";
import _ from "lodash";
import {ScriptManager} from "./manager/ScriptManager";

interface RuntimeCanvasProps {
    /**
     * 传入的合法 ComponentNode
     */
    componentNode: ComponentNode;
    /**
     * 脚本
     */
    scripts: Script[];
    /**
     * 数据模型
     */
    dataModel: DataModel;
}

export const RuntimeCanvas = (props: RuntimeCanvasProps) => {

    const {
        componentNode,
        scripts,
        dataModel
    } = props;

    // buildEngine
    const buildEngine = useMemo(() => {
        return new BuildEngine();
    }, []);

    // 经过buildEngine + schema 创建的React组件（已经考虑的基本的异常处理）
    const renderComponent = useMemo(() => {
        try {
            return buildEngine.build(componentNode, {
                onCustomCreateElement: ctx => {
                    const {path, ComponentConstructor, props, children} = ctx;

                    // 对props进行转换

                    // 不加Wrapper的原始构造后的组件
                    const originReactComp = (
                        <ComponentConstructor {...props}>
                            {children}
                        </ComponentConstructor>
                    )
                    const wrapperProps: ComponentNodeRuntimeWrapperProps = {
                        nodePath: path,
                    }
                    return (
                        <ComponentNodeRuntimeWrapper {...wrapperProps}>
                            {originReactComp}
                        </ComponentNodeRuntimeWrapper>
                    )
                }
            });
        } catch (e) {
            return <div>构建出错：{e.message}</div>
        }
    }, [componentNode]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '5px'
        }}>
            <div style={{
                width: '100%',
                height: '100%'
            }}>
                {renderComponent}
            </div>
        </div>
    )

}

const handleEachProp = (
    propName: string,
    originProp: ComponentNodePropType,
    dataModel: DataModel,
    setDataMode: (setStateAction: any | ((prevState: any) => any)) => void,
    scriptManager: ScriptManager) => {

    if (!originProp) {
        return {};
    }

    if (typeof originProp === 'string' || typeof originProp === 'number') {
        // 字符串、数字字面量
        return originProp;
    }

    const {type, value} = originProp;
    if (!['Literal', 'Expression', 'ScriptMethod'].includes(type)) {
        // 不满足相关的类型
        return originProp;
    }

    if (type === 'Literal') {
        return value;
    }

    // 接下来需要处理 type 为Expression和ScriptMethod两种场景
    // 这里做一个防御性编程，因为type为上述两种，则value一定是一个字符串才行
    if (typeof value !== 'string') {
        console.warn(`当前属性 ${propName} 属于 ${type}，但无法从中解析`);
        return value;
    }

    if (type === 'Expression') {
        // 表达式
        // 首先剔除前缀 '$DataModel@'："$DataModel@foo.bar" -> "foo.bar"
        const exprPath = _.trim(value).replace('$DataModel@', '').trim();
        // 从DataModel中获取对应path的数据
        return _.get(dataModel, exprPath);
    }

    if (type === 'ScriptMethod') {
        const scriptName = _.trim(value).replace('$ScriptModel@', '').trim();
        const runtimeFunc = () => {
            // @ts-ignore 获取运行时参数
            const runtimeFuncArgs = arguments;
            const scriptFunction = scriptManager.getScriptFunc(scriptName);
            const scriptContext = {
                $ScriptModel: {
                    run: (scriptName: string, ...args: any[]) => scriptManager.run(scriptName, args)
                },
                $DataModel: {
                    setDataModel: (setStateAction: any | ((prevState: any) => any)) => setDataMode(setStateAction)
                }
            }
            scriptFunction.apply(null, [...runtimeFuncArgs, scriptContext])
        }
        return runtimeFunc;
    }
}