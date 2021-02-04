// let BlockCipherMode = require("./helper_blockCipherMode");
import { BlockCipherMode } from "../helper/BlockCipherMode";

function xorBlock(words: Array<any>, offset: number, blockSize: number) {
    let block;

    // Shortcut
    let iv = this._iv;

    // Choose mixing block
    if (iv) {
        block = iv;

        // Remove IV for subsequent blocks
        this._iv = undefined;
    } else {
        block = this._prevBlock;
    }

    // XOR blocks
    for (let i = 0; i < blockSize; i++) {
        words[offset + i] ^= block[i];
    }
}


/**
 * Cipher Block Chaining mode.
 *
 * Abstract base ModeCBC mode.
 * */
export class ModeCBC {

    /**
     * CBC encryptor.
     */
    Encryptor: Function = new BlockCipherMode().merge({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock(words: Array<any>, offset: number) {
            // Shortcuts
            let cipher = this._cipher;
            let blockSize = cipher.blockSize;

            // XOR and encrypt
            xorBlock.call(this, words, offset, blockSize);
            cipher.encryptBlock(words, offset);

            // Remember this block to use with next block
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });

    /**
     * CBC decryptor.
     */
    Decryptor: Function = new BlockCipherMode().merge({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock(words: Array<number>, offset: number) {
            // Shortcuts
            let cipher = this._cipher;
            let blockSize = cipher.blockSize;

            // Remember this block to use with next block
            let thisBlock = words.slice(offset, offset + blockSize);

            // Decrypt and XOR
            cipher.decryptBlock(words, offset);
            xorBlock.call(this, words, offset, blockSize);

            // This block becomes the previous block
            this._prevBlock = thisBlock;
        }
    });
};