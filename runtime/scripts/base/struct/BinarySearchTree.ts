/**
 * @description 搜索二叉树节点
 */
export class TreeNode {
    val: any;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: any, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * @description 搜索二叉树
 */
export class BinarySearchTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * insert(key)：向树中插入一个新的键。
     * @param {Number} key
     */
    insert(key: any) {
        const newNode = new TreeNode(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    /**
     * 在 curNode 节点下 插入 newNode 节点
     * @param curNode
     * @param newNode
     */
    private insertNode(curNode: TreeNode, newNode: TreeNode) {
        if (newNode.val < curNode.val) {
            if (curNode.left === null) {
                curNode.left = newNode
            } else {
                this.insertNode(curNode.left, newNode)
            }
        } else {
            if (curNode.right === null) {
                curNode.right = newNode
            } else {
                this.insertNode(curNode.right, newNode)
            }
        }
    }

    /**
     * 在树中查找一个键，如果结点存在，则返回true；如果不存在，则返回false。
     * @param key
     */
    search(key: any): boolean {
        return this.searchNode(this.root, key);
    }

    /**
     * 在 node 节点下, 搜索 key
     * @param node
     * @param key
     */
    private searchNode(node: TreeNode | null, key: any): boolean {
        if (node === null) return false;
        if (key < node.val) return this.searchNode(node.left, key);
        if (key > node.val) return this.searchNode(node.right, key);
        return true;
    }

    /**
     * @description 通过先序遍历方式遍历所有结点。
     * @param  {Function} handler 遍历处理函数
     */
    preOrderTraversal(handler: Function = (key: any) => { console.log(key) }): void {
        this.preOrderTranversalNode(this.root, handler)
    }

    /**
     * @description 先节点node下进行先序遍历
     * @param node
     * @param handler
     */
    private preOrderTranversalNode(node: TreeNode, handler: Function) {
        if (node !== null) {
            handler(node.val);
            this.preOrderTranversalNode(node.left, handler)
            this.preOrderTranversalNode(node.right, handler)
        }
    }

    /**
     * @description 通过中序遍历方式遍历所有结点
     * @param {Function}  handler 遍历处理函数
     */
    inOrderTraversal(handler: Function = (key: any) => { console.log(key) }) {
        this.inOrderTraversalNode(this.root, handler)
    }

    /**
     * @description 在节点node下进行中序遍历
     * @param node
     * @param  handler
     */
    private inOrderTraversalNode(node: TreeNode, handler: Function) {
        if (node !== null) {
            this.inOrderTraversalNode(node.left, handler);
            handler(node.val);
            this.inOrderTraversalNode(node.right, handler);
        }
    }

    /**
     * @description 通过后序遍历方式遍历所有结点
     * @param handler
     */
    postOrderTraversal = function (handler: Function = (key: any) => { console.log(key) }) {
        this.postOrderTraversalNode(this.root, handler);
    }

    /**
     * @description 在节点node下进行后续遍历
     * @param node
     * @param handler
     */
    private postOrderTraversalNode(node: TreeNode, handler: Function) {
        if (node !== null) {
            this.postOrderTraversalNode(node.left, handler);
            this.postOrderTraversalNode(node.right, handler);
            handler(node.val);
        }
    }

    /**
     * @description 返回树中最小的值/键
     */
    min(): TreeNode | null {
        return this.minNode(this.root);
    }

    /**
     * @description 返回节点node下最小的值/键
     * @param node
     */
    private minNode(node: TreeNode | null): TreeNode | null {
        if (node) {
            while (node.left) {
                node = node.left;
            }
            return node.val;
        }
        return null;
    }

    /**
     * @description 返回树中最大的值/键
     */
    max(): TreeNode | null {
        return this.maxNode(this.root);
    }

    /**
     * @description 返回节点node下的最大的值/键
     * @param node
     */
    maxNode(node: TreeNode | null): TreeNode | null {
        if (node) {
            while (node.right) {
                node = node.right;
            }
            return node.val;
        }
        return null;
    }

    /**
     * @description 从树中移除某个键/值
     * @param key
     */
    remove(key: any): TreeNode {
        return this.removeNode(this.root, key);
    }

    /**
     * @description 从节点树node中移除某个键/值
     * @param node
     * @param key
     */
    private removeNode(node: TreeNode, key: any) {
        if (node === null) return null;
        if (node.val === key) {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            }
            if (node.right === null) {
                node = node.left;
                return node;
            }
            let aux = this.minNode(node.right);
            node.val = aux.val;
            node.right = this.removeNode(node.right, aux.val);
            return node;
        } else if (key < node.val) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else {
            node.right = this.removeNode(node.right, key);
            return node;
        }
    }
};