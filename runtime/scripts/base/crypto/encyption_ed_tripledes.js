var BlockCipher = require("./helper_blockCipher");
var algo_tripledes = require("./algo_des");
var Utf8 = require("./encoder_utf8");
var CBC = require("./mode_cbc");
var Pkcs7 = require("./pad_pkcs7");

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
 */
let _TripleDES = BlockCipher._createHelper(algo_tripledes);

var TripleDES = {};
TripleDES.encrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("TripleDES key is too short!");
        return code;
    }

    let newKey = Utf8.parse(key); //将秘钥转换成Utf8字节数组
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)), // 偏移量
            mode: CBC, // 加密模式
            padding: Pkcs7 // 填充方式
        };
    }

    let enStr = _TripleDES.encrypt(code, newKey, cfg);
    enStr = enStr.toString();
    return enStr;
};

TripleDES.decrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("TripleDES key is too short!");
        return code;
    }

    let newKey = Utf8.parse(key); //将秘钥转换成Utf8字节数组
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }

    let deStr = _TripleDES.decrypt(code, newKey, cfg);
    let utf8Str = deStr.toString(Utf8);
    return utf8Str;
};

module.exports = TripleDES;