import {Script} from "../../../meta/Script";

export class ScriptManager {
    private readonly _scriptFunctions: { [funcName: string]: Function };

    constructor(scripts: Script[]) {
        this._scriptFunctions = {};
        scripts.forEach(script => {
            const {name, code} = script;
            this._scriptFunctions[name] = new Function(code);
        })
    }

    getScriptFunc(scriptName: string) {
        return this._scriptFunctions[scriptName];
    }

    run(scriptName: string, ...args: any[]) {
        const scriptFunction = this._scriptFunctions[scriptName];
        return scriptFunction.apply(null, args);
    }
}