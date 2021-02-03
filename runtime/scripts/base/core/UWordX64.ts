import { UObject } from "./UObject";

/**
 * A 64-bit word.
 */
export class UWordX64 extends UObject {
    high: number = 0;
    low: number = 0;

    constructor(high: number, low: number) {
        super();
        this.init(high, low);
    }

    /**
     * Initializes a newly created 64-bit word.
     * @param {number} high The high 32 bits.
     * @param {number} low The low 32 bits.
     *
     * @example
     *
     *     let UWordX64 = Word.create(0x00010203, 0x04050607);
     */
    init(high: number, low: number) {
        this.high = high;
        this.low = low;
    }

    /**
     * Bitwise NOTs this word.
     * @return {UWordX64} A new x64-Word object after negating.
     * @example
     *
     *     let negated = UWordX64.not();
     */
    not(): UWordX64 {
        let high = ~this.high;
        let low = ~this.low;
        let word = new UWordX64(high, low);
        return word;
    }

    /**
     * Bitwise ANDs this word with the passed word.
     * @param {UWordX64} word The x64-Word to AND with this word.
     * @return {UWordX64} A new x64-Word object after ANDing.
     *
     * @example
     *
     *     let anded = UWordX64.and(anotherUX64Word);
     */
    and(word: UWordX64): UWordX64 {
        let high = this.high & word.high;
        let low = this.low & word.low;

        let newWord = new UWordX64(high, low);
        return newWord;
    }

    /**
     * Bitwise ORs this word with the passed word.
     * @param {UWordX64} word The x64-Word to OR with this word.
     * @return {UWordX64} A new x64-Word object after ORing.
     *
     * @example
     *
     *     let ored = UWordX64.or(anotherUX64Word);
     */
    or(word: UWordX64): UWordX64 {
        let high = this.high | word.high;
        let low = this.low | word.low;

        let newWord = new UWordX64(high, low);
        return newWord;
    }

    /**
     * Bitwise XORs this word with the passed word.
     * @param {UWordX64} word The x64-Word to XOR with this word.
     * @return {UWordX64} A new x64-Word object after XORing.
     * @example
     *
     *     let xored = UWordX64.xor(anotherUX64Word);
     */
    xor(word: UWordX64): UWordX64 {
        let high = this.high ^ word.high;
        let low = this.low ^ word.low;

        let newWord = new UWordX64(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the left.
     * @param {number} n The number of bits to shift.
     * @return {UWordX64} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = UWordX64.shiftL(25);
     */
    shiftL(n: number): UWordX64 {
        let high = 0;
        let low = 0;
        if (n < 32) {
            high = (this.high << n) | (this.low >>> (32 - n));
            low = this.low << n;
        } else {
            high = this.low << (n - 32);
            low = 0;
        }

        let newWord = new UWordX64(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the right.
     * @param {number} n The number of bits to shift.
     * @return {UWordX64} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = UWordX64.shiftR(7);
     */
    shiftR(n: number): UWordX64 {
        let low = 0;
        let high = 0;
        if (n < 32) {
            low = (this.low >>> n) | (this.high << (32 - n));
            high = this.high >>> n;
        } else {
            low = this.high >>> (n - 32);
            high = 0;
        }

        let newWord = new UWordX64(high, low);
        return newWord;
    }

    /**
     * Rotates this word n bits to the left.
     * @param {number} n The number of bits to rotate.
     * @return {UWordX64} A new x64-Word object after rotating.
     * @example
     *
     *     let rotated = UWordX64.rotL(25);
     */
    rotL(n: number): UWordX64 {
        return this.shiftL(n).or(this.shiftR(64 - n));
    }

    /**
     * Rotates this word n bits to the right.
     * @param {number} n The number of bits to rotate.
     * @return {UWordX64} A new x64-Word object after rotating.
     *
     * @example
     *
     *     let rotated = UWordX64.rotR(7);
     */
    rotR(n: number): UWordX64 {
        return this.shiftR(n).or(this.shiftL(64 - n));
    }

    /**
     * Adds this word with the passed word.
     * @param {UWordX64} word The x64-Word to add with this word.
     * @return {UWordX64} A new x64-Word object after adding.
     * @example
     *
     *     let added = UWordX64.add(anotherUX64Word);
     */
    add(word: UWordX64): UWordX64 {
        let low = (this.low + word.low) | 0;
        let carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        let high = (this.high + word.high + carry) | 0;

        let newWord = new UWordX64(high, low);
        return newWord;
    }
};

import { UTest } from "./UTest";
UTest.test("UWordX64", [
    () => {
        let w1 = new UWordX64(0, 1);
        let w2 = new UWordX64(0, 2);
        let w3 = w1.and(w2);
        console.log("w3:", w3)

        let w4 = w2.clone();
        console.log("w4:", w4);

        console.log("w3 === w4", w3 === w4);
    }
]);
