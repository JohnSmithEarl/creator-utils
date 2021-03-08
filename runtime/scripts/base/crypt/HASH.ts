export class HASH {
    /**
     * MD5
     * @param str 字符串
     * @returns string
     */
    static MD5(str: string): string {
        let md5 = CryptoJS.MD5(str);
        let strHex = md5.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * RIPEMD160
     * @param str 字符串
     * @returns string
     */
    static RIPEMD160(str: string): string {
        let ripemd160 = CryptoJS.RIPEMD160(str);
        let strHex = ripemd160.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * SHA1
     * @param str 字符串
     * @returns string
     */
    static SHA1(str: string) {
        let sha1 = CryptoJS.SHA1(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
    * SHA3
    * @param str 字符串
    * @returns string
    */
    static SHA3(str: string) {
        let sha1 = CryptoJS.SHA3(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * SHA224
     * @param str 字符串
     * @returns string
     */
    static SHA224(str: string) {
        let sha1 = CryptoJS.SHA224(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * SHA256
     * @param str 字符串
     * @returns string
     */
    static SHA256(str: string) {
        let sha1 = CryptoJS.SHA256(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * SHA384
     * @param str 字符串
     * @returns string
     */
    static SHA384(str: string) {
        let sha1 = CryptoJS.SHA384(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * SHA512
     * @param str 字符串
     * @returns string
     */
    static SHA512(str: string) {
        let sha1 = CryptoJS.SHA512(str);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacMD5
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacMD5(str: string, key: string) {
        let sha1 = CryptoJS.HmacMD5(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
    * HmacRIPEMD160
    * @param str 字符串
    * @param key 密钥
    * @returns string
    */
    static HmacRIPEMD160(str: string, key: string) {
        let sha1 = CryptoJS.HmacRIPEMD160(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA1
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA1(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA1(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA3
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA3(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA3(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA224
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA224(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA224(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA256
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA256(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA256(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA384
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA384(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA384(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * HmacSHA512
     * @param str 字符串
     * @param key 密钥
     * @returns string
     */
    static HmacSHA512(str: string, key: string) {
        let sha1 = CryptoJS.HmacSHA512(str, key);
        let strHex = sha1.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
     * PBKDF2
     *
     * @param password  用来生成密钥的原文密码。
     * @param salt 一个加密用的盐值。
     * @param c 进行重复计算的次数。
     * @param dkLen 期望得到的密钥的长度。
     * @returns str;
     */
    static PBKDF2(password: string, salt: string, c = 1000, dkLen = 8) {
        let pbkdf2 = CryptoJS.PBKDF2(password, salt, { keySize: dkLen, iterations: c });
        let strHex = pbkdf2.toString(CryptoJS.enc.Hex);
        return strHex;
    }

    /**
      * PBKDF2
      *
      * @param password  用来生成密钥的原文密码。
      * @param salt 一个加密用的盐值。
      * @param c 进行重复计算的次数。
      * @param dkLen 期望得到的密钥的长度。
      * @returns str;
      */
    static EvpKDF(password: string, salt: string, c = 1000, dkLen = 8) {
        let pbkdf2 = CryptoJS.EvpKDF(password, salt, { keySize: dkLen, iterations: c });
        let strHex = pbkdf2.toString(CryptoJS.enc.Hex);
        return strHex;
    }
}