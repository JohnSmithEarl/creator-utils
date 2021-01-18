export class cu_TouchRegister {
    static register(
        node: any,
        touchBegin?: (pos: cc.Vec2) => {},
        touchMove?: (pos: cc.Vec2, delta: cc.Vec2) => {},
        touchEnded?: (pos: cc.Vec2) => {},
        touchCancel?: (pos: cc.Vec2) => {}): void {

        if (!node) {
            console.error("invlid node.");
            return;
        }

        node.touchBeginCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchBegin == "function") {
                touchBegin(pos);
            }
        };
        node.touchMoveCallback = (event) => {
            let pos = event.getLocation();
            let delta = event.getDelta();
            if (typeof touchMove == "function") {
                touchMove(pos, delta);
            }
        };
        node.touchEnededCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchEnded == "function") {
                touchEnded(pos);
            }
        }
        node.touchCancelCallback = (event) => {
            let pos = event.getLocation();
            if (typeof touchCancel == "function") {
                touchCancel(pos);
            }
        };

        node.on(cc.Node.EventType.TOUCH_START, node.touchBeginCallback, node);
        node.on(cc.Node.EventType.TOUCH_MOVE, node.touchMoveCallback, node);
        node.on(cc.Node.EventType.TOUCH_END, node.touchEnededCallback, node);
        node.on(cc.Node.EventType.TOUCH_CANCEL, node.touchCancelCallback, node);
    }
    static unregister(node: any): void {
        if (!node) {
            console.error("invlid node.");
            return;
        }

        if (typeof node.touchBeginCallback == "function") {
            node.off(cc.Node.EventType.TOUCH_START, node.touchBeginCallback, node);
            node.touchBeginCallback = null;
        }
        if (typeof node.touchMoveCallback == "function") {
            node.off(cc.Node.EventType.TOUCH_MOVE, node.touchMoveCallback, node);
            node.touchMoveCallback = null;
        }
        if (typeof node.touchEnededCallback == "function") {
            node.off(cc.Node.EventType.TOUCH_END, node.touchEnededCallback, node);
            node.touchEnededCallback = null;
        }
        if (typeof node.touchCancelCallback == "function") {
            node.off(cc.Node.EventType.TOUCH_CANCEL, node.touchCancelCallback, node);
            node.touchCancelCallback = null;
        }
    };
};

export class cu_MouseRegister {
    static register(
        node: any,
        leftDown?: (pos: cc.Vec2) => {},
        leftUp?: (pos: cc.Vec2) => {},
        midDown?: (pos: cc.Vec2) => {},
        midUp?: (pos: cc.Vec2) => {},
        rightDown?: (pos: cc.Vec2) => {},
        rigthUp?: (pos: cc.Vec2) => {},
        mouseMove?: (pos: cc.Vec2, delta: cc.Vec2) => {},
        wheelScroll?: (scrollY: number) => {}): void {

        if (!node) {
            console.error("invlid node.");
            return;
        }

        node.mouseDown = (event: cc.Event.EventMouse) => {
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
        node.mouseUp = (event: cc.Event.EventMouse) => {
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
        node.mouseMove = (event: cc.Event.EventMouse) => {
            let pos = event.getLocation();
            let delta = event.getDelta();
            if (typeof mouseMove == "function") {
                mouseMove(pos, delta);
            }
        };
        node.mouseWheel = (event) => {
            let scrollY = event.getScrollY();
            if (typeof wheelScroll == "function") {
                wheelScroll(scrollY);
            }
        };

        node.on(cc.Node.EventType.MOUSE_DOWN, node.mouseDown, node);
        node.on(cc.Node.EventType.MOUSE_UP, node.mouseUp, node);
        node.on(cc.Node.EventType.MOUSE_MOVE, node.mouseMove, node);
        node.on(cc.Node.EventType.MOUSE_WHEEL, node.mouseWheel, node);
    }
    unregister = function (node: any): void {
        if (!node) {
            console.error("invlid node.");
            return;
        }

        if (typeof node.mouseDown == "function") {
            node.off(cc.Node.EventType.MOUSE_DOWN, node.mouseDown, node);
            node.mouseDown = null;
        }
        if (typeof node.mouseUp == "function") {
            node.off(cc.Node.EventType.MOUSE_UP, node.mouseUp, node);
            node.mouseUp = null;
        }
        if (typeof node.mouseMove == "function") {
            node.off(cc.Node.EventType.MOUSE_MOVE, node.mouseMove, node);
            node.mouseMove = null;
        }
        if (typeof node.mouseWheel == "function") {
            node.off(cc.Node.EventType.MOUSE_WHEEL, node.mouseWheel, node);
            node.mouseWheel = null;
        }
    };
};

export class cu_BackgroundRegister {
    static register(
        node: any,
        hide?: Function,
        show?: Function,
    ): void {
        if (!node) {
            console.error("invlid node.");
            return;
        }

        node.hideCallback = () => {
            if (typeof hide == "function") {
                hide();
            }
        };
        node.showCallback = () => {
            if (typeof show == "function") {
                show();
            }
        };
        cc.game.on(cc.game.EVENT_HIDE, node.hideCallback, node);
        cc.game.on(cc.game.EVENT_SHOW, node.showCallback, node);
    }
    static unregister(node: any): void {
        if (!node) {
            console.error("invlid node.");
            return;
        }

        if (typeof node.hideCallback == "function") {
            cc.game.off(cc.game.EVENT_HIDE, node.hideCallback, node);
            node.hideCallback = null;
        }
        if (typeof node.showCallback == "function") {
            cc.game.off(cc.game.EVENT_SHOW, node.showCallback, node);
            node.showCallback = null;
        }
    }
};

export class cu_AndroidRegister {
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