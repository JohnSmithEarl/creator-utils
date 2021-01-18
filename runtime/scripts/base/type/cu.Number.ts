export class cu_Number {
    static isOdd(num: number): boolean {
        let isOdd = num % 2 == 1;
        return isOdd;
    }
    static isEven(num: number): boolean {
        let isEven = (num % 2) == 0;
        return isEven;
    }
};