import { Base } from "../core/Base";
import { WordArray } from "../core/WordArray";
import { AlgoMD5 } from "../algo/AlgoMD5";
import { T } from "ts-toolbelt";

/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * www.openssl.org/docs/crypto/EVP_BytesToKey.html
 */
export class EvpKDF extends Base {
    /**
     * Configuration options.
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hash algorithm to use. Default: MD5
     * @property {number} iterations The number of iterations to perform. Default: 1
     */
    cfg: any = new Base({
        hasher: AlgoMD5,
        keySize: 128 / 32,
        iterations: 1
    });

    /**
     * Initializes a newly created key derivation function.
     * @param {Object} cfg (Optional) The configuration options to use for the derivation.
     * @example
     *
     *      let kdf = EvpKDF();
     *      let kdf = EvpKDF({ keySize: 8 });
     *      let kdf = EvpKDF({ keySize: 8, iterations: 1000 });
     */
    constructor(cfg: Object) {
        super(cfg);
        this.cfg = this.cfg.merge(cfg);
    }

    /**
     * Derives a key from a password.
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @return {WordArray} The derived key.
     *
     * @example
     *
     *      let key = kdf.compute(password, salt);
     */
    compute(password: WordArray | string, salt: WordArray | string): WordArray {
        let block;

        // Shortcut
        let cfg = this.cfg;

        // Init hasher
        let hasher = new cfg.hasher();

        // Initial values
        let derivedKey = new WordArray();

        // Shortcuts
        let derivedKeyWords = derivedKey.words;
        let keySize = cfg.keySize;
        let iterations = cfg.iterations;

        // Generate key
        while (derivedKeyWords.length < keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();

            // Iterations
            for (let i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }

            derivedKey.concat(block);
        }
        derivedKey.sigBytes = keySize * 4;

        return derivedKey;
    }
}

// /**
//  * Derives a key from a password.
//  * @param {WordArray|string} password The password.
//  * @param {WordArray|string} salt A salt.
//  * @param {Object} cfg (Optional) The configuration options to use for this computation.
//  * @return {WordArray} The derived key.
//  * @static
//  *
//  * @example
//  *
//  *      let key = EvpKDF(password, salt);
//  *      let key = EvpKDF(password, salt, { keySize: 8 });
//  *      let key = EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
//  */
// let _EvpKDF = function (password, salt, cfg) {
//     return EvpKDF(cfg).compute(password, salt);
// };