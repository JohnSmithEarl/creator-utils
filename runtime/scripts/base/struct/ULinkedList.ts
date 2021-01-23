class UListNode {
    public element: any = null;
    public next: UListNode = null;

    constructor(element: any) {
        this.element = element;
        this.next = null;
    }
};

export class ULinkedList {
    protected length: number = 0;
    protected head: UListNode = null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    public append(element: any): void {
        let node = new UListNode(element);
        // 如果当前链表为空，则将head指向node
        if (this.head === null) this.head = node;
        else {
            // 否则，找到链表尾部的元素，然后添加新元素
            let current = this.getElementAt(this.length - 1);
            current.next = node;
        }

        this.length++;
    }

    public insert(position: number, element: any): boolean {
        // position不能超出边界值
        if (position < 0 || position > this.length) return false;

        let node = new UListNode(element);

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

    public removeAt(position: number): any {
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

    public remove(element: any): any {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    public indexOf(element: any): number {
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

    public getElementAt(position: number): any {
        if (position < 0 || position >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public size(): number {
        return this.length;
    }

    public getHead(): UListNode {
        return this.head;
    }

    public clear(): void {
        this.head = null;
        this.length = 0;
    }

    public toString(): string {
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
    let linkedList = new ULinkedList();
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