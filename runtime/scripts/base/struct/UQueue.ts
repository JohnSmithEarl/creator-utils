export class UQueue<T> {
    private data = [];

    constructor() { }

    /**
     * @description 进入队里
     * @param element
     */
    public enqueue(element: T) {
        this.data.push(element);
    }

    /**
     * @description 出队列
     */
    dequeue(): T {
        if (this.empty()) {
            return null;
        } else {
            let element = this.data.shift();
            return element;
        }
    }

    /**
     * @description 返回队列首部元素
     */
    public front(): T {
        if (this.empty()) {
            return null;
        } else {
            let element = this.data[0];
            return element;
        }
    }

    /**
     * @description 返回队列尾部元素
     */
    public back(): T {
        if (this.empty()) {
            return null;
        } else {
            let element = this.data[this.data.length - 1];
            return element;
        }
    }

    /**
     * 队列是否为空
     */
    public empty(): boolean {
        let isEmpty = this.data.length == 0;
        return isEmpty;
    }

    /**
     * 队列大小
     */
    public size(): number {
        let size = this.data.length;
        return size;
    }

    /**
     * 清空队列
     */
    public clear(): void {
        if (this.data.length > 0) {
            this.data.splice(0, this.data.length);
        }
    }

    /**
     * 序列化
     * @param delimit 元素间隔符
     */
    public toString(delimit = ","): string {
        let str = this.data.join(delimit);
        return str;
    }
};