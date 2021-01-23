import { UHashTable } from "./UHashTable";

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

===> 线性探查
    避免散列冲突的另一种方法是线性探查。当向哈希数组中添加某一个新元素时，如果该位置上已经有数据了，
    就继续尝试下一个位置，直到对应的位置上没有数据时，就在该位置上添加数据。我们将上面的例子改成线性探查的方式，存储结果如下图所示：

 * @description 线性分离散列表
 */
export class UHashTableLinearProbing extends UHashTable {
    constructor() {
        super();
    }

    public put(key: string, value: any): void {
        let position = this.djb2HashCode(key);

        if (this.table[position] === undefined) {
            this.table[position] = new ValuePair(key, value);
        }
        else {
            let index = position + 1;
            while (this.table[index] !== undefined) {
                index++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    }

    public get(key: string): any {
        let position = this.djb2HashCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) return this.table[position].value;
            let index = position + 1;
            while (this.table[index] !== undefined && this.table[index].key !== key) {
                index++;
            }
            return this.table[index].value;
        }
        return undefined;
    }

    public remove(key: string): boolean {
        let position = this.djb2HashCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                this.table[position] = undefined;
                return true;
            }
            let index = position + 1;
            while (this.table[index] !== undefined && this.table[index].key !== key) {
                index++;
            }
            this.table[index] = undefined;
            return true;
        }
        return false;
    }

    public toString(): string {
        let objString = "";
        for (let i = 0; i < this.table.length; i++) {
            let ci = this.table[i];
            if (ci === undefined) continue;

            objString += `${i}: ${ci}\r\n`;
        }
        return objString;
    }
};

export let test = function () {
    let hash = new UHashTableLinearProbing();

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