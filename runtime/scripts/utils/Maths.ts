export class Maths {
    static randomPop(arr = []) {
        let idx = Math.random() * arr.length | 0;
        return arr.splice(idx, 1)[0];
    }
};