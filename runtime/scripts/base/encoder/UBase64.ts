import { UWordArray } from "../core/UWordArray";

let _map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function parseLoop(base64Str: string, base64StrLength: number, reverseMap: Array<number>) {
    var words = [];
    var nBytes = 0;
    for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
            nBytes++;
        }
    }
    return new UWordArray(words, nBytes);
}


/**
 * Base64 encoding strategy.
 */
export class Base64 {
    private static _reverseMap = [];

    /**
     * Converts a word array to a Base64 string.
     *
     * @param {UWordArray} wordArray The word array.
     *
     * @return {string} The Base64 string.
     *
     * @static
     *
     * @example
     *
     *     var base64String = Base64.stringify(wordArray);
     */
    static stringify(wordArray: UWordArray): string {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = _map;

        // Clamp excess bits
        wordArray.clamp();

        // Convert
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
            var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

            var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

            for (var j = 0;
                (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
            }
        }

        // Add padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
            while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
            }
        }

        return base64Chars.join('');
    }

    /**
     * Converts a Base64 string to a word array.
     * @param {string} base64Str The Base64 string.
     * @return {UWordArray} The word array.
     * @static
     * @example
     *
     *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
     */
    static parse(base64Str: string): UWordArray {
        // Shortcuts
        var base64StrLength = base64Str.length;
        var map = _map;
        var reverseMap = this._reverseMap;

        if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
            }
        }

        // Ignore padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
            }
        }

        // Convert
        return parseLoop(base64Str, base64StrLength, reverseMap);
    }
};

import { UTest } from "../core/UTest";
UTest.test("UBase64", [
    () => {
        let str = "hello, world!;;你好, 世界！";

    }
]);