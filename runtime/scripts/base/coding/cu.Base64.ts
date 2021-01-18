import { cu_UTF8 } from "./cu.UTF8";

export class cu_Base64 {
    private static keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    public static encode(input: string) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = cu_UTF8.encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                cu_Base64.keyStr.charAt(enc1) +
                cu_Base64.keyStr.charAt(enc2) +
                cu_Base64.keyStr.charAt(enc3) +
                cu_Base64.keyStr.charAt(enc4);
        }
        return output;
    }

    public static decode(input: string) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = cu_Base64.keyStr.indexOf(input.charAt(i++));
            enc2 = cu_Base64.keyStr.indexOf(input.charAt(i++));
            enc3 = cu_Base64.keyStr.indexOf(input.charAt(i++));
            enc4 = cu_Base64.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = cu_UTF8.decode(output);
        return output;
    }
};

let test = function () {
    console.log("\n\n===> test start.", "Base64");

    let str = "123456";
    let eStr = cu_Base64.encode(str);
    let str2 = cu_Base64.decode(eStr);

    console.log("str:", str);
    console.log("eStr:", eStr);
    console.log("str2:", str2);

    console.log("===> test ended.\n\n");
};
test();