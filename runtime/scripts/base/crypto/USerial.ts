/**
 * 序列流加密
 */
export class USerial {
    /**
     * @description 序列流 加密
     * @param plaintext 明文
     * @param key
     */
    static encrypt(plaintext: string, key: string) {
        let result = String.fromCharCode(plaintext.charCodeAt(0) + plaintext.length);
        for (let i = 1; i < plaintext.length; i++) {
            result += String.fromCharCode(plaintext.charCodeAt(i) + plaintext.charCodeAt(i - 1));
        }
        return escape(result);
    }

    /**
     * @description 序列流 解密
     * @param ciphertext 密文
     * @param key
     */
    static decrypt(ciphertext: string, key: string) {
        ciphertext = unescape(ciphertext);
        let result = String.fromCharCode(ciphertext.charCodeAt(0) - ciphertext.length);
        for (let i = 1; i < ciphertext.length; i++) {
            result += String.fromCharCode(ciphertext.charCodeAt(i) - result.charCodeAt(i - 1));
        }
        return result;
    }
}
