import { IInputData } from "../models";

export function queryStringify(data: any) {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }
    
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
    }, "?");
}
export function makeDataObject(data: IInputData, ref: {[p: string]: HTMLElement}) {
    const copyData = {...data}
    
    for (let key in copyData) {
        const refValue = (ref[key].querySelector("input") as HTMLInputElement).value
        !!refValue && (copyData[key as keyof typeof copyData] = refValue)
    }
    return copyData
}
