var WordArray = require("./core_x32_wordArray");
var algo_sha256 = require("./algo_sha256");

/**
 * SHA-224 hash algorithm.
 */
var SHA224 = algo_sha256.extend({
    _doReset: function () {
        this._hash = new WordArray.init([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
    },

    _doFinalize: function () {
        var hash = algo_sha256._doFinalize.call(this);

        hash.sigBytes -= 4;

        return hash;
    }
});

module.exports = SHA224;