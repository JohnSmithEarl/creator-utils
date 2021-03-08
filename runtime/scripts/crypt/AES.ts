let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
let IV = "1234567812345678";
/**
 * mode支持：CBC，CFB，CTR，CTRGladman，ECB，OFB
 * padding支持：ZeroPadding，NoPadding，AnsiX923，Iso10126，Iso97971，Pkcs7
 */
export class AES {
    /**
     * AES加密
     * @param text 明文
     * @param key 密钥
     * @param iv 偏移量
     * @returns utf8string
     */
    static encrypt(text: string, key: string = KEY, iv: string = IV) {
        let ciphertext = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return CryptoJS.enc.Base64.stringify(ciphertext.ciphertext);
    }

    /**
     * AES解密
     * @param text 密文
     * @param key 密钥
     * @param iv 偏移量
     * @returns utf8string
     */
    static decrypt(text: string, key: string = KEY, iv: string = IV) {
        let result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return result.toString(CryptoJS.enc.Utf8)
    }
};