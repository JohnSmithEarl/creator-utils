import { UWordArrayX32 } from "../core/UWordArrayX32";

/**
 * Utf16 (Utf16BE) encoding strategy.
 */
export class UUtf16BE {
    /**
     * Converts a word array to a UTF-16 BE string.
     *
     * @param {UWordArrayX32} wordArray The word array.
     *
     * @return {string} The UTF-16 BE string.
     *
     * @static
     *
     * @example
     *
     *     var utf16String = UUtf16BE.stringify(wordArray);
     */
    static stringify(wordArray: UWordArrayX32): string {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
            var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
            utf16Chars.push(String.fromCharCode(codePoint));
        }

        return utf16Chars.join('');
    }

    /**
     * Converts a UTF-16 BE string to a word array.
     *
     * @param {string} utf16Str The UTF-16 BE string.
     *
     * @return {UWordArrayX32} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = UUtf16BE.parse(utf16String);
     */
    static parse(utf16Str: string): UWordArrayX32 {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
        }

        return new UWordArrayX32(words, utf16StrLength * 2);
    }
};