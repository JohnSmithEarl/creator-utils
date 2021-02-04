import { Base } from "../core/Base";
import { Cipher } from "./Cipher";

/**
 * Abstract base block cipher mode template.
 */
export class BlockCipherMode extends Base {
    _cipher: Cipher = null;
    _iv: Array<number> = null;

    /**
     * Initializes a newly created mode.
     *
     * @param {Cipher} cipher A block cipher instance.
     * @param {Array} iv The IV words.
     *
     * @example
     *
     *     var mode = ModeCBC.Encryptor.create(cipher, iv.words);
     */
    constructor(cipher?: Cipher, iv?: Array<number>) {
        super();
        this._cipher = cipher;
        this._iv = iv;
    }

    /**
     * Creates this mode for encryption.
     *
     * @param {Cipher} cipher A block cipher instance.
     * @param {Array} iv The IV words.
     *
     * @static
     *
     * @example
     *
     *     var mode = ModeCBC.createEncryptor(cipher, iv.words);
     */
    createEncryptor(cipher: Cipher, iv: Array<number>) {
        return this.Encryptor.create(cipher, iv);
    }

    /**
     * Creates this mode for decryption.
     *
     * @param {Cipher} cipher A block cipher instance.
     * @param {Array} iv The IV words.
     *
     * @static
     *
     * @example
     *
     *     var mode = ModeCBC.createDecryptor(cipher, iv.words);
     */
    createDecryptor(cipher: Cipher, iv: Array<number>) {
        return this.Decryptor.create(cipher, iv);
    }
};

module.exports = BlockCipherMode;