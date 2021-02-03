export class UObject {
    static create() {
        let obj = new UObject();
        obj.init.apply(this, arguments);

        return obj;
    }

    static isValid(obj: any): boolean {
        let isVal = cc.sys.isObjectValid(obj);
        return isVal;
    }

    static keys(obj: any): Array<string> {
        if (typeof obj == "object") {
            let keys = [];
            for (let key in obj) {
                keys[keys.length] = key;
            }
            return keys;
        } else {
            return obj;
        }
    }

    static values(obj: any): Array<any> {
        if (typeof obj == "object") {
            let values = [];
            let keys = UObject.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    let val = obj[key];
                    values[values.length] = val;
                }
            }
            return values;
        } else {
            return obj;
        }
    }

    static clone(obj: any): any {
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

    static mixIn(to: any, from: any) {
        for (let key in from) {
            if (from.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
        // IE won't copy toString using the loop above
        if (from.hasOwnProperty('toString')) {
            to.toString = from.toString;
        }
    }

    static merge(def: any, obj: any): any {
        if (!obj) {
            return def;
        } else if (!def) {
            return obj;
        }

        for (let i in obj) {
            // if its an object
            if (obj[i] != null && obj[i].constructor == UObject) {
                def[i] = UObject.merge(def[i], obj[i]);
            }
            // if its an array, simple values need to be joined.  UObject values need to be re-merged.
            else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
                // test to see if the first element is an object or not so we know the type of array we're dealing with.
                if (obj[i][0].constructor == UObject) {
                    let newobjs = [];
                    // create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
                    let objids = {}
                    for (let x = 0, l = def[i].length; x < l; x++) {
                        objids[def[i][x].id] = x;
                    }

                    // now walk through the objects in the new array
                    // if the ID exists, then merge the objects.
                    // if the ID does not exist, push to the end of the def array
                    for (let x = 0, l = obj[i].length; x < l; x++) {
                        let newobj = obj[i][x];
                        if (objids[newobj.id] !== undefined) {
                            def[i][x] = UObject.merge(def[i][x], newobj);
                        }
                        else {
                            newobjs.push(newobj);
                        }
                    }

                    for (let x = 0, l = newobjs.length; x < l; x++) {
                        def[i].push(newobjs[x]);
                    }
                } else {
                    for (let x = 0; x < obj[i].length; x++) {
                        let idxObj = obj[i][x];
                        if (def[i].indexOf(idxObj) === -1) {
                            def[i].push(idxObj);
                        }
                    }
                }
            } else {
                if (isNaN(obj[i]) || i.indexOf('_key') > -1) {
                    def[i] = obj[i];
                }
                else {
                    def[i] += obj[i];
                }
            }
        }
        return def;
    }

    constructor() {
        this.init(arguments);
    }

    init(...arg: any) {

    }

    isValid(): boolean {
        let isVal = UObject.isValid(this);
        return isVal;
    }

    keys(): Array<string> {
        let keys = UObject.keys(this);
        return keys;
    }

    values(): Array<any> {
        let keys = UObject.keys(this);
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

    clone(): UObject {
        let obj = UObject.clone(this);
        return obj;
    }

    mixIn(from: any): void {
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

    merge(obj: any): UObject {
        UObject.merge(this, obj);
        return this;
    }

    toString(encoder = JSON): string {
        let str = encoder.stringify(this);
        return str;
    }
};