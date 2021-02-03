import { ULatin1 } from "./ULatin1";
import { UWordArrayX32 } from "../core/UWordArrayX32";

/**
 * UTF-8 encoding strategy.
 */
export class Utf8 {
    /**
     * Converts a word array to a UTF-8 string.
     * @param {UWordArrayX32} wordArray The word array.
     * @return {string} The UTF-8 string.
     * @static
     * @example
     *     var utf8String =  Utf8.stringify(wordArray);
     */
    static tringify(wordArray: UWordArrayX32): string {
        try {
            return decodeURIComponent(escape(ULatin1.stringify(wordArray)));
        } catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    }

    /**
     * Converts a UTF-8 string to a word array.
     * @param {string} utf8Str The UTF-8 string.
     * @return {UWordArrayX32} The word array.
     * @static
     * @example
     *     var wordArray =  Utf8.parse(utf8String);
     */
    static parse(utf8Str: string): UWordArrayX32 {
        return ULatin1.parse(unescape(encodeURIComponent(utf8Str)));
    }
};