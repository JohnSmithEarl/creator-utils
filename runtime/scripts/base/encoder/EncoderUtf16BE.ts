import { WordArray } from "../core/WordArray";

/**
 * Utf16 (Utf16BE) encoding strategy.
 */
export class EncoderUtf16BE {
    /**
     * Converts a word array to a UTF-16 BE string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The UTF-16 BE string.
     *
     * @static
     *
     * @example
     *
     *     let utf16String = UUtf16BE.stringify(wordArray);
     */
    static stringify(wordArray: WordArray): string {
        // Shortcuts
        let words = wordArray.words;
        let sigBytes = wordArray.sigBytes;

        // Convert
        let utf16Chars = [];
        for (let i = 0; i < sigBytes; i += 2) {
            let codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
            utf16Chars.push(String.fromCharCode(codePoint));
        }

        return utf16Chars.join('');
    }

    /**
     * Converts a UTF-16 BE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 BE string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     let wordArray = UUtf16BE.parse(utf16String);
     */
    static parse(utf16Str: string): WordArray {
        // Shortcut
        let utf16StrLength = utf16Str.length;

        // Convert
        let words = [];
        for (let i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
        }

        return new WordArray(words, utf16StrLength * 2);
    }
};