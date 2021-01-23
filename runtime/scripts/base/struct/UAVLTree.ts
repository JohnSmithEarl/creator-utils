import { UTreeNode, UBinarySearchTree } from "./UBinarySearchTree";

export class AVLTree extends UBinarySearchTree {
    constructor() {
        super();
    }

    // 计算节点的高度
    public getNodeHeight(node: UTreeNode): number {
        if (node === null) return 0;
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    };

    // 获取节点的平衡因子

    /**
     * LL旋转: 向右旋转
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                         /   / \
     *   c   d                       f   d   e
     *  /
     * f
     *
     * @param node Node<T>
     */
    public rotationLL(node: UTreeNode): UTreeNode {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    /**
     * RR旋转: 向左旋转
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \   \
     *     d   e                      c   d   f
     *          \
     *           f
     *
     * @param node Node<T>
     */
    public rotationRR(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }

    /**
     * LR旋转: 先向左旋转，然后再向右旋转
     * @param node Node<T>
     */
    public rotationLR(node: UTreeNode): UTreeNode {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    /**
     * RL旋转: 先向右旋转，然后再向左旋转
     * @param node Node<T>
     */
    public rotationRL(node: UTreeNode): UTreeNode {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    public insert(key: any): void {
        super.insert(key);

        // 左子树高度大于右子树高度
        if (this.getNodeHeight(this.root.left) - this.getNodeHeight(this.root.right) > 1) {
            if (key < this.root.left.val) {
                this.root = this.rotationLL(this.root);
            }
            else {
                this.root = this.rotationLR(this.root);
            }
        } else if (this.getNodeHeight(this.root.right) - this.getNodeHeight(this.root.left) > 1) {
            // 右子树高度大于左子树高度
            if (key > this.root.right.val) {
                this.root = this.rotationRR(this.root);
            }
            else {
                this.root = this.rotationRL(this.root);
            }
        }
    }

    public remove(key: any): UTreeNode {
        let node = super.remove(key);
        if (this.getNodeHeight(this.root.left) - this.getNodeHeight(this.root.right) > 1) {
            // 左子树高度大于右子树高度
            if (key < this.root.left.val) {
                this.root = this.rotationLL(this.root);
            }
            else {
                this.root = this.rotationLR(this.root);
            }
        } else if (this.getNodeHeight(this.root.right) - this.getNodeHeight(this.root.left) > 1) {
            // 右子树高度大于左子树高度
            if (key > this.root.right.val) {
                this.root = this.rotationRR(this.root);
            }
            else {
                this.root = this.rotationRL(this.root);
            }
        }
        return node;
    }
};