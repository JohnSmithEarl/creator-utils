import { UObject } from "./UObject";
import { UHex } from "../encoder/UHex";

export class UWordArrayX32 extends UObject {
    /**
     * An array of 32-bit words.          作为“一段连续比特序列”的抽象进行各种位操作。
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    words: Array<number> = [];
    sigBytes: number = 0;

    /**
     * Initializes a newly created word array.
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} sigBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *
     *     let wordArray = UWordArrayX32()
     *     let wordArray = UWordArrayX32([0x00010203, 0x04050607]);
     *     let wordArray = UWordArrayX32([0x00010203, 0x04050607], 6);
     */
    constructor(words?: Array<number>, sigBytes?: number) {
        super(arguments);

        words = this.words = words || [];
        if (sigBytes != undefined) {
            this.sigBytes = sigBytes;
        } else {
            this.sigBytes = words.length * 4;
        }
        return this;
    }

    /**
     * Converts this word array to a string.
     * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: Hex
     * @return {string} The stringified word array.
     *
     * @example
     *
     *     let string = wordArray + '';
     *     let string = wordArray.toString();
     *     let string = wordArray.toString(Utf8);
     */
    toString(encoder: any = UHex): string {
        return super.toString(encoder);
    }

    /**
     * Concatenates a word array to this word array.
     * @param {UWordArrayX32} wordArray The word array to append.
     * @return {UWordArrayX32} This word array.
     * @example
     *     wordArray1.concat(wordArray2);
     */
    concat(wordArray: UWordArrayX32): UWordArrayX32 {
        // Shortcuts
        let thisWords = this.words;
        let thatWords = wordArray.words;
        let thisSigBytes = this.sigBytes;
        let thatSigBytes = wordArray.sigBytes;

        // Clamp excess bits
        this.clamp();

        // Concat
        if (thisSigBytes % 4) {
            // Copy one byte at a time
            for (let i = 0; i < thatSigBytes; i++) {
                let thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
            }
        } else {
            // Copy one word at a time
            for (let i = 0; i < thatSigBytes; i += 4) {
                thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
            }
        }
        this.sigBytes += thatSigBytes;

        // Chainable
        return this;
    }

    /**
     * Removes insignificant bits.
     * @example
     *     wordArray.clamp();
     */
    clamp() {
        // Shortcuts
        let words = this.words;
        let sigBytes = this.sigBytes;

        // Clamp
        words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
        words.length = Math.ceil(sigBytes / 4);
    }

    /**
     * Creates a word array filled with random bytes.
     * @param {number} nBytes The number of random bytes to generate.
     * @return {UWordArrayX32} The random word array.
     * @static
     * @example
     *     let wordArray =  UWordArrayX32.random(16);
     */
    random(nBytes: number): UWordArrayX32 {
        let words = [];

        let r = function (t_m_w) {
            let m_w = t_m_w;
            let m_z = 0x3ade68b1;
            let mask = 0xffffffff;

            return function () {
                m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                let result = ((m_z << 0x10) + m_w) & mask;
                result /= 0x100000000;
                result += 0.5;
                return result * (Math.random() > 0.5 ? 1 : -1);
            }
        };

        for (let i = 0, rcache; i < nBytes; i += 4) {
            let _r = r((rcache || Math.random()) * 0x100000000);

            rcache = _r() * 0x3ade67b7;
            words.push((_r() * 0x100000000) | 0);
        }

        return new UWordArrayX32(words, nBytes);
    }
};

import { UTest } from "./UTest";
UTest.test("UWordArrayX32", [() => {
    let wordArray1 = new UWordArrayX32([0x00010203, 0x04050607]);
    let wordArray2 = new UWordArrayX32([0x00010203, 0x04050607], 6);
    let str1 =  wordArray1.toString();
    let str2 =  wordArray2.toString();
    let val1 =  UHex.parse(str1);
    let val2 =  UHex.parse(str2);

    console.log("wordArray1:", wordArray1);
    console.log("wordArray2:", wordArray2);
    console.log("str1:", str1);
    console.log("str2:", str2);
    console.log("val1:", val1);
    console.log("val2:", val2);
}]);