// Encryption
let _TYPE = {};
_TYPE.EASY = "0";
_TYPE.AES = "1";
_TYPE.DES = "2";
_TYPE.RABBIT = "3";
_TYPE.RABBIT_LEGACY = "4";
_TYPE.RC4 = "5";
_TYPE.RC4Drop = "6";
_TYPE.TRIPLE_DES = "7";

_TYPE.MD5 = "100";
_TYPE.RIPEMD160 = "101";
_TYPE.SHA1 = "102";
_TYPE.SHA3 = "103";
_TYPE.SHA224 = "104";
_TYPE.SHA256 = "105";
_TYPE.SHA384 = "106";
_TYPE.SHA512 = "107";

_TYPE.HMAC_MD5 = "200";
_TYPE.HMAC_RIPEMD160 = "201";
_TYPE.HMAC_SHA1 = "202";
_TYPE.HMAC_SHA3 = "203";
_TYPE.HMAC_SHA224 = "204";
_TYPE.HMAC_SHA256 = "205";
_TYPE.HMAC_SHA384 = "206";
_TYPE.HMAC_SHA512 = "207";

let _ENCRYPTION = {};
_ENCRYPTION[_TYPE.EASY] = require("./encyption_ed_easy");
_ENCRYPTION[_TYPE.AES] = require("./encyption_ed_aes");
_ENCRYPTION[_TYPE.DES] = require("./encyption_ed_des");
_ENCRYPTION[_TYPE.RABBIT] = require("./encyption_ed_rabbit");
_ENCRYPTION[_TYPE.RABBIT_LEGACY] = require("./encyption_ed_rabbitLegacy");
_ENCRYPTION[_TYPE.RC4] = require("./encyption_ed_rc4");
_ENCRYPTION[_TYPE.RC4Drop] = require("./encyption_ed_rc4Drop");
_ENCRYPTION[_TYPE.TRIPLE_DES] = require("./encyption_ed_tripledes");

_ENCRYPTION[_TYPE.MD5] = require("./encyption_md5");
_ENCRYPTION[_TYPE.RIPEMD160] = require("./encyption_ripemd160");
_ENCRYPTION[_TYPE.SHA1] = require("./encyption_sha1");
_ENCRYPTION[_TYPE.SHA3] = require("./encyption_sha3");
_ENCRYPTION[_TYPE.SHA224] = require("./encyption_sha224");
_ENCRYPTION[_TYPE.SHA256] = require("./encyption_sha256");
_ENCRYPTION[_TYPE.SHA384] = require("./encyption_sha384");
_ENCRYPTION[_TYPE.SHA512] = require("./encyption_sha512");

_ENCRYPTION[_TYPE.HMAC_MD5] = require("./encyption_hmac_md5");
_ENCRYPTION[_TYPE.HMAC_RIPEMD160] = require("./encyption_hmac_ripemd160");
_ENCRYPTION[_TYPE.HMAC_SHA1] = require("./encyption_hmac_sha1");
_ENCRYPTION[_TYPE.HMAC_SHA3] = require("./encyption_hmac_sha3");
_ENCRYPTION[_TYPE.HMAC_SHA224] = require("./encyption_hmac_sha224");
_ENCRYPTION[_TYPE.HMAC_SHA256] = require("./encyption_hmac_sha256");
_ENCRYPTION[_TYPE.HMAC_SHA384] = require("./encyption_hmac_sha384");
_ENCRYPTION[_TYPE.HMAC_SHA512] = require("./encyption_hmac_sha512");

let Encryption = {};
Encryption.TYPE = _TYPE;

Encryption.encrypt = function (code = "", configs = [{
    type: _TYPE.EASY,
    key: "",
    cfg: {}
}]) {
    let result = code;
    while (configs.length > 0) {
        let config = configs.shift();
        if (config.type in _ENCRYPTION) {
            let encrypt = _ENCRYPTION[config.type].encrypt;
            if (typeof encrypt == "function") {
                let key = config.key || "";
                let cfg = config.cfg || undefined;
                result = encrypt(result, key, cfg);
            }
        }
    }
    return result;
};
Encryption.decrypt = function (code = "", configs = [{
    type: _TYPE.EASY,
    key: "",
    cfg: {}
}]) {
    let result = code;
    while (configs.length > 0) {
        let config = configs.pop();
        if (config.type in _ENCRYPTION) {
            let decrypt = _ENCRYPTION[config.type].decrypt;
            if (typeof decrypt == "function") {
                let key = config.key || "";
                let cfg = config.cfg || undefined;
                result = decrypt(result, key, cfg);
            }
        }
    }
    return result;
};

module.exports = Encryption;