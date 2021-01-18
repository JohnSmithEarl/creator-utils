var StreamCipher = require("./helper_streamCipher");
var algo_rc4Drop = require("./algo_rc4Drop");

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
 */
let _RC4Drop = StreamCipher._createHelper(algo_rc4Drop);

var RC4Drop = {};
RC4Drop.encrypt = function (code, key, cfg) {
    let enStr = _RC4Drop.encrypt(code, key, cfg);
    return enStr;
};
RC4Drop.decrypt = function (code, key, cfg) {
    let deStr = _RC4Drop.decrypt(code, key, cfg);
    return deStr;
};

module.exports = RC4Drop;