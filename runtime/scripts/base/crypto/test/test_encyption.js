// let crypto = require("../crypto");

// ///////////////////////////////////////////////////
// //easy
// let str = "111111111111111";
// let enStr = crypto.encrypt(str, [{
//     type: crypto.TYPE.EASY,
// }]); //@bbbbbbbbbbbbbb
// let deStr = crypto.decrypt(enStr, [{
//     type: crypto.TYPE.EASY,
// }]);
// console.log("str:", str, " enStr:", enStr, "deStr:", deStr);

// ///////////////////////////////////////////////////
// //aes
// let key = '1234567890123456789012335475'; //秘钥
// enStr = crypto.encrypt(str, [{
//     type: crypto.TYPE.AES,
//     key: key
// }]); //UNznbrPfG1OKvAoXJsq7Qg==
// deStr = crypto.decrypt(enStr, [{
//     type: crypto.TYPE.AES,
//     key: key
// }]);
// console.log("str:", str, " enStr:", enStr, "deStr:", deStr);