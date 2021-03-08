let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
let IV = "1234567812345678";

export class TripleDES {
    static encrypt(plaintext: string, keyStr: string = KEY, ivStr: string = IV) {
        let src = CryptoJS.enc.Utf8.parse(plaintext);
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let encrypted = CryptoJS.TripleDES.encrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        return str;
    }

    static decrypt(ciphertext: string, keyStr: string = KEY, ivStr: string = IV) {
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let decrypt = CryptoJS.TripleDES.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        let str = decrypt.toString(CryptoJS.enc.Utf8);
        return str;
    }
};

(function test() {
    let str = "你好，world!";
    let eStr = TripleDES.encrypt(str);
    let dStr = TripleDES.decrypt(eStr);
    console.log("eStr:", eStr);
    console.log("dStr:", dStr);
})();