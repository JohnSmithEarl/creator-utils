import { UObject } from "./UObject";
import { UWordArray } from "./UWordArray";
import { UUtf8 } from "../encoder/UUtf8";

/**
 * Abstract buffered block algorithm template.
 *
 * The property blockSize must be implemented in a concrete subtype.
 *
 * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
 */
export class UBufferedBlockAlgorithm extends UObject {
    blockSize: number = 0;
    _minBufferSize: number = 0;
    _data: UWordArray = null;
    _nDataBytes: number = 0;

    // @interface
    _doProcessBlock(...args: any[]) {

    }

    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *
     *     bufferedBlockAlgorithm.reset();
     */
    reset() {
        // Initial values
        this._data = new UWordArray();
        this._nDataBytes = 0;
    }

    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {UWordArray|string} data The data to append. Strings are converted to a UWordArray using UTF-8.
     *
     * @example
     *
     *     bufferedBlockAlgorithm._append('data');
     *     bufferedBlockAlgorithm._append(wordArray);
     */
    _append(data: UWordArray | string) {
        // Convert string to UWordArray, else assume UWordArray already
        if (typeof data == 'string') {
            data = UUtf8.parse(data);
        }

        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
    }

    /**
     * Processes available data blocks.
     *
     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
     *
     * @return {UWordArray} The processed data.
     *
     * @example
     *
     *      let processedData = bufferedBlockAlgorithm._process();
     *      let processedData = bufferedBlockAlgorithm._process(!!'flush');
     */
    _process(doFlush?: boolean): UWordArray {
        let processedWords = null;

        // Shortcuts
        let data = this._data;
        let dataWords = data.words;
        let dataSigBytes = data.sigBytes;
        let blockSize = this.blockSize;
        let blockSizeBytes = blockSize * 4;

        // Count blocks ready
        let nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
            // Round up to include partial blocks
            nBlocksReady = Math.ceil(nBlocksReady);
        } else {
            // Round down to include only full blocks,
            // less the number of blocks that must remain in the buffer
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // Count words ready
        let nWordsReady = nBlocksReady * blockSize;

        // Count bytes ready
        let nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // Process blocks
        if (nWordsReady) {
            for (let offset = 0; offset < nWordsReady; offset += blockSize) {
                // Perform concrete-algorithm logic
                this._doProcessBlock(dataWords, offset);
            }

            // Remove processed words
            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
        }

        // Return processed words
        return new UWordArray(processedWords, nBytesReady);
    }

    /**
     * Creates a copy of this object.
     *
     * @return {UObject} The clone.
     *
     * @example
     *
     *      let clone = bufferedBlockAlgorithm.clone();
     */
    clone(): UObject {
        let clone: any = this.clone();
        clone._data = this._data.clone();

        return clone;
    }
};