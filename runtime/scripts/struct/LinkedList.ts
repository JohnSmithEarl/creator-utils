class ListNode {
    element: any = null;
    next: ListNode = null;

    constructor(element: any) {
        this.element = element;
        this.next = null;
    }
};

export class LinkedList {
    protected length: number = 0;
    protected head: ListNode = null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    append(element: any): void {
        let node = new ListNode(element);
        // 如果当前链表为空，则将head指向node
        if (this.head === null) this.head = node;
        else {
            // 否则，找到链表尾部的元素，然后添加新元素
            let current = this.getElementAt(this.length - 1);
            current.next = node;
        }

        this.length++;
    }

    insert(position: number, element: any): boolean {
        // position不能超出边界值
        if (position < 0 || position > this.length) return false;

        let node = new ListNode(element);

        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let previous = this.getElementAt(position - 1);
            node.next = previous.next;
            previous.next = node;
        }

        this.length++;
        return true;
    }

    removeAt(position: number): any {
        // position不能超出边界值
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
        return current.element;
    }

    remove(element: any): any {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    indexOf(element: any): number {
        let current = this.head;

        for (let i = 0; i < this.length; i++) {
            if (current.element === element) {
                return i;
            } else {
                current = current.next;
            }
        }
        return -1;
    }

    getElementAt(position: number): any {
        if (position < 0 || position >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }

    getHead(): ListNode {
        return this.head;
    }

    clear(): void {
        this.head = null;
        this.length = 0;
    }

    toString(): string {
        let current = this.head;
        let s = '';

        while (current) {
            let next = current.next;
            next = next ? next.element : 'null';
            s += `[element: ${current.element}, next: ${next}] `;
            current = current.next;
        }

        return s;
    }
};

export let test = function () {
    let linkedList = new LinkedList();
    linkedList.append(10);
    linkedList.append(15);
    linkedList.append(20);

    console.log(linkedList.toString());

    linkedList.insert(0, 9);
    linkedList.insert(2, 11);
    linkedList.insert(5, 25);
    console.log(linkedList.toString());

    console.log(linkedList.removeAt(0));
    console.log(linkedList.removeAt(1));
    console.log(linkedList.removeAt(3));
    console.log(linkedList.toString());

    console.log(linkedList.indexOf(20));

    linkedList.remove(20);

    console.log(linkedList.toString());

    linkedList.clear();
    console.log(linkedList.size());
};