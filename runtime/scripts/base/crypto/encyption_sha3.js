let algo_sha3 = require("./algo_sha3");
let Hasher = require("./core_hasher");

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA3('message');
 *     var hash = CryptoJS.SHA3(wordArray);
 */
let _SHA3 = Hasher._createHelper(algo_sha3);

var SHA3 = {};
SHA3.encrypt = function (code, key, cfg) {
    let enStr = _SHA3(code);
    return enStr;
};
SHA3.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = SHA3;