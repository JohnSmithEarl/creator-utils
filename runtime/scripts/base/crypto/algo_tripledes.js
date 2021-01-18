var BlockCipher = require("./helper_blockCipher");
var algo_des = require("./algo_des");

/**
 * Triple-DES block cipher algorithm.
 */
var TripleDES = BlockCipher.extend({
    _doReset: function () {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;

        // Create algo_des instances
        this._des1 = algo_des.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
        this._des2 = algo_des.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
        this._des3 = algo_des.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
    },

    encryptBlock: function (M, offset) {
        this._des1.encryptBlock(M, offset);
        this._des2.decryptBlock(M, offset);
        this._des3.encryptBlock(M, offset);
    },

    decryptBlock: function (M, offset) {
        this._des3.decryptBlock(M, offset);
        this._des2.encryptBlock(M, offset);
        this._des1.decryptBlock(M, offset);
    },

    keySize: 192 / 32,

    ivSize: 64 / 32,

    blockSize: 64 / 32
});

module.exports = TripleDES;