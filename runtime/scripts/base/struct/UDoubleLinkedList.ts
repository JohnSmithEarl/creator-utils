/**
 * @description 双向链表节点
 */
class UDoubleListNode {
    public element: any = null;
    public prev: UDoubleListNode = null;
    public next: UDoubleListNode = null;

    constructor(element: any) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
};

/**
 * @description 双向循环链表
 */
export class UDoubleLinkedList {
    protected length: number = 0;
    protected head: UDoubleListNode = null;
    protected tail: UDoubleListNode = null;

    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    public append(element: any): void {
        let node = new UDoubleListNode(element);
        // 如果链表为空，则将head和tail都指向当前添加的节点
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            // 否则，将当前节点添加到链表的尾部
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }

    public getElementAt(position: number): any {
        if (position < 0 || position >= this.length) {
            return null;
        }
        // 从后往前遍历
        if (position > Math.floor(this.length / 2)) {
            let current = this.tail;
            for (let i = this.length - 1; i > position; i--) {
                current = current.prev;
            }
            return current;
        } else {
            // 从前往后遍历
            if (position < 0 || position >= this.length) {
                return null;
            }
            let current = this.head;
            for (let i = 0; i < position; i++) {
                current = current.next;
            }
            return current;
        }
    }

    public insert(position: number, element: any): boolean {
        if (position < 0 || position > this.length) {
            return false;
        }

        // 插入到尾部
        if (position === this.length) this.append(element);
        else {
            let node = new UDoubleListNode(element);

            // 插入到头部
            if (position === 0) {
                if (this.head === null) {
                    this.head = node;
                    this.tail = node;
                }
                else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            }
            // 插入到中间位置
            else {
                let current = this.getElementAt(position);
                let previous = current.prev;
                node.next = current;
                node.prev = previous;
                previous.next = node;
                current.prev = node;
            }
        }

        this.length++;
        return true;
    }

    removeAt(position) {
        // position不能超出边界值
        if (position < 0 || position >= this.length) return null;

        let current = this.head;
        let previous;

        // 移除头部元素
        if (position === 0) {
            this.head = current.next;
            this.head.prev = null;
            if (this.length === 1) this.tail = null;
        }
        // 移除尾部元素
        else if (position === this.length - 1) {
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = null;
        }
        // 移除中间元素
        else {
            current = this.getElementAt(position);
            previous = current.prev;
            previous.next = current.next;
            current.next.prev = previous;
        }

        this.length--;
        return current.element;
    }

    getTail() {
        return this.tail;
    }

    clear() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    toString() {
        let current = this.head;
        let s = '';
        while (current) {
            let next = current.next;
            let previous = current.prev;
            next = next ? next.element : 'null';
            previous = previous ? previous.element : 'null';
            s += `[element: ${current.element}, prev: ${previous}, next: ${next}] `;
            current = current.next;
        }
        return s;
    }
};

export let test = function () {
    let doubleLinkedList = new UDoubleLinkedList();
    doubleLinkedList.append(10);
    doubleLinkedList.append(15);
    doubleLinkedList.append(20);
    doubleLinkedList.append(25);
    doubleLinkedList.append(30);
    console.log(doubleLinkedList.toString());
    console.log(doubleLinkedList.getElementAt(1).element);
    console.log(doubleLinkedList.getElementAt(2).element);
    console.log(doubleLinkedList.getElementAt(3).element);

    doubleLinkedList.insert(0, 9);
    doubleLinkedList.insert(4, 24);
    doubleLinkedList.insert(7, 35);
    console.log(doubleLinkedList.toString());

    console.log(doubleLinkedList.removeAt(0));
    console.log(doubleLinkedList.removeAt(1));
    console.log(doubleLinkedList.removeAt(5));
    console.log(doubleLinkedList.toString());
};