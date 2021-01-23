export class UObject extends Object {
    public static create(obj?: any): UObject {
        function object() { }
        function createFunc(parent: any) {
            object.prototype = parent;
            let son = new object();
            object.prototype = null;
            return son;
        }
        return createFunc(obj);
    }

    public static isValid(obj: any): boolean {
        let isVal = cc.sys.isObjectValid(obj);
        return isVal;
    }

    public static values(obj: any): Array<any> {
        let keys = Object.keys(obj);
        let values = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (obj.hasOwnProperty(key)) {
                let val = obj[key];
                values[values.length] = val;
            }
        }
        return values;
    }

    public static clone(obj: any): any {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = UObject.clone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
            // IE won't copy toString using the loop above
            if (obj.hasOwnProperty('toString')) {
                this.toString = obj.toString;
            }
        } else {
            return obj;
        }
        return objClone;
    }

    public static mixIn(to: any, from: any) {
        for (let key in from) {
            if (from.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
        // IE won't copy toString using the loop above
        if (from.hasOwnProperty('toString')) {
            to.toString = from.toString;
        }
    };

    constructor() {
        super();
        this.init(arguments);
    }

    public init(...arg: any) {

    }

    public isValid(): boolean {
        let isVal = cc.sys.isObjectValid(this);
        return isVal;
    }

    public values(): Array<any> {
        let keys = Object.keys(this);
        let values = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (this.hasOwnProperty(key)) {
                let val = this[key];
                values[values.length] = val;
            }
        }
        return values;
    }

    public clone(): UObject {
        return UObject.clone(this);
    }

    public mixIn(from: any): void {
        for (let propertyName in from) {
            if (from.hasOwnProperty(propertyName)) {
                this[propertyName] = from[propertyName];
            }
        }
        // IE won't copy toString using the loop above
        if (from.hasOwnProperty('toString')) {
            this.toString = from.toString;
        }
    }
};