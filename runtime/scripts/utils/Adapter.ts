let _NOTCH_RATE = 1.86;
let _NOTCH_ADJUST_Y = 70;

export class Adapter {
    /**
     * 游戏屏幕适配
     */
    static adapterScreen() {
        let canvas = cc.Canvas.instance;
        let rateR = canvas.designResolution.height / canvas.designResolution.width;
        let rateV = cc.winSize.height / cc.winSize.width;
        if (rateV > rateR) {
            canvas.fitHeight = false;
            canvas.fitWidth = true;
        } else {
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
    };

    /**
     * 是否为刘海屏幕
     */
    static isNotch(): boolean {
        let rateV = cc.winSize.height / cc.winSize.width;
        let isNotchScreen = rateV > _NOTCH_RATE;
        return isNotchScreen;
    };

    /**
     * 调整刘海屏
     * @param nodes 待调整的节点
     * @param offsetY
     */
    static adapterNotch = function (nodes: Array<cc.Node> = [], offsetY = _NOTCH_ADJUST_Y): void {
        let isNotch = Adapter.isNotch();
        if (isNotch) {
            if (nodes && nodes.length > 0) {
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    if (node && typeof node.y == "number") {
                        node.y = node.y - offsetY;
                    }
                }
            }
        }
    };
}
