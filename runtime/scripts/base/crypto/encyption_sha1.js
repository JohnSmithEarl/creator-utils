let Hasher = require("./core_hasher");
let algo_sha1 = require("./algo_sha1");

/**
 * Shortcut function to the hasher's object interface.
 * @param {WordArray|string} message The message to hash.
 * @return {WordArray} The hash.
 * @static
 * @example
 *     var hash = CryptoJS.SHA1('message');
 *     var hash = CryptoJS.SHA1(wordArray);
 */
var _SHA1 = Hasher._createHelper(algo_sha1);

var SHA1 = {};
SHA1.encrypt = function (code, key, cfg) {
    let enStr = _SHA1(code, key);
    return enStr;
};
SHA1.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = _SHA1;