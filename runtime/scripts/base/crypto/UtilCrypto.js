// let UtilSerial = require("./UtilSerial");

// let UtilCrypto = {}

// //对应关系可以混淆
// UtilCrypto.CRYPTO_TYPE = {
//     SERIAL: 0,
// }

// UtilCrypto.CRYPTO_MACHINE = [];
// UtilCrypto.CRYPTO_MACHINE[UtilCrypto.CRYPTO_TYPE.SERIAL] = UtilSerial;

// UtilCrypto.encrypt = function (plaintext = "", types = [_DECRYPT_TYPE.NORMAL], keys = [""]) {
//     if (!(types instanceof Array && keys instanceof Array && types.length == keys.length)) {
//         return plaintext;
//     }

//     let result = plaintext;
//     while (types.length > 0 && keys.length > 0) {
//         let machine = UtilCrypto.CRYPTO_MACHINE[types.shift()];
//         result = machine.encrypt(result, keys.shift());
//     }
//     return result;
// }

// UtilCrypto.decrypt = function (ciphertext = "", types = [_DECRYPT_TYPE.NORMAL], keys = [""]) {
//     if (!(types instanceof Array && keys instanceof Array && types.length == keys.length)) {
//         return ciphertext;
//     }

//     let result = ciphertext;
//     while (types.length > 0 && keys.length > 0) {
//         let machine = UtilCrypto.CRYPTO_MACHINE[types.pop()];
//         result = machine.decrypt(result, keys.pop());
//     }
//     return result;
// }