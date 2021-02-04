import { Base } from "../core/Base";
import { Hasher } from "../core/Hasher";
import { WordArray } from "../core/WordArray";
import { EncoderUtf8 } from "../encoder/EncoderUtf8";

/**
 * AlgoHMAC algorithm.
 */
export class AlgoHMAC<T extends Hasher> extends Base {
    _hasher: T = null;
    _oKey: WordArray = null;
    _iKey: WordArray = null;

    /**
     * Initializes a newly created AlgoHMAC.
     *
     * @param {<T extends Hasher>} hasherClass The hash algorithm to use.
     * @param {WordArray|string} key The secret key.
     *
     * @example
     *
     *     let hmacHasher = AlgoHMAC.create(USHA256, key);
     */
    constructor(hasherClass: { new(...args: any[]): T; }, key: WordArray | string) {
        super(arguments);

        // Init hasher
        let hasherIns = this._hasher = new hasherClass();

        // Convert string to WordArray, else assume WordArray already
        if (typeof key == 'string') {
            key = EncoderUtf8.parse(key);
        }

        // Shortcuts
        let hasherBlockSize = hasherIns.blockSize;
        let hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasherIns.finalize(key);
        }

        // Clamp excess bits
        key = <WordArray>key;
        key.clamp();

        // Clone key for inner and outer pads
        let oKey = this._oKey = key.clone();
        let iKey = this._iKey = key.clone();

        // Shortcuts
        let oKeyWords = oKey.words;
        let iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (let i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
    }

    /**
     * Resets this AlgoHMAC to its initial state.
     * @example
     *
     *     hmacHasher.reset();
     */
    reset() {
        // Shortcut
        let hasher = this._hasher;

        // Reset
        hasher.reset();
        hasher.update(this._iKey);
    }

    /**
     * Updates this AlgoHMAC with a message.
     * @param {WordArray|string} messageUpdate The message to append.
     * @return {AlgoHMAC} This AlgoHMAC instance.
     *
     * @example
     *
     *     hmacHasher.update('message');
     *     hmacHasher.update(wordArray);
     */
    update(messageUpdate: WordArray | string): AlgoHMAC<T> {
        this._hasher.update(messageUpdate);

        // Chainable
        return this;
    }

    /**
     * Finalizes the AlgoHMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     * @return {WordArray} The AlgoHMAC.
     * @example
     *
     *     let hmac = hmacHasher.finalize();
     *     let hmac = hmacHasher.finalize('message');
     *     let hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate: WordArray | string): WordArray {
        // Shortcut
        let hasher = this._hasher;

        // Compute AlgoHMAC
        let innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        let hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

        return hmac;
    }
};