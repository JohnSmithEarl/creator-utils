import { ULatin1 } from "./ULatin1";
import { UWordArray } from "../core/UWordArray";

/**
 * UTF-8 encoding strategy.
 */
export class UUtf8 {
    /**
     * Converts a word array to a UTF-8 string.
     * @param {UWordArray} wordArray The word array.
     * @return {string} The UTF-8 string.
     * @static
     * @example
     *     var utf8String =  Utf8.stringify(wordArray);
     */
    static tringify(wordArray: UWordArray): string {
        try {
            return decodeURIComponent(escape(ULatin1.stringify(wordArray)));
        } catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    }

    /**
     * Converts a UTF-8 string to a word array.
     * @param {string} utf8Str The UTF-8 string.
     * @return {UWordArray} The word array.
     * @static
     * @example
     *     var wordArray =  Utf8.parse(utf8String);
     */
    static parse(utf8Str: string): UWordArray {
        return ULatin1.parse(unescape(encodeURIComponent(utf8Str)));
    }
};