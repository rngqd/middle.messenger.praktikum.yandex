import { IInputData, Indexed } from "../models";

export function queryStringify(data: any) {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }
    
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
    }, "?");
}

export function makeDataObject(data: IInputData, ref: {[p: string]: HTMLInputElement}) {
    const copyData = {...data}
    for (let key in copyData) {
        const refValue = ref[key].value
        
        if(!!refValue || refValue === "") {
            (copyData[key as keyof typeof copyData] = refValue)
        }
    }
    return copyData
}

export function isEqual(object1: object, object2: object) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key as keyof typeof object1];
        const val2 = object2[key as keyof typeof object2];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          areObjects && !isEqual(val1, val2) ||
          !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}
function isObject(object: object) {
    return object != null && typeof object === 'object';
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }
    
    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    
    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}

export function returnFormData (formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement
    if(form) {
        let formData = new FormData(form);
        return Object.fromEntries(formData)
    }
}

