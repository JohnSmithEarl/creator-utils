let create = (function () {
    function F() { }
    return function (obj: any = null): any {
        let subtype = null;

        F.prototype = obj;

        subtype = new F();

        F.prototype = null;

        return subtype;
    };
}());

export class UObject {
    /**
     * Extends this object and runs the init method.
     * Arguments to create() will be passed to init().
     * @return {Object} The new object.
     * @static
     * @example
     *
     *     var instance = MyType.create();
     */
    static create(): UObject {
        let instance = UObject.extend();
        instance.init.apply(instance, arguments);
        return instance;
    }

    /**
     * Creates a new object that inherits from this object.
     * @param {Object} overrides Properties to copy into the new object.
     * @return {Object} The new object.
     * @static
     * @example
     *     var MyType = Base.extend({
     *         field: 'value',
     *         method: function () {
     *         }
     *     });
     */
    static extend(overrides: any = null): UObject {
        let suptype = new UObject();

        // Spawn
        let subtype = create(UObject);

        // Augment
        if (overrides) {
            subtype.mixIn(overrides);
        }

        // Create default initializer
        if (!subtype.hasOwnProperty('init') || suptype.init === subtype.init) {
            subtype.init = function () {
                subtype.__proto__.init.apply(suptype, arguments);
            };
        }

        // Initializer's prototype is the subtype object
        subtype.init.prototype = subtype;

        // Reference supertype
        subtype.__proto__ = suptype;

        return subtype;
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

    // clone(): UObject {
    //     let obj = UObject.clone(this);
    //     return obj;
    // }
    /**
         * Creates a copy of this object.
         * @return {Object} The clone.
         * @example
         *     var clone = instance.clone();
         */
    clone(): UObject {
        return this.init.prototype.extend(this);
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

let test = function () {
    let a = Object.create(null)
    console.log("a:", a); //No properties

    console.log("--------------------------------");

    console.log("Object.prototype:", Object.prototype);

    console.log("--------------------------------");

    let b: any = {};
    console.log("b{}:", b);
    console.log("b{}.__proto__:", b.__proto__);

    console.log("--------------------------------");

    let c: any = Object.create({});
    console.log("c Object.create({}):", c);

    console.log("--------------------------------");

    // 这里的o是以obj为原型创建的对象
    let obj = { a: 2 }
    let d = Object.create(obj)
    console.log("d Object.create({a: 2}):", d);
    console.log("d.__proto__:", d.__proto__);
    console.log("d.__proto__.__proto__:", d.__proto__.__proto__);

    console.log("////////////////////////////////////");

    function Car() {
        this.name = "car";
    }

    function create(args?: any) {
        // 创建一个空的对象
        let obj: any = new Object();
        // 获得构造函数，arguments中去除第一个参数
        let arr = [];
        let Con: any = arr.shift.call(arguments);
        // 链接到原型，obj 可以访问到构造函数原型中的属性
        obj.__proto__ = Con.prototype;
        // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
        let ret = Con.apply(obj, arguments);
        // 优先返回构造函数返回的对象
        return typeof ret === 'object' ? ret : obj;
    };
    let e = create(Car);
    let f = new Car();
    console.log("e - create:", e);
    console.log("f - new:", f);

    console.log("////////////////////////////////////");

    // ES6
    class Parent {
        name: string = "";
        constructor(name: string) {
            this.name = name;
        }
        static sayHello() {
            console.log('hello');
        }
        sayName() {
            console.log('my name is ' + this.name);
            return this.name;
        }
    }
    class Child extends Parent {
        age: number = 0;
        constructor(name: string, age: number) {
            super(name);
            this.age = age;
        }
        sayAge() {
            console.log('my age is ' + this.age);
            return this.age;
        }
    }
    let parent: any = new Parent('Parent');
    let child: any = new Child('Child', 18);
    console.log('parent: ', parent); // parent:  Parent {name: "Parent"}
    Parent.sayHello(); // hello
    parent.sayName(); // my name is Parent
    console.log('child: ', child); // child:  Child {name: "Child", age: 18}
    Child.sayHello(); // hello
    child.sayName(); // my name is Child
    child.sayAge(); // my age is 18

    console.log("构造器原型链");
    console.log("Child.prototype === Parent:", Child.prototype === Parent) // false
    console.log("Child.__proto__ === Parent:", Child.__proto__ === Parent); // true
    console.log("Parent.__proto__ === Function.prototype:", Parent.__proto__ === Function.prototype); // true
    console.log("Function.prototype.__proto__ === Object.prototype:", Function.prototype.__proto__ === Object.prototype); // true
    console.log("Object.prototype.__proto__ === null:", Object.prototype.__proto__ === null); // true

    console.log("实例原型链");
    console.log("child.__proto__ === Child.prototype:", child.__proto__ === Child.prototype); // true
    console.log("Child.prototype.__proto__ === Parent.prototype:", Child.prototype.__proto__ === Parent.prototype); // true
    console.log("Parent.prototype.__proto__ === Object.prototype:", Parent.prototype.__proto__ === Object.prototype); // true
    console.log("Object.prototype.__proto__ === null:", Object.prototype.__proto__ === null); // true


    console.log("////////////////////////////////////");
}

test();
