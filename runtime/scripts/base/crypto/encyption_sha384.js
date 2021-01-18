var algo_sha384 = require("./algo_sha384");
var algo_sha512 = require("./algo_sha512");

/**
 * Shortcut function to the hasher's object interface.
 * @param {WordArray|string} message The message to hash.
 * @return {WordArray} The hash.
 * @static
 * @example
 *
 *     var hash = CryptoJS.SHA384('message');
 *     var hash = CryptoJS.SHA384(wordArray);
 */
let _SHA384 = algo_sha512._createHelper(algo_sha384);

var SHA384 = {};
SHA384.encrypt = function (code, key, cfg) {
    let enStr = _SHA384(code, key, cfg);
    return enStr;
};
SHA384.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = SHA384;