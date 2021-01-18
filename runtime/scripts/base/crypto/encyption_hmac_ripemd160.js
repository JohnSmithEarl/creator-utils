let algo_ripemd160 = require("./algo_ripemd160");
let Hasher = require("./core_hasher");

/**
 * Shortcut function to the HMAC's object interface.
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 * @return {WordArray} The HMAC.
 * @static
 * @example
 *
 *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
 */
let _HmacRIPEMD160 = Hasher._createHmacHelper(algo_ripemd160);

var HmacRIPEMD160 = {};
HmacRIPEMD160.encrypt = function (code, key, cfg) {
    let enStr = _HmacRIPEMD160(code);
    return enStr;
};
HmacRIPEMD160.decrypt = function (code, key, cfg) {
    return code;
};

module.exports = HmacRIPEMD160;