/**
 * @description 散列表
 */
export class UHashTable {
    protected table: Array<any> = null;

    /**
     * @description 构造函数
     */
    constructor() {
        this.table = [];
    }

    /**
     * @description 散列函数1
     * @param key 
     */
    public loseloseHashCode(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    /**
     * @description 散列函数2
     * @param key 
     */
    public djb2HashCode(key: string): number {
        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    }

    /**
     * @description 将键值对存放到哈希表中
     * @param key 
     * @param value 
     */
    public put(key: string, value: any): any {
        let position = this.djb2HashCode(key);
        console.log(`${position} - ${key}`);
        this.table[position] = value;
    }

    /**
     * @description 通过key查找哈希表中的值
     * @param key 
     */
    public get(key: string): any {
        return this.table[this.djb2HashCode(key)];
    }

    /**
     * @description 通过key从哈希表中删除对应的值
     * @param key 
     */
    public remove(key: string): void {
        this.table[this.djb2HashCode(key)] = undefined;
    }

    /**
     * @description 判断哈希表是否为空
     */
    public isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * @description 返回哈希表的长度
     */
    public size(): number {
        let count = 0;
        this.table.forEach(item => {
            if (item !== undefined) count++;
        });
        return count;
    }

    /**
     * @description 清空哈希表
     */
    public clear(): void {
        this.table = [];
    }
}

export let test = function () {
    let hash = new UHashTable();
    hash.put('Gandalf', 'gandalf@email.com');
    hash.put('John', 'john@email.com');
    hash.put('Tyrion', 'tyrion@email.com'); // 16
    hash.put('Aaron', 'aaron@email.com'); // 16 存在 散列冲突
    hash.put('Donnie', 'donnie@email.com');
    hash.put('Ana', 'ana@email.com');
    hash.put('Jamie', 'jamie@email.com');
    hash.put('Sue', 'sue@email.com');
    hash.put('Mindy', 'mindy@email.com'); // 32
    hash.put('Paul', 'paul@email.com'); // 32 存在 散列冲突
    hash.put('Nathan', 'nathan@email.com');
};

// ===> 分离链接
// 所谓分离链接，就是将原本存储在哈希表中的值改成链表，这样在哈希表的同一个位置上，就可以存储多个不同的值。
// 链表中的每一个元素，同时存储了key和value。
// ===> 线性探查
// 避免散列冲突的另一种方法是线性探查。当向哈希数组中添加某一个新元素时，如果该位置上已经有数据了，就继续尝试下一个位置，直到对应的位置上没有数据时，就在该位置上添加数据。我们将上面的例子改成线性探查的方式，存储结果如下图所示：