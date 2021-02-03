import { UWordArrayX32 } from "../core/UWordArrayX32";

/**
 * Latin1 encoding strategy.
 */
export class ULatin1 {
    /**
     * Converts a word array to a Latin1 string.
     * @param {UWordArrayX32} wordArray The word array.
     * @return {string} The Latin1 string.
     * @static
     * @example
     *     var latin1String =  Latin1.stringify(wordArray);
     */
    static stringify(wordArray: UWordArrayX32): string {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
            var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
        }

        return latin1Chars.join('');
    }

    /**
     * Converts a Latin1 string to a word array.
     * @param {string} latin1Str The Latin1 string.
     * @return {UWordArrayX32} The word array.
     * @static
     * @example
     *
     *     var wordArray =  Latin1.parse(latin1String);
     */
    static parse(latin1Str: string): UWordArrayX32 {
        // Shortcut
        var latin1StrLength = latin1Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }

        return new UWordArrayX32(words, latin1StrLength);
    }
};