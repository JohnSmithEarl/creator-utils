import { WordArray } from "../core/WordArray";
import { CipherParams } from "./CipherParams";
import { EvpKDF } from "./EvpKDF";

/**
 * OpenSSL key derivation function.
 */
export class OpenSSLKdf {
    /**
     * Derives a key and IV from a password.
     *
     * @param {string} password The password to derive from.
     * @param {number} keySize The size in words of the key to generate.
     * @param {number} ivSize The size in words of the IV to generate.
     * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
     * @return {CipherParams} A cipher params object with the key, IV, and salt.
     * @static
     * @example
     *
     *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
     *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
     */
    execute(password: string, keySize: number, ivSize: number, salt: WordArray | string): CipherParams {
        // Generate random salt
        if (!salt) {
            salt = WordArray.random(64 / 8);
        }

        // Derive key and IV
        var key = new EvpKDF({
            keySize: keySize + ivSize
        }).compute(password, salt);

        // Separate key and IV
        var iv = new WordArray(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;

        // Return params
        return new CipherParams({
            key: key,
            iv: iv,
            salt: salt
        });
    }
};