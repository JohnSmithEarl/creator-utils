namespace cu {
    export class Subject extends Object {
        public static create(obj?: any): any {
            function object() { }
            function createFunc(parent: any) {
                object.prototype = parent;
                let son = new object();
                object.prototype = null;
                return son;
            }
            return createFunc(obj);
        }

        public static isValid(obj: any) {
            let isVal = cc.sys.isObjectValid(obj);
            return isVal;
        }

        public static clone(obj: any) {
            let objClone = Array.isArray(obj) ? [] : {};
            if (obj && typeof obj === "object") {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] && typeof obj[key] === "object") {
                            objClone[key] = Subject.clone(obj[key]);
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

        public isValid() {
            let isVal = cc.sys.isObjectValid(this);
            return isVal;
        }

        public clone() {
            return Subject.clone(this);
        }

        public mixIn(from: any) {
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
}