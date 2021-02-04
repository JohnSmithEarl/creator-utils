import { Base } from "./Base";

/**
 * A 64-bit word.
 */
export class WordX64 extends Base {
    high: number = 0;
    low: number = 0;

    /**
     * Initializes a newly created 64-bit word.
     * @param {number} high The high 32 bits.
     * @param {number} low The low 32 bits.
     *
     * @example
     *
     *     let WordX64 = Word.create(0x00010203, 0x04050607);
     */
    constructor(high: number, low: number) {
        super(arguments);

        this.high = high;
        this.low = low;
    }

    /**
     * Bitwise NOTs this word.
     * @return {WordX64} A new x64-Word object after negating.
     * @example
     *
     *     let negated = WordX64.not();
     */
    not(): WordX64 {
        let high = ~this.high;
        let low = ~this.low;
        let word = new WordX64(high, low);
        return word;
    }

    /**
     * Bitwise ANDs this word with the passed word.
     * @param {WordX64} word The x64-Word to AND with this word.
     * @return {WordX64} A new x64-Word object after ANDing.
     *
     * @example
     *
     *     let anded = WordX64.and(anotherUX64Word);
     */
    and(word: WordX64): WordX64 {
        let high = this.high & word.high;
        let low = this.low & word.low;

        let newWord = new WordX64(high, low);
        return newWord;
    }

    /**
     * Bitwise ORs this word with the passed word.
     * @param {WordX64} word The x64-Word to OR with this word.
     * @return {WordX64} A new x64-Word object after ORing.
     *
     * @example
     *
     *     let ored = WordX64.or(anotherUX64Word);
     */
    or(word: WordX64): WordX64 {
        let high = this.high | word.high;
        let low = this.low | word.low;

        let newWord = new WordX64(high, low);
        return newWord;
    }

    /**
     * Bitwise XORs this word with the passed word.
     * @param {WordX64} word The x64-Word to XOR with this word.
     * @return {WordX64} A new x64-Word object after XORing.
     * @example
     *
     *     let xored = WordX64.xor(anotherUX64Word);
     */
    xor(word: WordX64): WordX64 {
        let high = this.high ^ word.high;
        let low = this.low ^ word.low;

        let newWord = new WordX64(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the left.
     * @param {number} n The number of bits to shift.
     * @return {WordX64} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = WordX64.shiftL(25);
     */
    shiftL(n: number): WordX64 {
        let high = 0;
        let low = 0;
        if (n < 32) {
            high = (this.high << n) | (this.low >>> (32 - n));
            low = this.low << n;
        } else {
            high = this.low << (n - 32);
            low = 0;
        }

        let newWord = new WordX64(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the right.
     * @param {number} n The number of bits to shift.
     * @return {WordX64} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = WordX64.shiftR(7);
     */
    shiftR(n: number): WordX64 {
        let low = 0;
        let high = 0;
        if (n < 32) {
            low = (this.low >>> n) | (this.high << (32 - n));
            high = this.high >>> n;
        } else {
            low = this.high >>> (n - 32);
            high = 0;
        }

        let newWord = new WordX64(high, low);
        return newWord;
    }

    /**
     * Rotates this word n bits to the left.
     * @param {number} n The number of bits to rotate.
     * @return {WordX64} A new x64-Word object after rotating.
     * @example
     *
     *     let rotated = WordX64.rotL(25);
     */
    rotL(n: number): WordX64 {
        return this.shiftL(n).or(this.shiftR(64 - n));
    }

    /**
     * Rotates this word n bits to the right.
     * @param {number} n The number of bits to rotate.
     * @return {WordX64} A new x64-Word object after rotating.
     *
     * @example
     *
     *     let rotated = WordX64.rotR(7);
     */
    rotR(n: number): WordX64 {
        return this.shiftR(n).or(this.shiftL(64 - n));
    }

    /**
     * Adds this word with the passed word.
     * @param {WordX64} word The x64-Word to add with this word.
     * @return {WordX64} A new x64-Word object after adding.
     * @example
     *
     *     let added = WordX64.add(anotherUX64Word);
     */
    add(word: WordX64): WordX64 {
        let low = (this.low + word.low) | 0;
        let carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        let high = (this.high + word.high + carry) | 0;

        let newWord = new WordX64(high, low);
        return newWord;
    }
};

import { Test } from "./Test";
Test.test("WordX64", [
    () => {
        let word1 = new WordX64(0, 1);
        let word2 = new WordX64(0, 2);
        let word3 = word1.and(word2);
        console.log("word3:", word3)

        let word4 = word2.clone();
        console.log("word4:", word4);

        console.log("word2 === word4", word2 === word4);
    }
]);
