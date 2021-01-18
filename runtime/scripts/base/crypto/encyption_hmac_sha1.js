let Hasher = require("./core_hasher");
let algo_sha1 = require("./algo_sha1");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA1(message, key);
 */
var _HmacSHA1 = Hasher._createHmacHelper(algo_sha1);

var HmacSHA1 = {};
HmacSHA1.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA1(code, key);
    return enStr;
};
HmacSHA1.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA1;