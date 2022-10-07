import {TypeBuilder, TypeBuilderConstructor} from "./TypeBuilder";
import {PageTypeBuilder} from "./impl/PageTypeBuilder";
import {ButtonTypeBuilder} from "./impl/ButtonTypeBuilder";
import {InputTypeBuilder} from "./impl/InputTypeBuilder";

/**
 * TypeBuilder管理器
 * 统一管理应用中所有已知的构建器
 * todo 后续可以支持多种方式加载
 */
class TypeBuilderManager {

    /**
     * 单实例
     * @private
     */
    private static instance: TypeBuilderManager;

    /**
     * 内存单例获取
     */
    static getInstance(): TypeBuilderManager {
        if (!TypeBuilderManager.instance) {
            TypeBuilderManager.instance = new TypeBuilderManager();
        }
        return TypeBuilderManager.instance;
    }

    /**
     * 单例，构造函数private控制
     * @private
     */
    private constructor() {
    }

    /**
     * 这里记录了目前所有的TypeBuilder映射，
     * 后续可以优化为程序进行扫描实现，不过是后话了
     * @private
     */
    private typeBuilderConstructors: Record<string, TypeBuilderConstructor> = {
        'page': PageTypeBuilder,
        'button': ButtonTypeBuilder,
        'input': InputTypeBuilder
    };

    /**
     * 根据元素类型得到对应构建器
     * @param elementType
     */
    getTypeBuilder(elementType: string): TypeBuilder {
        if (!this.typeBuilderConstructors.hasOwnProperty(elementType)) {
            throw new Error('找不到处理')
        }
        // 采用ES6的Reflect反射来处理对象创建，供后续扩展优化
        return Reflect.construct(this.typeBuilderConstructors[elementType], [])
    }

    /**
     * 添加专门处理某种elementType的TypeBuilder
     * @param elementType
     * @param typeBuilderConstructor
     */
    addTypeBuilder(elementType: string,
                   typeBuilderConstructor: TypeBuilderConstructor): void {
        if (this.typeBuilderConstructors.hasOwnProperty(elementType)) {
            console.warn(`当前TypeBuilderManager已经存在处理 elementType = ${elementType} 的Builder，本次添加对其覆盖。`);
        }
        this.typeBuilderConstructors[elementType] = typeBuilderConstructor;
    }

    /**
     * 移除处理指定elementType的Builder
     * @param elementType
     */
    removeTypeBuilder(elementType: string): void {
        delete this.typeBuilderConstructors[elementType];
    }

    /**
     * 获取当前能够处理的ElementType
     */
    getHandledElementTypes(): string[] {
        return Object.keys(this.typeBuilderConstructors);
    }
}

export {
    TypeBuilderManager
}
