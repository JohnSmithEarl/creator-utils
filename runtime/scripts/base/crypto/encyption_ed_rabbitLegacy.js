let StreamCipher = require("./helper_streamCipher");
let algo_rabbitLegacy = require("./algo_rabbitLegacy");

/**
 * Shortcut functions to the cipher's object interface.
 * @example
 *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
 */
let _RabbitLegacy = StreamCipher._createHelper(algo_rabbitLegacy);

var RabbitLegacy = {};
RabbitLegacy.encrypt = function (code, key, cfg) {
    let enStr = _RabbitLegacy.encrypt(code, key, cfg);
    return enStr;
};
RabbitLegacy.decrypt = function (code, key, cfg) {
    let deStr = _RabbitLegacy.decrypt(code, key, cfg);
    return deStr;
};

module.exports = RabbitLegacy;