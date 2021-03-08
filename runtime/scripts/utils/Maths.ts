export class Maths {
    /**
     * 是否为奇数
     * @param num
     * @returns
     */
    static isOdd(num: number): boolean {
        let isOdd = num % 2 == 1;
        return isOdd;
    }

    /**
     * 是否为偶数
     * @param num
     * @returns
     */
    static isEven(num: number): boolean {
        let isEven = (num % 2) == 0;
        return isEven;
    }

    /**
     * 获取min~max随机整数
     * @param min
     * @param max
     * @returns
     */
    static randomNum(min: number = 0, max: number = 1) {
        let random = Math.random();
        let range = max - min;
        let randomNum = Math.round(random * range) + min;
        return randomNum;
    }

    /**
     * 获取min~max随机浮点数
     * @param min
     * @param max
     * @returns
     */
    static randomFloat(min: number = 0.0, max: number = 1.0) {
        let random = Math.random();
        let range = max - min;
        let randomFloat = random * range + min;
        return randomFloat;
    }

    /**
     * 随机弹出数组中的子项
     * @param arr
     * @returns
     */
    static randomPop(arr = []) {
        let idx = Math.random() * arr.length | 0;
        return arr.splice(idx, 1)[0];
    }
};