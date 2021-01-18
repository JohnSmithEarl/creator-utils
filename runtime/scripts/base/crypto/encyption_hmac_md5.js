let Hasher = require("./core_hasher");
let algo_md5 = require("./algo_md5");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *
 *     var hmac = CryptoJS.HmacMD5(message, key);
 */
var _HmacMD5 = Hasher._createHmacHelper(algo_md5);

var HmacMD5 = {};
HmacMD5.encrypt = function (code, key, cfg) {
    let enStr = _HmacMD5(code, key);
    return enStr;
};
HmacMD5.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacMD5;