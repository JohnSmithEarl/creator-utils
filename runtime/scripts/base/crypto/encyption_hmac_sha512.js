var algo_sha512 = require("./algo_sha512");
var Hasher = require("./core_hasher");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA512(message, key);
 */
let _HmacSHA512 = Hasher._createHmacHelper(algo_sha512);

var HmacSHA512 = {};
HmacSHA512.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA512(code, key, cfg);
    return enStr;
};
HmacSHA512.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA512;