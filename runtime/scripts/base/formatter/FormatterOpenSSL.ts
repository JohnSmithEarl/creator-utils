import { WordArray } from "../core/WordArray";
import { EncoderBase64 } from "../encoder/EncoderBase64";
import { CipherParams } from "../helper/CipherParams";


/**
 * OpenSSL formatting strategy.
 */
export class FormatterOpenSSL {
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     * @param {CipherParams} cipherParams The cipher params object.
     * @return {string} The OpenSSL-compatible string.
     * @static
     * @example
     *     let  openSSLString = FormatterOpenSSL.stringify(cipherParams);
     */
    stringify(cipherParams: CipherParams): string {
        let wordArray: WordArray = null;

        // Shortcuts
        let ciphertext = cipherParams.ciphertext;
        let salt = cipherParams.salt;

        // Format
        if (salt) {
            wordArray = new WordArray([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
        } else {
            wordArray = ciphertext;
        }

        return wordArray.toString(EncoderBase64);
    }

    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     * @param {string} openSSLStr The OpenSSL-compatible string.
     * @return {CipherParams} The cipher params object.
     * @static
     * @example
     *
     *     let  cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
     */
    parse(openSSLStr: string): CipherParams {
        let salt: WordArray = null;

        // Parse base64
        let ciphertext = EncoderBase64.parse(openSSLStr);

        // Shortcut
        let ciphertextWords = ciphertext.words;

        // Test for salt
        if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
            // Extract salt
            salt = new WordArray(ciphertextWords.slice(2, 4));

            // Remove salt from ciphertext
            ciphertextWords.splice(0, 4);
            ciphertext.sigBytes -= 16;
        }

        return new CipherParams({
            ciphertext: ciphertext,
            salt: salt
        });
    }
};