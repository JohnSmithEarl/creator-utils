import { CipherParams } from "../helper/CipherParams";
import { EncoderHex } from "../encoder/EncoderHex";

export class FormatHex {
    /**
     * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
     *
     * @param {CipherParams} cipherParams The cipher params object.
     *
     * @return {string} The hexadecimally encoded string.
     *
     * @static
     *
     * @example
     *
     *     let hexString = FormatHex.stringify(cipherParams);
     */
    static stringify(cipherParams: CipherParams): string {
        return cipherParams.ciphertext.toString(EncoderHex);
    }

    /**
     * Converts a hexadecimally encoded ciphertext string to a cipher params object.
     *
     * @param {string} input The hexadecimally encoded string.
     *
     * @return {CipherParams} The cipher params object.
     *
     * @static
     *
     * @example
     *
     *     let cipherParams = CryptoJS.format.Hex.parse(hexString);
     */
    static parse(input: string): CipherParams {
        let ciphertext = EncoderHex.parse(input);
        return new CipherParams({
            ciphertext: ciphertext
        });
    }
};