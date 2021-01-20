export class UStack<T> {
    private data = [];

    constructor() { }

    /**
     * @description 元素
     * @param element
     */
    public push(element: T) {
        this.data.push(element);
    }

    /**
     * 弹出元素, 并返回
     */
    public pop(): T {
        let element = this.data.pop();
        return element;
    }

    /**
     * 获取栈顶元素
     */
    public peek(): T {
        let item = null;
        if (this.data.length > 0) {
            item = this.data[this.data.length - 1];
        }
        return item;
    }

    /**
     * 返回栈大小
     */
    size() {
        let size = this.data.length;
        return size;
    }

    /**
     * 栈是否为空
     */
    empty() {
        let isEmpty = this.data.length == 0;
        return isEmpty;
    }

    /**
     * 清空栈
     */
    clear() {
        if (this.data.length > 0) {
            this.data.splice(0, this.data.length);
        }
    }

    /**
     * 序列化
     * @param delimit
     */
    toString(delimit = ",") {
        let str = this.data.join(delimit);
        return str;
    }
};