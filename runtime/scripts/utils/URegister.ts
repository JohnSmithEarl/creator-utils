export class UTouchRegister {
    static register(
        target: any,
        touchBegin?: (pos: cc.Vec2) => {},
        touchMove?: (pos: cc.Vec2, delta: cc.Vec2) => {},
        touchEnded?: (pos: cc.Vec2) => {},
        touchCancel?: (pos: cc.Vec2) => {}): void {

        if (!target || !target.node) {
            console.error("UTouchRegister - register - invlid target.");
            return;
        }

        target.touchBeginCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchBegin == "function") {
                touchBegin(pos);
            }
        };
        target.touchMoveCallback = (event) => {
            let pos = event.getLocation();
            let delta = event.getDelta();
            if (typeof touchMove == "function") {
                touchMove(pos, delta);
            }
        };
        target.touchEnededCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchEnded == "function") {
                touchEnded(pos);
            }
        }
        target.touchCancelCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchCancel == "function") {
                touchCancel(pos);
            }
        };

        target.node.on(cc.Node.EventType.TOUCH_START, target.touchBeginCallback, target);
        target.node.on(cc.Node.EventType.TOUCH_MOVE, target.touchMoveCallback, target);
        target.node.on(cc.Node.EventType.TOUCH_END, target.touchEnededCallback, target);
        target.node.on(cc.Node.EventType.TOUCH_CANCEL, target.touchCancelCallback, target);
    }
    static unregister(target: any): void {
        if (!target || !target.node) {
            console.error("UTouchRegister - unregister - invlid target.");
            return;
        }

        if (typeof target.touchBeginCallback == "function") {
            target.node.off(cc.Node.EventType.TOUCH_START, target.touchBeginCallback, target);
            target.touchBeginCallback = null;
        }
        if (typeof target.touchMoveCallback == "function") {
            target.node.off(cc.Node.EventType.TOUCH_MOVE, target.touchMoveCallback, target);
            target.touchMoveCallback = null;
        }
        if (typeof target.touchEnededCallback == "function") {
            target.node.off(cc.Node.EventType.TOUCH_END, target.touchEnededCallback, target);
            target.touchEnededCallback = null;
        }
        if (typeof target.touchCancelCallback == "function") {
            target.node.off(cc.Node.EventType.TOUCH_CANCEL, target.touchCancelCallback, target);
            target.touchCancelCallback = null;
        }
    };
};

