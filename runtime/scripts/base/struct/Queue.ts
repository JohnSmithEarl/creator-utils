export class Queue {
    private data = [];

    constructor() { }

    /**
     * @description 向队列尾部添加一个(或多个)新的项
     * @param element_elements
     */
    enqueue(element_elements: any | Array<any>): void {
        if (element_elements instanceof Array) {
            for (let i = 0; i < element_elements.length; i++) {
                let element = element_elements[i];
                this.data.push(element);
            }
        } else {
            this.data.push(element_elements);
        }
    }

    /**
     * @description 移除队列的第一(即排在队列最前面的)项，并返回被移除的元素
     */
    dequeue(): any {
        let element = this.data.shift();
        return element;
    }

    /**
     * @description 返回队列第一个元素，队列不做任何变动
     */
    head(): any {
        if (this.isEmpty()) {
            return null;
        } else {
            let element = this.data[0];
            return element;
        }
    }

    /**
     * @description 返回队列最后一个元素，队列不做任何变动
     */
    tail(): any {
        if (this.isEmpty()) {
            return null;
        } else {
            let element = this.data[this.data.length - 1];
            return element;
        }
    }

    /**
     * 队列内无元素返回 true，否则返回 false
     */
    isEmpty(): boolean {
        let isEmpty = this.data.length == 0;
        return isEmpty;
    }

    /**
     * 返回队列内元素个数
     */
    size(): number {
        let size = this.data.length;
        return size;
    }

    /**
     * 清空队列
     */
    clear(): void {
        if (this.data.length > 0) {
            this.data.splice(0, this.data.length);
        }
    }

    /**
     * 序列化
     * @param delimit 元素间隔符
     */
    toString(delimit = ","): string {
        let str = this.data.join(delimit);
        return str;
    }
};

// 3.3 队列的应用

// （1）约瑟夫环（普通模式）

// 要求： 有一个数组 a[100]存放0~99；要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数。

// 分析： 按数组创建队列，依次判断元素是否满足为指定位置的数，如果不是则 enqueue到尾部，否则忽略，当仅有一个元素时便输出。

// // 创建一个长度为100的数组

// const arr_100 = Array.from({ length: 100 }, (_, i) => i*i);

// function delRing(list) {

//  const queue = new Queue();

//  list.forEach(e => { queue.enqueue(e); });

//  let index = 0;

//  while (queue.size() !== 1) {

//    const item = queue.dequeue();

//    index += 1;

//    if (index % 3 !== 0) {

//      queue.enqueue(item);

//    }

//  }

//  return queue.tail();

// }

// console.log(delRing(arr_100)); // 8100 此时index=297

// （2）菲波那切数列（普通模式）

// 要求： 使用队列计算斐波那契数列的第n项。

// 分析： 斐波那契数列的前两项固定为1，后面的项为前两项之和，依次向后，这便是斐波那契数列。

// function fibonacci(n) {

//    const queue = new Queue();

//    queue.enqueue(1);

//    queue.enqueue(1);

//    let index = 0;

//    while(index < n - 2) {

//        index += 1;

//        // 出队列一个元素

//        const delItem = queue.dequeue();

//        // 获取头部值

//        const headItem = queue.head();

//        const nextItem = delItem + headItem;

//        queue.enqueue(nextItem);

//    }

//    return queue.tail();

// }

// console.log(fibonacci(9)); // 34

// （3）用队列实现一个栈

// 要求： 用两个队列实现一个栈。

// 分析： 使用队列实现栈最主要的是在队列中找到栈顶元素并对其操作。具体的思路如下：

// 1、两个队列，一个备份队列 emptyQueue，一个是数据队列 dataQueue；

// 2、在确认栈顶时，依次 dequeue至备份队列，置换备份队列和数据队列的引用即可。

// class QueueStack {

//  constructor() {

//    this.queue_1 = new Queue();

//    this.queue_2 = new Queue();

//    this._dataQueue = null; // 放数据的队列

//    this._emptyQueue = null; // 空队列,备份使用

//  }

//  // 确认哪个队列放数据,哪个队列做备份空队列

//  _initQueue() {

//    if (this.queue_1.isEmpty() && this.queue_2.isEmpty()) {

//      this._dataQueue = this.queue_1;

//      this._emptyQueue = this.queue_2;

//    } else if (this.queue_1.isEmpty()) {

//      this._dataQueue = this.queue_2;

//      this._emptyQueue = this.queue_1;

//    } else {

//      this._dataQueue = this.queue_1;

//      this._emptyQueue = this.queue_2;

//    }

//  };

//  push(item) {

//    this.init_queue();

//    this._dataQueue.enqueue(item);

//  };

//  peek() {

//    this.init_queue();

//    return this._dataQueue.tail();

//  }

//  pop() {

//    this.init_queue();

//    while (this._dataQueue.size() > 1) {

//      this._emptyQueue.enqueue(this._dataQueue.dequeue());

//    }

//    return this._dataQueue.dequeue();

//  };

// };

// 同样的，一个队列也能实现栈的基本功能：

// class QueueStack {

//  constructor() {

//    this.queue = new Queue();

//  }

//  push(item) {

//    this.queue.enqueue(item);

//  }

//  pop() {

//    // 向队列末尾追加 队列长度-1 次，后弹出队列头部

//    for(let i = 1; i < this.queue.size(); i += 1) {

//      this.queue.enqueue(this.queue.dequeue());

//    }

//    return this.queue.dequeue();

//  }

//  peek() {

//    return this.queue.tail();

//  }

// }

// 学习了栈和队列这类简单的数据结构，我们会发现。数据结构并没有之前想象中那么神秘，它们只是规定了这类数据结构的操作方式：栈只能对栈顶进行操作，队列只能在尾部添加在头部弹出；且它们不关心内部的元素状态。

// 个人认为，学习数据结构是为了提高我们通过代码建模的能力，这也是任何一门编程语言都通用的知识体系，优秀编码者必学之。