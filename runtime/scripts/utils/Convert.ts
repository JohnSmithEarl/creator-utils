export class Convert {
    /**
    * 得到一个节点的世界坐标
    * node的原点在中心
    * @param {*} node
    */
    static localConvertWorldPointAR(node: cc.Node): cc.Vec2 {
        if (node) {
            let pos = node.convertToWorldSpaceAR(cc.v2(0, 0));
            return pos;
        }
        return null;
    }

    /**
    * 得到一个节点的世界坐标
    * node的原点在左下边
    * @param {*} node
    */
    static localConvertWorldPoint(node: cc.Node): cc.Vec2 {
        if (node) {
            let pos = node.convertToWorldSpace(cc.v2(0, 0));
            return pos;
        }
        return null;
    };

    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node中心
     * @param {*} node
     * @param {*} worldPos
     */
    static worldConvertLocalPointAR(node: cc.Node, worldPos: cc.Vec2): cc.Vec2 {
        if (node) {
            let pos = node.convertToNodeSpaceAR(worldPos);
            return pos;
        }
        return null;
    };

    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node左下角
     * @param {*} node
     * @param {*} worldPos
     */
    static worldConvertLocalPoint(node: cc.Node, worldPos: cc.Vec2): cc.Vec2 {
        if (node) {
            let pos = node.convertToNodeSpace(worldPos);
            return pos;
        }
        return null;
    };

    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node
     * @param {*} targetNode
     */
    static convetOtherNodeSpace(node: cc.Node, targetNode: cc.Node): cc.Vec2 {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPos = Convert.localConvertWorldPoint(node);
        let pos = Convert.worldConvertLocalPoint(targetNode, worldPos);
        return pos;
    }

    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node
     * @param {*} targetNode
     */
    static convetOtherNodeSpaceAR(node: cc.Node, targetNode: cc.Node): cc.Vec2 {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPos = Convert.localConvertWorldPointAR(node);
        let pos = Convert.worldConvertLocalPointAR(targetNode, worldPos);
        return pos;
    }
};
