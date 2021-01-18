
export class cu_Object extends Object {
    static isValid(obj: any) {
        let isVal = false;
        if (obj && typeof obj === "object") {
            isVal = cc.sys.isObjectValid(obj);
        }
        return isVal;
    }

    static clone(obj: any) {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = cu_Object.clone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
        } else {
            return obj;
        }
        return objClone;
    }

    static copy(toObj: any, fromObj: any, isCopyUnknow = true) {
        if (typeof toObj == "object" && typeof fromObj == "object") {
            for (let key in fromObj) {
                if (fromObj.hasOwnProperty(key)) {
                    if (isCopyUnknow || toObj.hasOwnProperty(key)) {
                        let value = fromObj[key];
                        toObj[key] = value;
                    }
                }
            }
        }
    };
};
