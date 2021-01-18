let BlockCipherMode = require("./helper_blockCipherMode");

/**
 * Electronic Codebook block mode.
 */
var ECB = (function () {
    var ECB = BlockCipherMode.extend();

    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });

    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });

    return ECB;
}());


module.exports = ECB;