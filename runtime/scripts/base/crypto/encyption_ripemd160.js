let algo_ripemd160 = require("./algo_ripemd160");
let Hasher = require("./core_hasher");

/**
 * Shortcut function to the hasher's object interface.
 * @param {WordArray|string} message The message to hash.
 * @return {WordArray} The hash.
 * @static
 * @example
 *
 *     var hash = CryptoJS.RIPEMD160('message');
 *     var hash = CryptoJS.RIPEMD160(wordArray);
 */
let _RIPEMD160 = Hasher._createHelper(algo_ripemd160);

var RIPEMD160 = {};
RIPEMD160.encrypt = function (code, key, cfg) {
    let enStr = _RIPEMD160(code);
    return enStr;
};
RIPEMD160.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = RIPEMD160;
