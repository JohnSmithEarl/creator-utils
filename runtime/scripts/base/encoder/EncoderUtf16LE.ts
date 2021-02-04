import { WordArray } from "../core/WordArray";

/**
 * UTF-16 LE encoding strategy.
 */
export class EncoderUtf16LE {
    private static swapEndian(word: number): number {
        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
    }

    /**
     * Converts a word array to a UTF-16 LE string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The UTF-16 LE string.
     *
     * @static
     *
     * @example
     *
     *     let utf16Str = EncoderUtf16LE.stringify(wordArray);
     */
    static stringify(wordArray: WordArray): string {
        // Shortcuts
        let words = wordArray.words;
        let sigBytes = wordArray.sigBytes;

        // Convert
        let utf16Chars = [];
        for (let i = 0; i < sigBytes; i += 2) {
            let codePoint = EncoderUtf16LE.swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
            utf16Chars.push(String.fromCharCode(codePoint));
        }

        return utf16Chars.join('');
    }

    /**
     * Converts a UTF-16 LE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 LE string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     let wordArray = EncoderUtf16LE.parse(utf16Str);
     */
    static parse(utf16Str: string): WordArray {
        // Shortcut
        let utf16StrLength = utf16Str.length;

        // Convert
        let words = [];
        for (let i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= EncoderUtf16LE.swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
        }

        return new WordArray(words, utf16StrLength * 2);
    }
};