var algo_sha256 = require("./algo_sha256");
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
 *     var hash = CryptoJS.SHA256('message');
 *     var hash = CryptoJS.SHA256(wordArray);
 */
let _SHA256 = Hasher._createHelper(algo_sha256);

var SHA256 = {};
SHA256.encrypt = function (code, key, cfg) {
    let enStr = _SHA256(code, key, cfg);
    return enStr;
};
SHA256.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = SHA256;
