export let POP_UP_TYPE = cc.Enum({
    NONE: 0,
    SCALE: 1,
    SCALE_X: 2,
    SCALE_Y: 3,
});

const { ccclass, property } = cc._decorator;
@ccclass
export default class cu_PopUp extends cc.Component {
    @property({ type: cc.Node })
    target: cc.Node = this.node;
    @property({ type: POP_UP_TYPE })
    popUpType = POP_UP_TYPE.NONE;

    private reset() {
        switch (this.popUpType) {
            case POP_UP_TYPE.NONE: {
                break;
            }
            case POP_UP_TYPE.SCALE: {
                this.target.scale = 0;
                break;
            }
            case POP_UP_TYPE.SCALE_Y: {
                this.target.scaleY = 0;
                break;
            }
            case POP_UP_TYPE.SCALE: {
                this.target.scale = 0;
                break;
            }
            default: {
                break;
            }
        }
    };

    private action() {
        let sequnce = null;
        switch (this.popUpType) {
            case POP_UP_TYPE.NONE: {
                console.warn("there is nothing to do.", this.target && this.target.name);
                break;
            }
            case POP_UP_TYPE.SCALE: {
                sequnce = cc.sequence(
                    cc.scaleTo(0.3, 1.1),
                    cc.scaleTo(0.1, 1.0),
                )
                break;
            }
            case POP_UP_TYPE.SCALE_Y: {
                sequnce = cc.sequence(
                    cc.scaleTo(0.3, 1.0, 1.1),
                    cc.scaleTo(0.1, 1.0, 1.0),
                )
                break;
            }
            case POP_UP_TYPE.SCALE: {
                sequnce = cc.sequence(
                    cc.scaleTo(0.3, 1.1),
                    cc.scaleTo(0.1, 1.0),
                )
                break;
            }
            default: {
                console.error("not find ", this.popUpType);
                break;
            }
        }
        if (sequnce) {
            this.target.runAction(sequnce);
        }
    }

    onLoad() {
        this.reset();
    }

    onEnable() {
        this.action();
    }
};