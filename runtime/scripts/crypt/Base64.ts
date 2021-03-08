export class Base64 {
    static encrypt(plaintext: string) {
        let src = CryptoJS.enc.Utf8.parse(plaintext);
        let base64string = CryptoJS.enc.Base64.stringify(src);
        return base64string;
    }

    static decrypt(ciphertext: string) {
        let base64string = CryptoJS.enc.Base64.parse(ciphertext);
        let str = CryptoJS.enc.Utf8.stringify(base64string);
        return str;
    }
}