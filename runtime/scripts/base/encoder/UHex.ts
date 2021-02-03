import { UWordArrayX32 } from "../core/UWordArrayX32";

/**
 * Hex encoding strategy.
 */
export class UHex {
    /**
     * Converts a word array to a hex string.
     * @param {UWordArrayX32} wordArray The word array.
     * @return {string} The hex string.
     * @static
     * @example
     *
     *     var hexString =  Hex.stringify(wordArray);
     */
    stringify(wordArray: UWordArrayX32): string {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
            var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
        }

        return hexChars.join('');
    }

    /**
     * Converts a hex string to a word array.
     * @param {string} hexStr The hex string.
     * @return {UWordArrayX32} The word array.
     * @static
     * @example
     *
     *     var wordArray =  Hex.parse(hexString);
     */
    parse(hexStr: string): UWordArrayX32 {
        // Shortcut
        var hexStrLength = hexStr.length;

        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }

        return new UWordArrayX32().init(words, hexStrLength / 2);
    }
};
