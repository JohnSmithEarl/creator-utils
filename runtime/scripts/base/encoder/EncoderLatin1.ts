import { WordArray } from "../core/WordArray";

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
    static stringify(wordArray: WordArray): string {
        // Shortcuts
        let words = wordArray.words;
        let sigBytes = wordArray.sigBytes;

        // Convert
        let latin1Chars = [];
        for (let i = 0; i < sigBytes; i++) {
            let bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
        }

        return latin1Chars.join('');
    }

    /**
     * Converts a Latin1 string to a word array.
     * @param {string} latin1Str The Latin1 string.
     * @return {WordArray} The word array.
     * @static
     * @example
     *
     *     let wordArray =  Latin1.parse(latin1String);
     */
    static parse(latin1Str: string): WordArray {
        // Shortcut
        let latin1StrLength = latin1Str.length;

        // Convert
        let words = [];
        for (let i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }

        return new WordArray(words, latin1StrLength);
    }
};