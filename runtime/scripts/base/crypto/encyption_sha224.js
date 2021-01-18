var algo_sha224 = require("./algo_sha224");
var algo_sha256 = require("./algo_sha256");

/**
 * Shortcut function to the hasher's object interface.
 * @param {WordArray|string} message The message to hash.
 * @return {WordArray} The hash.
 * @static
 * @example
 *     var hash = CryptoJS.SHA224('message');
 *     var hash = CryptoJS.SHA224(wordArray);
 */
let _SHA224 = algo_sha256._createHelper(algo_sha224);

var SHA224 = {};
SHA224.encrypt = function (code, key, cfg) {
    let enStr = _SHA224(code, key, cfg);
    return enStr;
};
SHA224.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = SHA224;