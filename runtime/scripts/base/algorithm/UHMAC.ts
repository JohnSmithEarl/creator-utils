import { UObject } from "../core/UObject";
import { UHasher } from "../core/UHasher";
import { UWordArray } from "../core/UWordArray";
import { UUtf8 } from "../encoder/UUtf8";

/**
 * HMAC algorithm.
 */
export class UHMAC<T extends UHasher> extends UObject {
    _hasher: T = null;
    _oKey: UWordArray = null;
    _iKey: UWordArray = null;

    /**
     * Initializes a newly created HMAC.
     *
     * @param {<T extends UHasher>} hasherClass The hash algorithm to use.
     * @param {UWordArray|string} key The secret key.
     *
     * @example
     *
     *     var hmacHasher = UHMAC.create(USHA256, key);
     */
    constructor(hasherClass: { new(...args: any[]): T; }, key: UWordArray | string) {
        super(arguments);

        // Init hasher
        let hasherIns = this._hasher = new hasherClass();

        // Convert string to UWordArray, else assume UWordArray already
        if (typeof key == 'string') {
            key = UUtf8.parse(key);
        }

        // Shortcuts
        var hasherBlockSize = hasherIns.blockSize;
        var hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasherIns.finalize(key);
        }

        // Clamp excess bits
        key = <UWordArray>key;
        key.clamp();

        // Clone key for inner and outer pads
        var oKey = this._oKey = key.clone();
        var iKey = this._iKey = key.clone();

        // Shortcuts
        var oKeyWords = oKey.words;
        var iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (var i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
    }

    /**
     * Resets this HMAC to its initial state.
     * @example
     *
     *     hmacHasher.reset();
     */
    reset() {
        // Shortcut
        var hasher = this._hasher;

        // Reset
        hasher.reset();
        hasher.update(this._iKey);
    }

    /**
     * Updates this HMAC with a message.
     * @param {UWordArray|string} messageUpdate The message to append.
     * @return {HMAC} This HMAC instance.
     *
     * @example
     *
     *     hmacHasher.update('message');
     *     hmacHasher.update(wordArray);
     */
    update(messageUpdate: UWordArray | string): UHMAC<T> {
        this._hasher.update(messageUpdate);

        // Chainable
        return this;
    }

    /**
     * Finalizes the HMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {UWordArray|string} messageUpdate (Optional) A final message update.
     * @return {UWordArray} The HMAC.
     * @example
     *
     *     var hmac = hmacHasher.finalize();
     *     var hmac = hmacHasher.finalize('message');
     *     var hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate: UWordArray | string): UWordArray {
        // Shortcut
        var hasher = this._hasher;

        // Compute HMAC
        var innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

        return hmac;
    }
};