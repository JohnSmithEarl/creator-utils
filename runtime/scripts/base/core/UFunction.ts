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

let test = function () {
    function add(a: number) {
        function sum(b: number) { // 使用闭包
            a = a + b; // 累加
            return sum;
        }
        sum.toString = function () { // 重写toString()方法
            return a;
        }
        return sum; // 返回一个函数
    }
    add(1); // 1
    add(1)(2); // 3
    add(1)(2)(3); // 6
    add(1)(2)(3)(4); // 10
}
test();