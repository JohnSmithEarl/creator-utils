import { EncoderLatin1 } from "./EncoderLatin1";
import { WordArray } from "../core/WordArray";

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
    static tringify(wordArray: WordArray): string {
        try {
            return decodeURIComponent(escape(EncoderLatin1.stringify(wordArray)));
        } catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    }

    /**
     * Converts a UTF-8 string to a word array.
     * @param {string} utf8Str The UTF-8 string.
     * @return {WordArray} The word array.
     * @static
     * @example
     *     let wordArray =  Utf8.parse(utf8String);
     */
    static parse(utf8Str: string): WordArray {
        return EncoderLatin1.parse(unescape(encodeURIComponent(utf8Str)));
    }
};