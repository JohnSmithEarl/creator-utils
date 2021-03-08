let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";

export class RC4 {
    static encrypt(plaintext: string, keyStr: string = KEY) {
        let src = CryptoJS.enc.Utf8.parse(plaintext);
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let encrypted = CryptoJS.RC4.encrypt(src, key)
        let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        return str;
    }

    static decrypt(ciphertext: string, keyStr: string = KEY) {
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let decrypted = CryptoJS.RC4.decrypt(ciphertext, key);
        let str = decrypted.toString(CryptoJS.enc.Utf8);
        return str;
    }
};