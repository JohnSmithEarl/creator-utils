/**
 * @description 单向循环链表节点
 */
class UListNode {
    public element: any = null;
    public next: UListNode = null;

    constructor(element: any) {
        this.element = element;
        this.next = null;
    }
};

/**
 * @description 单向循环链表
 */
export class UCircularLinkedList {
    protected length: number = 0;
    protected head: UListNode = null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    public append(element: any): void {
        let node = new UListNode(element);

        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.getElementAt(this.length - 1);
            current.next = node;
        }

        node.next = this.head; // 将新添加的元素的next指向head
        this.length++;
    }

    public insert(position: number, element: any): boolean {
        // position不能超出边界值
        if (position < 0 || position > this.length) {
            return false;
        }

        let node = new UListNode(element);
        if (position === 0) {
            node.next = this.head;
            let current = this.getElementAt(this.length - 1);
            current.next = node;
            this.head = node;
        } else {
            let previous = this.getElementAt(position - 1);
            node.next = previous.next;
            previous.next = node;
        }

        this.length++;
        return true;
    }

    public getElementAt(position: number): any {
        if (position < 0 || position >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }

    public removeAt(position: number): any {
        if (position < 0 || position >= this.length) {
            return null;
        }

        let current = this.head;

        if (position === 0) {
            this.head = current.next;
        } else {
            let previous = this.getElementAt(position - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.length--;

        if (this.length > 1) {
            let last = this.getElementAt(this.length - 1);
            last.next = this.head;
        }
        return current.element;
    }

    public toString(): string {
        let current = this.head;
        let s = '';
        for (let i = 0; i < this.length; i++) {
            let next = current.next;
            next = next ? next.element : 'null';
            s += `[element: ${current.element}, next: ${next}] `;
            current = current.next;
        }
        return s;
    }
}

export let test = function () {
    let circularLinkedList = new UCircularLinkedList();
    circularLinkedList.append(10);
    circularLinkedList.append(15);
    circularLinkedList.append(20);

    console.log(circularLinkedList.toString());

    circularLinkedList.insert(0, 9);
    circularLinkedList.insert(3, 25);
    console.log(circularLinkedList.toString());

    console.log(circularLinkedList.removeAt(0));
    console.log(circularLinkedList.toString());
};