export class UMouseRegister {
    static register(
        target: any,
        leftDown?: (pos: cc.Vec2) => {},
        leftUp?: (pos: cc.Vec2) => {},
        midDown?: (pos: cc.Vec2) => {},
        midUp?: (pos: cc.Vec2) => {},
        rightDown?: (pos: cc.Vec2) => {},
        rigthUp?: (pos: cc.Vec2) => {},
        mouseMove?: (pos: cc.Vec2, delta: cc.Vec2) => {},
        wheelScroll?: (scrollY: number) => {}): void {

        if (!target || !target.node) {
            console.error("UMouseRegister - register - invlid node.");
            return;
        }

        target.mouseDown = (event: cc.Event.EventMouse) => {
            let mouseBtnType = event.getButton();
            let pos = event.getLocation();
            if (mouseBtnType == cc.Event.EventMouse.BUTTON_LEFT) {
                if (typeof leftDown == "function") {
                    leftDown(pos);
                }
            } else if (mouseBtnType == cc.Event.EventMouse.BUTTON_RIGHT) {
                if (typeof rightDown == "function") {
                    rightDown(pos);
                }
            } else if (mouseBtnType == cc.Event.EventMouse.BUTTON_MIDDLE) {
                if (typeof midDown == "function") {
                    midDown(pos);
                }
            } else {
                console.error("mouseDown:", mouseBtnType);
            }
        };
        target.mouseUp = (event: cc.Event.EventMouse) => {
            let mouseBtnType = event.getButton();
            let pos = event.getLocation();

            if (mouseBtnType == cc.Event.EventMouse.BUTTON_LEFT) {
                if (typeof leftUp == "function") {
                    leftUp(pos);
                }
            } else if (mouseBtnType == cc.Event.EventMouse.BUTTON_RIGHT) {
                if (typeof rigthUp == "function") {
                    rigthUp(pos);
                }
            } else if (mouseBtnType == cc.Event.EventMouse.BUTTON_MIDDLE) {
                if (typeof midUp == "function") {
                    midUp(pos);
                }
            } else {
                console.error("mouseUp:", mouseBtnType);
            }
        };
        target.mouseMove = (event: cc.Event.EventMouse) => {
            let pos = event.getLocation();
            let delta = event.getDelta();
            if (typeof mouseMove == "function") {
                mouseMove(pos, delta);
            }
        };
        target.mouseWheel = (event) => {
            let scrollY = event.getScrollY();
            if (typeof wheelScroll == "function") {
                wheelScroll(scrollY);
            }
        };

        target.node.on(cc.Node.EventType.MOUSE_DOWN, target.mouseDown, target);
        target.node.on(cc.Node.EventType.MOUSE_UP, target.mouseUp, target);
        target.node.on(cc.Node.EventType.MOUSE_MOVE, target.mouseMove, target);
        target.node.on(cc.Node.EventType.MOUSE_WHEEL, target.mouseWheel, target);
    }
    unregister = function (target: any): void {
        if (!target || !target.node) {
            console.error("UMouseRegister - unregister - invlid node.");
            return;
        }

        if (typeof target.mouseDown == "function") {
            target.node.off(cc.Node.EventType.MOUSE_DOWN, target.mouseDown, target);
            target.mouseDown = null;
        }
        if (typeof target.mouseUp == "function") {
            target.node.off(cc.Node.EventType.MOUSE_UP, target.mouseUp, target);
            target.mouseUp = null;
        }
        if (typeof target.mouseMove == "function") {
            target.node.off(cc.Node.EventType.MOUSE_MOVE, target.mouseMove, target);
            target.mouseMove = null;
        }
        if (typeof target.mouseWheel == "function") {
            target.node.off(cc.Node.EventType.MOUSE_WHEEL, target.mouseWheel, target);
            target.mouseWheel = null;
        }
    };
};

export class UBackgroundRegister {
    static register(
        target: any,
        hide: () => {},
        show: () => {},
    ): void {
        if (!target || !target.node) {
            console.error("UBackgroundRegister - register - invlid node.");
            return;
        }
        target.hideCallback = () => {
            if (typeof hide == "function") {
                hide();
            }
        };
        target.showCallback = () => {
            if (typeof show == "function") {
                show();
            }
        };
        cc.game.on(cc.game.EVENT_HIDE, target.hideCallback, target);
        cc.game.on(cc.game.EVENT_SHOW, target.showCallback, target);
    }
    static unregister(target: any): void {
        if (!target || !target.node) {
            console.error("UBackgroundRegister - unregister - invlid node.");
            return;
        }
        if (typeof target.hideCallback == "function") {
            cc.game.off(cc.game.EVENT_HIDE, target.hideCallback, target);
            target.hideCallback = null;
        }
        if (typeof target.showCallback == "function") {
            cc.game.off(cc.game.EVENT_SHOW, target.showCallback, target);
            target.showCallback = null;
        }
    }
};

export class UAndroidRegister {
    static register(
        backCallback?: Function,
        homeCallback?: Function,
        menuCallback?: Function): void {

        let node: any = cc.Canvas.instance.node;
        node.keyUp = (event: cc.Event.EventKeyboard) => {
            if (event.keyCode == cc.macro.KEY.back) {
                if (typeof backCallback == "function") {
                    backCallback();
                }
            } else if (event.keyCode == cc.macro.KEY.home) {
                if (typeof homeCallback == "function") {
                    homeCallback();
                }
            } else if (event.keyCode == cc.macro.KEY.menu) {
                if (typeof menuCallback == "function") {
                    menuCallback();
                }
            } else {
                console.error("UtilEvent - keyCode:", event.keyCode);
            }
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, node.keyUp, cc.Canvas.instance);
    }
    static unregister(): void {
        let node: any = cc.Canvas.instance.node;
        if (typeof node.keyUp == "function") {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, node.keyUp, cc.Canvas.instance);
        }
    }
};