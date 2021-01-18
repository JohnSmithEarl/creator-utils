let BlockCipher = require("./helper_blockCipher");
let algo_aes = require("./algo_aes");
let Utf8 = require("./encoder_utf8");
let CBC = require("./mode_cbc");
let Pkcs7 = require("./pad_pkcs7");

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
 */
let _AES = BlockCipher._createHelper(algo_aes);

var AES = {};
AES.encrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("aes key is too short!");
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

    let enStr = _AES.encrypt(code, newKey, cfg);
    enStr = enStr.toString();
    return enStr;
};

AES.decrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("aes key is too short!");
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

    let deStr = _AES.decrypt(code, newKey, cfg);
    let utf8Str = deStr.toString(Utf8);
    return utf8Str;
};

module.exports = AES;