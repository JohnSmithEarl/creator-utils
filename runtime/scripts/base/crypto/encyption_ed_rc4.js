var StreamCipher = require("./helper_streamCipher");
var algo_rc4  = require("./algo_rc4");

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
 */
let _RC4 = StreamCipher._createHelper(algo_rc4);

var RC4 = {};
RC4.encrypt = function (code, key, cfg) {
    let enStr = _RC4.encrypt(code, key, cfg);
    return enStr;
};
RC4.decrypt = function (code, key, cfg) {
    let deStr = _RC4.decrypt(code, key, cfg);
    return deStr;
};

module.exports = RC4;