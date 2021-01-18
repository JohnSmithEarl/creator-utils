var algo_sha224 = require("./algo_sha224");
var algo_sha256 = require("./algo_sha256");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *     var hmac = CryptoJS.HmacSHA224(message, key);
 */
let _HmacSHA224 = algo_sha256._createHmacHelper(algo_sha224);

var HmacSHA224 = {};
HmacSHA224.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA224(code, key, cfg);
    return enStr;
};
HmacSHA224.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA224;
