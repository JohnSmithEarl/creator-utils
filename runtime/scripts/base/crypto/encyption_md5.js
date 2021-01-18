let Hasher = require("./core_hasher");
let algo_md5 = require("./algo_md5");

/**
 * Shortcut function to the hasher's object interface.
 * @param {WordArray|string} message The message to hash.
 * @return {WordArray} The hash.
 * @static
 * @example
 *
 *     var hash = CryptoJS.MD5('message');
 *     var hash = CryptoJS.MD5(wordArray);
 */
var _MD5 = Hasher._createHelper(algo_md5);

var MD5 = {};
MD5.encrypt = function (code, key, cfg) {
    let enStr = _MD5(code);
    return enStr;
};
MD5.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = MD5;