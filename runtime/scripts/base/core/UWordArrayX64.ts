import { UObject } from "./UObject";
import { UWordX64 } from "./UWordX64";
import { UWordArrayX32 } from "./UWordArrayX32";

export class UWordArrayX64 extends UObject {
    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of UWordX64 objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    words: Array<UWordX64> = null;
    sigBytes: number = 0;

    /**
     * Initializes a newly created word array.
     *
     * @param {Array} words (Optional) An array of UWordX64 objects.
     * @param {number} sigBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *
     *     let wordArray = UWordArrayX64.create();
     *
     *     let wordArray = UWordArrayX64.create([
     *         UWordX64.create(0x00010203, 0x04050607),
     *         UWordX64.create(0x18191a1b, 0x1c1d1e1f)
     *     ]);
     *
     *     let wordArray = UWordArrayX64.create([
     *         UWordX64.create(0x00010203, 0x04050607),
     *         UWordX64.create(0x18191a1b, 0x1c1d1e1f)
     *     ], 10);
     */
    constructor(words: Array<UWordX64>, sigBytes: number) {
        super(arguments);

        this.words = words || [];
        if (sigBytes != undefined) {
            this.sigBytes = sigBytes;
        } else {
            this.sigBytes = words.length * 8;
        }
        return this;
    }

    /**
     * Converts this 64-bit word array to a 32-bit word array.
     *
     * @return {UWordArrayX32} This word array's data as a 32-bit word array.
     *
     * @example
     *
     *     let x32WordArray = x64WordArray.toX32();
     */
    toX32(): UWordArrayX32 {
        // Shortcuts
        let x64Words = this.words;
        let x64WordsLength = x64Words.length;

        // Convert
        let x32Words = [];
        for (let i = 0; i < x64WordsLength; i++) {
            let x64Word: UWordX64 = x64Words[i];
            x32Words.push(x64Word.high);
            x32Words.push(x64Word.low);
        }

        return new UWordArrayX32(x32Words, this.sigBytes);
    }

    /**
     * Creates a copy of this word array.
     *
     * @return {UWordArrayX64} The clone.
     *
     * @example
     *
     *     let clone = x64WordArray.clone();
     */
    clone(): UWordArrayX64 {
        let clone = super.clone.call(this);

        // Clone "words" array
        let words = clone.words = this.words.slice(0);

        // Clone each X64Word object
        let wordsLength = words.length;
        for (let i = 0; i < wordsLength; i++) {
            words[i] = words[i].clone();
        }

        return clone;
    }
};