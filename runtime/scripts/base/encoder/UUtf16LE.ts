import { UWordArray } from "../core/UWordArray";

/**
 * UTF-16 LE encoding strategy.
 */
export class UUtf16LE {
    private static swapEndian(word: number): number {
        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
    }

    /**
     * Converts a word array to a UTF-16 LE string.
     *
     * @param {UWordArray} wordArray The word array.
     *
     * @return {string} The UTF-16 LE string.
     *
     * @static
     *
     * @example
     *
     *     var utf16Str = UUtf16LE.stringify(wordArray);
     */
    static stringify(wordArray: UWordArray): string {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
            var codePoint = UUtf16LE.swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
            utf16Chars.push(String.fromCharCode(codePoint));
        }

        return utf16Chars.join('');
    }

    /**
     * Converts a UTF-16 LE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 LE string.
     *
     * @return {UWordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = UUtf16LE.parse(utf16Str);
     */
    static parse(utf16Str: string): UWordArray {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= UUtf16LE.swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
        }

        return new UWordArray(words, utf16StrLength * 2);
    }
};