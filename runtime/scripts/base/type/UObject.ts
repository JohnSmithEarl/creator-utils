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
    }

    public static merge(def: any, obj: any) {
        if (!obj) {
            return def;
        } else if (!def) {
            return obj;
        }

        for (let i in obj) {
            // if its an object
            if (obj[i] != null && obj[i].constructor == Object) {
                def[i] = UObject.merge(def[i], obj[i]);
            }
            // if its an array, simple values need to be joined.  Object values need to be re-merged.
            else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
                // test to see if the first element is an object or not so we know the type of array we're dealing with.
                if (obj[i][0].constructor == Object) {
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

    public merge(obj: any): UObject {
        UObject.merge(this, obj);
        return this;
    }
};