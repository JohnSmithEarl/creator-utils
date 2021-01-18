let algo_rabbit = require("./algo_rabbit");
let StreamCipher = require("./helper_streamCipher");

/**
 * Shortcut functions to the cipher's object interface.
 * @example
 *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
 */
let _Rabbit = StreamCipher._createHelper(algo_rabbit);

var Rabbit = {};
Rabbit.encrypt = function (code, key, cfg) {
    let enStr = _Rabbit.encrypt(code, key, cfg);
    return enStr;
};
Rabbit.decrypt = function (code, key, cfg) {
    let deStr = _Rabbit.decrypt(code, key, cfg);
    return deStr;
};

module.exports = Rabbit;
