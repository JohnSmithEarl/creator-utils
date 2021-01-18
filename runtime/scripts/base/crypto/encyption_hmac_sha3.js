let algo_sha3 = require("./algo_sha3");
let Hasher = require("./core_hasher");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *     var hmac = CryptoJS.HmacSHA3(message, key);
 */
let _HmacSHA3 = Hasher._createHmacHelper(algo_sha3);

var HmacSHA3 = {};
HmacSHA3.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA3(code);
    return enStr;
};
HmacSHA3.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacSHA3;