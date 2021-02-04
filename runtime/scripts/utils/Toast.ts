let nodeToast: cc.Node = null;

export class UToast {
    static show(message: string, parent?: cc.Node) {
        parent = parent instanceof cc.Node ? parent : cc.Canvas.instance.node;

        let nodeSp = new cc.Node();
        nodeSp.parent = parent;
        nodeSp.active = true;

        nodeToast = nodeSp;

        let sp = nodeSp.addComponent(cc.Sprite);
        sp.type = cc.Sprite.Type.SLICED;
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.loader.loadRes("lobby/common/lobby_toastBg", cc.SpriteFrame, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                sp.spriteFrame = res;

                let nodeLab = new cc.Node();
                nodeLab.parent = nodeSp;
                nodeLab.active = true;

                let label: any = nodeLab.addComponent(cc.Label);
                label.string = message;
                label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                label.verticalAlign = cc.Label.VerticalAlign.CENTER;
                label.fontSize = 40;
                label.lineHeight = 50;
                label.fontFamily = 'Arial';

                label._forceUpdateRenderData(true); // 这里调用一次手动渲染

                nodeSp.width = label.node.width + 100;
                nodeSp.height = label.node.height + 60;
                nodeSp.setPosition(0, 0);
                nodeSp.parent = parent;

                setTimeout(() => {
                    nodeSp.removeFromParent(true)
                    nodeToast = null;
                }, 1500);
            }
        });
    }
};