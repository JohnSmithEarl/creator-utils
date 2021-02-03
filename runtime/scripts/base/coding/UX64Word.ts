import { UObject } from "../type/UObject";

/**
 * A 64-bit word.
 */
export class UX64Word extends UObject {
    protected high: number = 0;
    protected low: number = 0;

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
     *     let UX64Word = Word.create(0x00010203, 0x04050607);
     */
    init(high: number, low: number) {
        this.high = high;
        this.low = low;
    }

    /**
     * Bitwise NOTs this word.
     * @return {UX64Word} A new x64-Word object after negating.
     * @example
     *
     *     let negated = UX64Word.not();
     */
    not(): UX64Word {
        let high = ~this.high;
        let low = ~this.low;
        let word = new UX64Word(high, low);
        return word;
    }

    /**
     * Bitwise ANDs this word with the passed word.
     * @param {UX64Word} word The x64-Word to AND with this word.
     * @return {UX64Word} A new x64-Word object after ANDing.
     *
     * @example
     *
     *     let anded = UX64Word.and(anotherUX64Word);
     */
    and(word: UX64Word): UX64Word {
        let high = this.high & word.high;
        let low = this.low & word.low;

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    /**
     * Bitwise ORs this word with the passed word.
     * @param {UX64Word} word The x64-Word to OR with this word.
     * @return {UX64Word} A new x64-Word object after ORing.
     *
     * @example
     *
     *     let ored = UX64Word.or(anotherUX64Word);
     */
    or(word: UX64Word): UX64Word {
        let high = this.high | word.high;
        let low = this.low | word.low;

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    /**
     * Bitwise XORs this word with the passed word.
     * @param {UX64Word} word The x64-Word to XOR with this word.
     * @return {UX64Word} A new x64-Word object after XORing.
     * @example
     *
     *     let xored = UX64Word.xor(anotherUX64Word);
     */
    xor(word: UX64Word): UX64Word {
        let high = this.high ^ word.high;
        let low = this.low ^ word.low;

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the left.
     * @param {number} n The number of bits to shift.
     * @return {UX64Word} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = UX64Word.shiftL(25);
     */
    shiftL(n: number): UX64Word {
        let high = 0;
        let low = 0;
        if (n < 32) {
            high = (this.high << n) | (this.low >>> (32 - n));
            low = this.low << n;
        } else {
            high = this.low << (n - 32);
            low = 0;
        }

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    /**
     * Shifts this word n bits to the right.
     * @param {number} n The number of bits to shift.
     * @return {UX64Word} A new x64-Word object after shifting.
     * @example
     *
     *     let shifted = UX64Word.shiftR(7);
     */
    shiftR(n: number): UX64Word {
        let low = 0;
        let high = 0;
        if (n < 32) {
            low = (this.low >>> n) | (this.high << (32 - n));
            high = this.high >>> n;
        } else {
            low = this.high >>> (n - 32);
            high = 0;
        }

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    /**
     * Rotates this word n bits to the left.
     * @param {number} n The number of bits to rotate.
     * @return {UX64Word} A new x64-Word object after rotating.
     * @example
     *
     *     let rotated = UX64Word.rotL(25);
     */
    rotL(n: number): UX64Word {
        return this.shiftL(n).or(this.shiftR(64 - n));
    }

    /**
     * Rotates this word n bits to the right.
     * @param {number} n The number of bits to rotate.
     * @return {UX64Word} A new x64-Word object after rotating.
     *
     * @example
     *
     *     let rotated = UX64Word.rotR(7);
     */
    rotR(n: number): UX64Word {
        return this.shiftR(n).or(this.shiftL(64 - n));
    }

    /**
     * Adds this word with the passed word.
     * @param {UX64Word} word The x64-Word to add with this word.
     * @return {UX64Word} A new x64-Word object after adding.
     * @example
     *
     *     let added = UX64Word.add(anotherUX64Word);
     */
    add(word: UX64Word): UX64Word {
        let low = (this.low + word.low) | 0;
        let carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        let high = (this.high + word.high + carry) | 0;

        let newWord = new UX64Word(high, low);
        return newWord;
    }

    toString(): string {
        return "{ high:" + this.high + ",low:" + this.low + "}";
    }
};

export let test = function () {
    console.log("test UX64World");

    let w1 = new UX64Word(0, 1);
    let w2 = new UX64Word(0, 2);
    let w3 = w1.and(w2);
    console.log("w3:", w3.toString())

    console.log("test UX64World");
};

test();