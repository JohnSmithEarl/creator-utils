declare module "base/core/Test" {
    export class Test {
        static test(title: string, execFuncs: Array<Function>): void;
    }
}
declare module "base/core/Base" {
    /**
     * 基础对象
     */
    export class Base {
        static isInherited(childInstance: any, parentClass: any): boolean;
        static keys(obj: any): Array<string>;
        static values(obj: any): Array<any>;
        static deepCopy(obj: any): any;
        static merge(to: any, from: any): void;
        constructor(...args: any[]);
        isInherited(parentClass: any): boolean;
        keys(): Array<string>;
        values(): Array<any>;
        deepCopy(): any;
        clone(): any;
        merge(from: any): void;
        toString(encoder?: any): string;
    }
}
declare module "base/encoder/EncoderHex" {
    import { WordArray } from "base/core/WordArray";
    /**
     * Hex encoding strategy.
     */
    export class EncoderHex {
        /**
         * Converts a word array to a hex string.
         * @param {WordArray} wordArray The word array.
         * @return {string} The hex string.
         * @static
         * @example
         *
         *     let hexString =  Hex.stringify(wordArray);
         */
        static stringify(wordArray: WordArray): string;
        /**
         * Converts a hex string to a word array.
         * @param {string} hexStr The hex string.
         * @return {WordArray} The word array.
         * @static
         * @example
         *
         *     let wordArray =  Hex.parse(hexString);
         */
        static parse(hexStr: string): WordArray;
    }
}
declare module "base/core/WordArray" {
    import { Base } from "base/core/Base";
    export class WordArray extends Base {
        /**
         * An array of 32-bit words.          作为“一段连续比特序列”的抽象进行各种位操作。
         * @property {Array} words The array of 32-bit words.
         * @property {number} sigBytes The number of significant bytes in this word array.
         */
        words: Array<number>;
        sigBytes: number;
        /**
         * Initializes a newly created word array.
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     let wordArray = UWordArray()
         *     let wordArray = UWordArray([0x00010203, 0x04050607]);
         *     let wordArray = UWordArray([0x00010203, 0x04050607], 6);
         */
        constructor(words?: Array<number>, sigBytes?: number);
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
        toString(encoder?: any): string;
        /**
         * Concatenates a word array to this word array.
         * @param {UWordArray} wordArray The word array to append.
         * @return {UWordArray} This word array.
         * @example
         *     wordArray1.concat(wordArray2);
         */
        concat(wordArray: WordArray): WordArray;
        /**
         * Removes insignificant bits.
         * @example
         *     wordArray.clamp();
         */
        clamp(): void;
        /**
         * Creates a word array filled with random bytes.
         * @param {number} nBytes The number of random bytes to generate.
         * @return {UWordArray} The random word array.
         * @static
         * @example
         *     let wordArray =  UWordArray.random(16);
         */
        random(nBytes: number): WordArray;
    }
}
declare module "base/encoder/EncoderBase64" {
    import { WordArray } from "base/core/WordArray";
    /**
     * Base64 encoding strategy.
     */
    export class EncoderBase64 {
        private static _reverseMap;
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     let base64String = Base64.stringify(wordArray);
         */
        static stringify(wordArray: WordArray): string;
        /**
         * Converts a Base64 string to a word array.
         * @param {string} base64Str The Base64 string.
         * @return {WordArray} The word array.
         * @static
         * @example
         *
         *     let wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        static parse(base64Str: string): WordArray;
    }
}
declare module "base/encoder/EncoderLatin1" {
    import { WordArray } from "base/core/WordArray";
    /**
     * Latin1 encoding strategy.
     */
    export class EncoderLatin1 {
        /**
         * Converts a word array to a Latin1 string.
         * @param {WordArray} wordArray The word array.
         * @return {string} The Latin1 string.
         * @static
         * @example
         *     let latin1String =  Latin1.stringify(wordArray);
         */
        static stringify(wordArray: WordArray): string;
        /**
         * Converts a Latin1 string to a word array.
         * @param {string} latin1Str The Latin1 string.
         * @return {WordArray} The word array.
         * @static
         * @example
         *
         *     let wordArray =  Latin1.parse(latin1String);
         */
        static parse(latin1Str: string): WordArray;
    }
}
declare module "base/encoder/EncoderUtf8" {
    import { WordArray } from "base/core/WordArray";
    /**
     * UTF-8 encoding strategy.
     */
    export class EncoderUtf8 {
        /**
         * Converts a word array to a UTF-8 string.
         * @param {WordArray} wordArray The word array.
         * @return {string} The UTF-8 string.
         * @static
         * @example
         *     let utf8String =  Utf8.stringify(wordArray);
         */
        static tringify(wordArray: WordArray): string;
        /**
         * Converts a UTF-8 string to a word array.
         * @param {string} utf8Str The UTF-8 string.
         * @return {WordArray} The word array.
         * @static
         * @example
         *     let wordArray =  Utf8.parse(utf8String);
         */
        static parse(utf8Str: string): WordArray;
    }
}
declare module "cu.All" {
    export * from "base/encoder/EncoderBase64";
    export * from "base/encoder/EncoderUtf8";
}
