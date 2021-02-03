export class UFunction extends Function {
    constructor() {
        super();
    }

    /**
     * @description 防抖函数
     * @param func 生产防抖函数的目标函数
     * @param duration 防抖时长(毫秒)
     */
    public static debounce(func: Function, duration = 300 /*毫秒*/): Function {
        let timeout = null;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, arguments);
            }, duration);
        }
    }

    /**
     * @description 限流函数
     * @param func 生产限流函数的目标函数
     * @param duration 限流时长(毫秒)
     */
    public static throttle(func: Function, duration = 300 /*毫秒*/): Function {
        let timeout = null;
        return function () {
            if (timeout) return;
            timeout = setTimeout(() => {
                func.apply(this, arguments);
                timeout = null;
            }, duration);
        }
    }
};