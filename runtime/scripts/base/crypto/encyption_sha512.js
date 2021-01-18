var algo_sha512 = require("./algo_sha512");
var Hasher = require("./core_hasher");

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
 *     var hash = CryptoJS.SHA512('message');
 *     var hash = CryptoJS.SHA512(wordArray);
 */
let _SHA512 = Hasher._createHelper(algo_sha512);

var SHA512 = {};
SHA512.encrypt = function (code, key, cfg) {
    let enStr = _SHA512(code, key, cfg);
    return enStr;
};
SHA512.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = SHA512;