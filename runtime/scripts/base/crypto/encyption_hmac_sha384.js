var algo_sha384 = require("./algo_sha384");
var algo_sha512 = require("./algo_sha512");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *     var hmac = CryptoJS.HmacSHA384(message, key);
 */
let _HmacSHA384 = algo_sha512._createHmacHelper(algo_sha384);

var HmacSHA384 = {};
HmacSHA384.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA384(code, key, cfg);
    return enStr;
};
HmacSHA384.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA384;