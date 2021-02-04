import { Base } from "../core/Base";

/**
 * A collection of cipher parameters.
 *
 * @property {WordArray} ciphertext The raw ciphertext.
 * @property {WordArray} key The key to this ciphertext.
 * @property {WordArray} iv The IV used in the ciphering operation.
 * @property {WordArray} salt The salt used with a key derivation function.
 * @property {Cipher} algorithm The cipher algorithm.
 * @property {Mode} mode The block mode used in the ciphering operation.
 * @property {Padding} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
 */
export class CipherParams extends Base {
    formatter: any = null;
    ciphertext: any = null;
    salt: any = null;

    /**
     * Initializes a newly created cipher params object.
     * @param {Object} cipherParams An object with any of the possible cipher parameters.
     * @example
     *     var cipherParams = UCipherParams.create({
     *         ciphertext: ciphertextWordArray,
     *         key: keyWordArray,
     *         iv: ivWordArray,
     *         salt: saltWordArray,
     *         algorithm: CryptoJS.algo.AES,
     *         mode: CryptoJS.mode.CBC,
     *         padding: CryptoJS.pad.PKCS7,
     *         blockSize: 4,
     *         formatter: CryptoJS.format.OpenSSL
     *     });
     */
    constructor(cipherParams: Object) {
        super(arguments);
        this.merge(cipherParams);
    }

    /**
     * Converts this cipher params object to a string.
     * @param {Format} formatter (Optional) The formatting strategy to use.
     * @return {string} The stringified cipher params.
     * @throws Error If neither the formatter nor the default formatter is set.
     * @example
     *
     *     var string = cipherParams + '';
     *     var string = cipherParams.toString();
     *     var string = cipherParams.toString(UOpenSSL);
     */
    toString(formatter): string {
        return (formatter || this.formatter).stringify(this);
    }
}
