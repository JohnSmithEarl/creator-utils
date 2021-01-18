let UtilSerial = {}

UtilSerial.encrypt = function (plaintext, key) {
    let result = String.fromCharCode(plaintext.charCodeAt(0) + plaintext.length);
    for (let i = 1; i < plaintext.length; i++) {
        result += String.fromCharCode(plaintext.charCodeAt(i) + plaintext.charCodeAt(i - 1));
    }
    return escape(result);
}

UtilSerial.decrypt = function (ciphertext, key) {
    ciphertext = unescape(ciphertext);
    let result = String.fromCharCode(ciphertext.charCodeAt(0) - ciphertext.length);
    for (let i = 1; i < ciphertext.length; i++) {
        result += String.fromCharCode(ciphertext.charCodeAt(i) - result.charCodeAt(i - 1));
    }
    return result;
}

module.exports = UtilSerial;
