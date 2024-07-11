/**
 * 数据模型
 */
export interface DataModel {
    [dataName: string]: VariableType | Array<VariableType> | DataModel | Array<DataModel>;
}

export type VariableType = string | number | boolean | undefined;
