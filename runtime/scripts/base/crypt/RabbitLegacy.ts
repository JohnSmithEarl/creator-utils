let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
let IV = "1234567812345678";

export class RabbitLegacy {
    static encrypt(plaintext: string, keyStr: string = KEY, ivStr: string = IV) {
        let src = CryptoJS.enc.Utf8.parse(plaintext);
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let encrypted = CryptoJS.RabbitLegacy.encrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.Pkcs7,
            format: CryptoJS.format.Hex
        })
        let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        return str;
    }

    static decrypt(ciphertext: string, keyStr: string = KEY, ivStr: string = IV) {
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let decrypted = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.Pkcs7,
            format: CryptoJS.format.Hex
        })
        let str = decrypted.toString(CryptoJS.enc.Utf8);
        return str;
    }
};