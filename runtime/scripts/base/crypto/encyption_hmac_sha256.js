var algo_sha256 = require("./algo_sha256");
var Hasher = require("./core_hasher");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA256(message, key);
 */
let _HmacSHA256 = Hasher._createHmacHelper(algo_sha256);

var HmacSHA256 = {};
HmacSHA256.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA256(code, key, cfg);
    return enStr;
};
HmacSHA256.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA256;