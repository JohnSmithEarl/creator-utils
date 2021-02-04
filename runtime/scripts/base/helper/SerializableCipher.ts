import { Base } from "../core/Base";
import { WordArray } from "../core/WordArray";
import { FormatterOpenSSL } from "../formatter/FormatterOpenSSL";
import { CipherParams } from "./CipherParams";
import { Cipher } from "./Cipher";

/**
 * A cipher wrapper that returns ciphertext as a serializable cipher params object.
 */
export class SerializableCipher extends Base {
    /**
     * Configuration options.
     *
     * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
     */
    static cfg: any = new Base({
        format: FormatterOpenSSL
    });

    /**
     * Encrypts a message.
     * @param {Cipher} cipher The cipher algorithm to use.
     * @param {WordArray|string} message The message to encrypt.
     * @param {WordArray} key The key.
     * @param {Object} cfg (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @static
     * @example
     *
     *      let ciphertextParams = SerializableCipher.encrypt(AlgoAES, message, key);
     *      let ciphertextParams = SerializableCipher.encrypt(AlgoAES, message, key, { iv: iv });
     *      let ciphertextParams = SerializableCipher.encrypt(AlgoAES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
     */
    static encrypt<T extends Cipher>(cipher: T, message: WordArray | string, key: WordArray, cfg: Object): CipherParams {
        // Apply config defaults
        cfg = this.cfg.merge(cfg);

        // Encrypt
        let encryptor = cipher.createEncryptor(key, cfg);
        let ciphertext = encryptor.finalize(message);

        // Shortcut
        let cipherCfg = encryptor.cfg;

        // Create and return serializable cipher params
        return new CipherParams({
            ciphertext: ciphertext,
            key: key,
            iv: cipherCfg.iv,
            algorithm: cipher,
            mode: cipherCfg.mode,
            padding: cipherCfg.padding,
            blockSize: cipher.blockSize,
            formatter: cfg.format
        });
    }

    /**
     * Decrypts serialized ciphertext.
     *
     * @param {Cipher} cipher The cipher algorithm to use.
     * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
     * @param {WordArray} key The key.
     * @param {Object} cfg (Optional) The configuration options to use for this operation.
     * @return {WordArray} The plaintext.
     * @static
     * @example
     *
     *      let plaintext = SerializableCipher.decrypt(AlgoAES, formattedCiphertext, key, { iv: iv, format: formatterOpenSSL });
     *      let plaintext = SerializableCipher.decrypt(AlgoAES, ciphertextParams, key, { iv: iv, format: formatterOpenSSL });
     */
    static decrypt(cipher: Cipher, ciphertext: CipherParams | string, key: WordArray, cfg: Object): WordArray {
        // Apply config defaults
        cfg = this.cfg.merge(cfg);

        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // Decrypt
        let plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

        return plaintext;
    }

    /**
     * Converts serialized ciphertext to CipherParams,
     * else assumed CipherParams already and returns ciphertext unchanged.
     * @param {CipherParams|string} ciphertext The ciphertext.
     * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
     * @return {CipherParams} The unserialized ciphertext.
     * @static
     * @example
     *
     *      let ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
     */
    static _parse(ciphertext: CipherParams | string, format: any): CipherParams {
        if (typeof ciphertext == 'string') {
            return format.parse(ciphertext, this);
        } else {
            return ciphertext;
        }
    }
}