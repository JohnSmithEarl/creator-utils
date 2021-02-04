import { BlockCipher } from "../helper/BlockCipher";
import { EncoderUtf8 } from "../encoder/EncoderUtf8";
import { AlgoAES } from "../algo/AlgoAES";
import { ModeCBC } from "../mode/ModeCBC";
import { PadPkcs7 } from "../pad/PadPkcs7";

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     let ciphertext = CryptoAES.encrypt(message, key, cfg);
 *     let plaintext  = CryptoAES.decrypt(ciphertext, key, cfg);
 */
let _AES = BlockCipher._createHelper(AlgoAES);

export class AES {
    static encrypt(code, key, cfg) {
        if (key.length < 20) {
            console.error("aes key is too short!");
            return code;
        }

        let newKey = EncoderUtf8.parse(key); //将秘钥转换成Utf8字节数组
        if (!cfg) {
            cfg = {
                iv: EncoderUtf8.parse(key.substr(0, 16)), // 偏移量
                mode: ModeCBC, // 加密模式
                padding: PadPkcs7 // 填充方式
            };
        }

        let enStr = _AES.encrypt(code, newKey, cfg);
        enStr = enStr.toString();
        return enStr;
    };

    static decrypt(code, key, cfg) {
        if (key.length < 20) {
            console.error("aes key is too short!");
            return code;
        }

        let newKey = EncoderUtf8.parse(key); //将秘钥转换成Utf8字节数组
        if (!cfg) {
            cfg = {
                iv: EncoderUtf8.parse(key.substr(0, 16)),
                mode: ModeCBC,
                padding: PadPkcs7
            };
        }

        let deStr = _AES.decrypt(code, newKey, cfg);
        let utf8Str = deStr.toString(EncoderUtf8);
        return utf8Str;
    };
};