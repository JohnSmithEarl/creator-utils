import { Base } from "./Base";
import { BufferedBlockAlgorithm } from "./BufferedBlockAlgorithm";
import { WordArray } from "./WordArray";
import { AlgoHMAC } from "../algo/AlgoHMAC";

/**
 * Abstract hasher template.
 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
 */
export class Hasher extends BufferedBlockAlgorithm {
    /**
     * Configuration options.
     */
    cfg: Base = new Base();
    blockSize: number = 512 / 32;

    /**
     * Initializes a newly created hasher.
     * @param {Base} cfg (Optional) The configuration options to use for this hash computation.
     * @example
     *     var hasher = CryptoJS.algo.SHA256.create();
     */
    constructor(cfg?: Base) {
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
    _doFinalize(...arg: any[]): WordArray {
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
     * @param {WordArray|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    update(messageUpdate: WordArray | string): Hasher {
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
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     * @return {WordArray} The hash.
     * @example
     *
     *     var hash = hasher.finalize();
     *     var hash = hasher.finalize('message');
     *     var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate: WordArray | string): WordArray {
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
     * @param {<T extends Hasher>} hasherClass The hasher to create a helper for.
     * @return {Function} The shortcut function.
     * @static
     * @example
     *
     *     var SHA256 = Hasher._createHelper(USHA256);
     */
    _createHelper<T extends Hasher>(hasherClass: { new(...args: any[]): T; }): Function {
        return function (message: string, cfg: Base) {
            return new hasherClass(cfg).finalize(message);
        };
    }

    /**
     * Creates a shortcut function to the AlgoHMAC's object interface.
     * @param {<T extends Hasher>} hasherClass The hasher to use in this AlgoHMAC helper.
     * @return {Function} The shortcut function.
     * @static
     * @example
     *     var HmacSHA256 = Hasher._createHmacHelper(SHA256);
     */
    _createHmacHelper<T extends Hasher>(hasherClass: { new(...args: any[]): T; }): Function {
        return function (message: string, key: string) {
            return new AlgoHMAC(hasherClass, key).finalize(message);
        };
    }
}