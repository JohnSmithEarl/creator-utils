import { UObject } from "../type/UObject";

/**
 * @description 字典类
 */
export class UDictionary {
    private items: Object = null;

    /**
     * @description 构造函数
     */
    constructor() {
        this.items = {};
    }

    /**
     * @description 向字典中添加或修改元素
     * @param key 
     * @param value 
     */
    set(key: any, value: any): void {
        this.items[key] = value;
    }

    /**
     * @description 通过键值查找字典中的值
     * @param key 
     */
    public get(key: any): any {
        return this.items[key];
    }

    /**
     * @description 通过使用键值来从字典中删除对应的元素
     * @param key 
     */
    public delete(key: any) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    /**
     * @description 判断给定的键值是否存在于字典中
     * @param key 
     */
    public has(key: any): boolean {
        return this.items.hasOwnProperty(key);
    }

    /**
     * @description 清空字典内容
     */
    public clear(): void {
        this.items = {};
    }

    /**
     * @description 返回字典中所有元素的数量
     */
    public size(): number {
        return Object.keys(this.items).length;
    }

    /**
     * @description 返回字典中所有的键值
     */
    public keys(): Array<string> {
        return Object.keys(this.items);
    }

    /**
     * @description 返回字典中所有的值
     */
    public values(): Array<any> {
        return UObject.values(this.items);
    }

    /**
     * 返回字典中的所有元素
     */
    public getItems(): Object {
        return this.items;
    }
};

export let test = function () {
    let dictionary = new UDictionary();
    dictionary.set('Gandalf', 'gandalf@email.com');
    dictionary.set('John', 'john@email.com');
    dictionary.set('Tyrion', 'tyrion@email.com');
    console.log(dictionary.has('Gandalf')); // true
    console.log(dictionary.size()); // 3
    console.log(dictionary.keys()); // [ 'Gandalf', 'John', 'Tyrion' ]
    console.log(dictionary.values()); // [ 'gandalf@email.com', 'john@email.com', 'tyrion@email.com' ]
    console.log(dictionary.get('Tyrion')); // tyrion@email.com

    dictionary.delete('John');
    console.log(dictionary.keys()); // [ 'Gandalf', 'Tyrion' ]
    console.log(dictionary.values()); // [ 'gandalf@email.com', 'tyrion@email.com' ]
    console.log(dictionary.getItems()); // { Gandalf: 'gandalf@email.com', Tyrion: 'tyrion@email.com' }

    console.log("\n\n");

    let dictionary1 = new Map();
    dictionary1.set('Gandalf', 'gandalf@email.com');
    dictionary1.set('John', 'john@email.com');
    dictionary1.set('Tyrion', 'tyrion@email.com');
    console.log(dictionary1.has('Gandalf')); // true
    console.log(dictionary1.size); // 3
    console.log(dictionary1.keys()); // [Map Iterator] { 'Gandalf', 'John', 'Tyrion' }
    console.log(dictionary1.values()); // [Map Iterator] { 'gandalf@email.com', 'john@email.com', 'tyrion@email.com' }
    console.log(dictionary1.get('Tyrion')); // tyrion@email.com

    dictionary1.delete('John');
    console.log(dictionary1.keys()); // [Map Iterator] { 'Gandalf', 'Tyrion' }
    console.log(dictionary1.values()); // [Map Iterator] { 'gandalf@email.com', 'tyrion@email.com' }
    console.log(dictionary1.entries()); // [Map Iterator] { [ Gandalf: 'gandalf@email.com' ], [ Tyrion: 'tyrion@email.com' ] }
}