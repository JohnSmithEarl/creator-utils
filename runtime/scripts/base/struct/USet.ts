import { UObject } from "../core/UObject";

export class USet {
    protected items: Object = null;

    constructor() {
        this.items = {};
    }

    /**
     * @description 向集合中添加元素
     * @param value
     */
    public add(value: any): boolean {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

    /**
     * @description 从集合中删除对应的元素
     * @param value
     */
    public delete(value: any): boolean {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }

    /**
     * @description 判断给定的元素在集合中是否存在
     * @param value
     */
    public has(value: any): boolean {
        return this.items.hasOwnProperty(value);
    }

    /**
     * @description 清空集合内容
     */
    public clear(): void {
        this.items = {};
    }

    /**
     * @description 获取集合的长度
     */
    public size(): number {
        return Object.keys(this.items).length;
    }

    /**
     * @description 返回集合中所有元素的内容
     */
    public values(): Array<any> {
        return UObject.values(this.items);
    }

    /**
     * @description 并集
     * @param otherSet
     */
    public union(otherSet: USet) {
        let unionSet = new USet();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    /**
     * @description 交集
     * @param otherSet
     */
    public intersection(otherSet: USet): USet {
        let intersectionSet = new USet();
        this.values().forEach(value => {
            if (otherSet.has(value)) intersectionSet.add(value);
        });
        return intersectionSet;
    }

    /**
     * @description 差集
     * @param otherSet
     */
    public difference(otherSet: USet): USet {
        let differenceSet = new USet();
        this.values().forEach(value => {
            if (!otherSet.has(value)) differenceSet.add(value);
        });
        return differenceSet;
    }

    /**
     * @description 子集
     * @param otherSet
     */
    public subset(otherSet: USet): boolean {
        if (this.size() > otherSet.size()) {
            return false;
        }

        let isSubset = true;
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });

        return isSubset;
    }
};

export let test = function () {
    let set = new USet();
    set.add(1);
    console.log(set.values()); // [ 1 ]
    console.log(set.has(1)); // true
    console.log(set.size()); // 1

    set.add(2);
    console.log(set.values()); // [ 1, 2 ]
    console.log(set.has(2)); // true
    console.log(set.size()); // 2

    set.delete(1);
    console.log(set.values()); // [ 2 ]

    set.delete(2);
    console.log(set.values()); // []

    console.log("\n=============================\n");

    let setA = new USet();
    setA.add("first");
    setA.add("second");
    setA.add("third");

    let setB = new USet();
    setB.add("third");
    setB.add("fourth");
    setB.add("fifth");
    setB.add("sixth");

    console.log(setA.union(setB).values()); // [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth' ]

    console.log("\n=============================\n");

    let setC = new USet();
    setC.add("first");
    setC.add("second");
    setC.add("third");

    let setD = new USet();
    setD.add("second");
    setD.add("third");
    setD.add("fourth");

    console.log(setC.intersection(setD).values()); // [ 'second', 'third' ]

    console.log("\n=============================\n");

    let setE = new USet();
    setE.add("first");
    setE.add("second");
    setE.add("third");

    let setF = new USet();
    setF.add("second");
    setF.add("third");
    setF.add("fourth");

    console.log(setE.difference(setF).values()); // [ 'first' ]

    let setJ = new USet();
    setJ.add("first");
    setJ.add("second");

    let setH = new USet();
    setH.add("first");
    setH.add("second");
    setH.add("third");

    let setI = new USet();
    setI.add("second");
    setI.add("third");
    setI.add("fourth");

    console.log(setJ.subset(setH)); // true
    console.log(setJ.subset(setI)); // false
};