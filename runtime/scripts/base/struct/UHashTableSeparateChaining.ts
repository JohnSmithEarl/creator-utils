import { UHashTable } from "./UHashTable";
import { ULinkedList } from "./ULinkedList";

export class ValuePair {
    public key: string = null;
    public value: any = null;
    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }

    public toString() { // 提供toString()方法以方便我们测试
        return `[${this.key} - ${this.value}]`;
    }
};

/**
散列表 散列冲突 

===> 分离链接
    所谓分离链接，就是将原本存储在哈希表中的值改成链表，这样在哈希表的同一个位置上，就可以存储多个不同的值。
    链表中的每一个元素，同时存储了key和value。

 * @description 链式分离散列表
 */

export class UHashTableSeparateChaining extends UHashTable {
    constructor() {
        super();
    }

    public put(key: string, value: any): void {
        let position = this.djb2HashCode(key);

        if (this.table[position] === undefined) {
            this.table[position] = new ULinkedList(); // 单向链表，需要引入LinkedList类
        }
        this.table[position].append(new ValuePair(key, value));
    }

    public get(key: string): any {
        let position = this.djb2HashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].getHead();
            while (current) {
                if (current.element.key === key) return current.element.value;
                current = current.next;
            }
            return current;
        }
        return undefined;
    }

    public remove(key: string): boolean {
        let position = this.djb2HashCode(key);
        let hash = this.table[position];

        if (hash !== undefined) {
            let current = hash.getHead();
            while (current) {
                if (current.element.key === key) {
                    hash.remove(current.element);
                    if (hash.isEmpty()) this.table[position] = undefined;
                    return true;
                }
                current = current.next;
            }
        }

        return false;
    }

    public size(): number {
        let count = 0;
        this.table.forEach(item => {
            if (item !== undefined) count += item.size();
        });
        return count;
    }

    public toString(): string {
        let objString = "";
        for (let i = 0; i < this.table.length; i++) {
            let ci = this.table[i];
            if (ci === undefined) continue;

            objString += `${i}: `;
            let current = ci.getHead();
            while (current) {
                objString += current.element.toString();
                current = current.next;
                if (current) objString += ', ';
            }
            objString += '\r\n';
        }
        return objString;
    }
};

export let test = function () {
    let hash = new UHashTableSeparateChaining();

    hash.put('Gandalf', 'gandalf@email.com');
    hash.put('John', 'john@email.com');
    hash.put('Tyrion', 'tyrion@email.com');
    hash.put('Aaron', 'aaron@email.com');
    hash.put('Donnie', 'donnie@email.com');
    hash.put('Ana', 'ana@email.com');
    hash.put('Jamie', 'jamie@email.com');
    hash.put('Sue', 'sue@email.com');
    hash.put('Mindy', 'mindy@email.com');
    hash.put('Paul', 'paul@email.com');
    hash.put('Nathan', 'nathan@email.com');

    console.log(hash.toString());
    console.log(`size: ${hash.size()}`);
    console.log(hash.get('John'));

    console.log(hash.remove('Ana'));
    console.log(hash.remove('John'));
    console.log(hash.toString());
};