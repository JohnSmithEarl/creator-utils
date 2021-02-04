import { UObject } from "./UObject";
import { UBufferedBlockAlgorithm } from "./UBufferedBlockAlgorithm";
import { UWordArray } from "./UWordArray";
import { UHMAC } from "../algorithm/UHMAC";

/**
 * Abstract hasher template.
 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
 */
export class UHasher extends UBufferedBlockAlgorithm {
    /**
     * Configuration options.
     */
    cfg: UObject = new UObject();
    blockSize: number = 512 / 32;

    /**
     * Initializes a newly created hasher.
     * @param {UObject} cfg (Optional) The configuration options to use for this hash computation.
     * @example
     *     var hasher = CryptoJS.algo.SHA256.create();
     */
    constructor(cfg?: UObject) {
        super(arguments);
        // Apply config defaults
        this.cfg = cfg && cfg.clone() || this.cfg.clone();

        // Set initial values
        this.reset();
    }

    // @interface
    _doReset(...arg: any[]) {
        return null;
    }

    // @interface
    _doFinalize(...arg: any[]): UWordArray {
        return null;
    }

    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *
     *     hasher.reset();
     */
    reset(): void {
        // Reset data buffer
        super.reset.call(this);

        // Perform concrete-hasher logic
        this._doReset();
    }

    /**
     * Updates this hasher with a message.
     * @param {UWordArray|string} messageUpdate The message to append.
     * @return {UHasher} This hasher.
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    update(messageUpdate: UWordArray | string): UHasher {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
    }

    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {UWordArray|string} messageUpdate (Optional) A final message update.
     * @return {UWordArray} The hash.
     * @example
     *
     *     var hash = hasher.finalize();
     *     var hash = hasher.finalize('message');
     *     var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate: UWordArray | string): UWordArray {
        // Final message update
        if (messageUpdate) {
            this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
    }

    /**
     * Creates a shortcut function to a hasher's object interface.
     * @param {<T extends UHasher>} hasherClass The hasher to create a helper for.
     * @return {Function} The shortcut function.
     * @static
     * @example
     *
     *     var SHA256 = UHasher._createHelper(USHA256);
     */
    _createHelper<T extends UHasher>(hasherClass: { new(...args: any[]): T; }): Function {
        return function (message: string, cfg: UObject) {
            return new hasherClass(cfg).finalize(message);
        };
    }

    /**
     * Creates a shortcut function to the HMAC's object interface.
     * @param {<T extends UHasher>} hasherClass The hasher to use in this HMAC helper.
     * @return {Function} The shortcut function.
     * @static
     * @example
     *     var HmacSHA256 = UHasher._createHmacHelper(SHA256);
     */
    _createHmacHelper<T extends UHasher>(hasherClass: { new(...args: any[]): T; }): Function {
        return function (message: string, key: string) {
            return new UHMAC(hasherClass, key).finalize(message);
        };
    }
}