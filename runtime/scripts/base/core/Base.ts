/**
 * 基础对象
 */
export class Base {
    static isInherited(childInstance: any, parentClass: any) {
        let isInherited = childInstance instanceof parentClass;
        return isInherited;
    }

    static keys(obj: any): Array<string> {
        if (typeof obj == "object") {
            let keys = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys[keys.length] = key;
                }
            }
            return keys;
        } else {
            return obj;
        }
    }

    static values(obj: any): Array<any> {
        if (typeof obj == "object") {
            let values = [];
            let keys = Object.keys(obj);
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

    static deepCopy(obj: any): any {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = Base.deepCopy(obj[key]);
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

    static merge(to: any, from: any) {
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

    constructor(...args: any[]) {

    }

    isInherited(parentClass: any) {
        let isInherited = this instanceof parentClass;
        return isInherited;
    }

    keys(): Array<string> {
        let keys = Base.keys(this);
        return keys;
    }

    values(): Array<any> {
        let values = Base.values(this);
        return values;
    }

    deepCopy() {
        let obj = Base.deepCopy(this);
        return obj;
    }

    clone(): any {
        let create: any = this.constructor;
        let cloneObj = new create();
        for (let attribute in this) {
            if (this.hasOwnProperty(attribute)) {
                if (typeof this[attribute] === "object") {
                    let obj: any = this[attribute];
                    cloneObj[attribute] = obj.clone.call(obj);
                } else {
                    cloneObj[attribute] = this[attribute];
                }
            }
        }
        return cloneObj;
    }

    merge(from: any): void {
        Base.merge(this, from);
    }

    toString(encoder: any = JSON): string {
        let str = encoder.stringify(this);
        return str;
    }
};

import { Test } from "./Test";
Test.test("UWordX64", [
    () => {
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

        console.log("parent instanceof Parent:", parent instanceof Parent);
        console.log("child instanceof Parent:", child instanceof Parent);
        console.log("Child instanceof Parent:", Child instanceof Parent);

        console.log("////////////////////////////////////");
    }
]);