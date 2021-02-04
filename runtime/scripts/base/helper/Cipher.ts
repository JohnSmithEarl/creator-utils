import { Base } from "../core/Base";
import { WordArray } from "../core/WordArray";
import { BufferedBlockAlgorithm } from "../core/BufferedBlockAlgorithm";
import { CipherParams } from "./CipherParams";
import { SerializableCipher } from "./SerializableCipher";
import { PasswordBasedCipher } from "./PasswordBasedCipher";

/**
 * Abstract base cipher template.
 *
 * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
 * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
 * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
 * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
 */
export class Cipher extends BufferedBlockAlgorithm {
    static readonly keySize = 128 / 32;
    static readonly ivSize = 128 / 32;
    static readonly _ENC_XFORM_MODE = 1;
    static readonly _DEC_XFORM_MODE = 2;

    /**
     * Configuration options.
     *
     * @property {WordArray} iv The IV to use for this operation.
     */
    cfg = new Base();
    _xformMode: number = 0;
    _key: WordArray = null;

    /**
     * Initializes a newly created cipher.
     *
     * @param {number} xformMode Either the encryption or decryption transormation mode constant.
     * @param {WordArray} key The key.
     * @param {Object} cfg (Optional) The configuration options to use for this operation.
     *
     * @example
     *
     *     var cipher = new AlgoAES(AlgoAES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
     */
    constructor(xformMode: number, key: WordArray, cfg: Object) {
        super();
        // Apply config defaults
        this.cfg = this.cfg.merge(cfg);

        // Store transform mode and key
        this._xformMode = xformMode;
        this._key = key;

        // Set initial values
        this.reset();
    }

    // @interface
    _doFinalize(): WordArray {
        return null;
    }

    // @interface
    _doReset(): void { }

    /**
     * Creates this cipher in encryption mode.
     *
     * @param {WordArray} key The key.
     * @param {Object} cfg (Optional) The configuration options to use for this operation.
     *
     * @return {Cipher} A cipher instance.
     *
     * @static
     *
     * @example
     *
     *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    createEncryptor(key: WordArray, cfg: Object): Cipher {
        return new Cipher(Cipher._ENC_XFORM_MODE, key, cfg);
    }

    /**
     * Creates this cipher in decryption mode.
     *
     * @param {WordArray} key The key.
     * @param {Object} cfg (Optional) The configuration options to use for this operation.
     *
     * @return {Cipher} A cipher instance.
     *
     * @static
     *
     * @example
     *
     *     var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    createDecryptor(key: WordArray, cfg: Object): Cipher {
        return new Cipher(Cipher._DEC_XFORM_MODE, key, cfg);
    }

    /**
     * Resets this cipher to its initial state.
     *
     * @example
     *
     *     cipher.reset();
     */
    reset(): void {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-cipher logic
        this._doReset();
    }

    /**
     * Adds data to be encrypted or decrypted.
     * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
     * @return {WordArray} The data after processing.
     * @example
     *
     *     var encrypted = cipher.process('data');
     *     var encrypted = cipher.process(wordArray);
     */
    process(dataUpdate: WordArray | string): WordArray {
        // Append
        this._append(dataUpdate);

        // Process available blocks
        return this._process();
    }

    /**
     * Finalizes the encryption or decryption process.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
     * @return {WordArray} The data after final processing.
     * @example
     *
     *     var encrypted = cipher.finalize();
     *     var encrypted = cipher.finalize('data');
     *     var encrypted = cipher.finalize(wordArray);
     */
    finalize(dataUpdate: WordArray | string): WordArray {
        // Final data update
        if (dataUpdate) {
            this._append(dataUpdate);
        }

        // Perform concrete-cipher logic
        var finalProcessedData = this._doFinalize();

        return finalProcessedData;
    }

    /**
     * Creates shortcut functions to a cipher's object interface.
     * @param {Cipher} cipher The cipher to create a helper for.
     * @return {Object} An object with encrypt and decrypt shortcut functions.
     * @static
     * @example
     *
     *     var AES = Cipher._createHelper(AlgoAES);
     */
    static _createHelper = (function () {
        function selectCipherStrategy(key: WordArray | string) {
            if (typeof key == 'string') {
                return PasswordBasedCipher;
            } else {
                return SerializableCipher;
            }
        }

        function creator<T extends Cipher>(cipher: T): { encrypt: Function, decrypt: Function } {
            return {
                encrypt: function (message: WordArray | string, key: WordArray & string, cfg: Object) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },

                decrypt: function (ciphertext: CipherParams | string, key: WordArray & string, cfg: Object) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
            };
        };

        return creator;
    }());
};