let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
let IV = "1234567812345678";

/**
 * mode支持：CBC，CFB，CTR，CTRGladman，ECB，OFB
 * padding支持：ZeroPadding，NoPadding，AnsiX923，Iso10126，Iso97971，Pkcs7
 */
export class DES {
    /**
     * AES加密
     * @param plaintext 明文
     * @param key 密钥
     * @param iv 偏移量
     * @returns utf8string
     */
    static encrypt(plaintext: string, key: string = KEY, iv: string = IV) {
        let encrypted = CryptoJS.DES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            format: CryptoJS.format.Hex
        });
        return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
    }

    /**
     * AES解密
     * @param ciphertext 密文
     * @param key 密钥
     * @param iv 偏移量
     * @returns utf8string
     */
    static decrypt(ciphertext: string, key: string = KEY, iv: string = IV) {
        let result = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        let plaintext = result.toString(CryptoJS.enc.Utf8)
        return plaintext;
    }

    /**
     * DES EBC 加密
     * @param plaintext 明文
     * @param key 密钥
     * @returns string
     */
    static encryptEBC(plaintext: string, key: string = KEY) {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        let encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let strHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * DES EBC 解密
     * @param ciphertext 密文
     * @param key 密钥
     * @returns string
     */
    static decryptEBC(ciphertext: string, key: string = KEY) {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        let decrypted = CryptoJS.DES.decrypt(ciphertext, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        return strUtf8;
    }
};