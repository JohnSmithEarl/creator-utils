/* see perf/crc32table.js */
/*global Int32Array */
function signed_crc_table() {
    var c = 0,
        table = new Array(256);
    for (var n = 0; n != 256; ++n) {
        c = n;
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        table[n] = c;
    }
    return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}
let T = signed_crc_table();

/**
 * CRC的全称是循环冗余校验
 */
export class UCRC32 {
    version: string = '1.2.0';
    table: any[] | Int32Array = T;

    public static bstr(bstr: string, seed?: number): number {
        var C = seed ^ -1,
            L = bstr.length - 1;
        for (var i = 0; i < L;) {
            C = (C >>> 8) ^ T[(C ^ bstr.charCodeAt(i++)) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ bstr.charCodeAt(i++)) & 0xFF];
        }
        if (i === L) C = (C >>> 8) ^ T[(C ^ bstr.charCodeAt(i)) & 0xFF];
        return C ^ -1;
    }

    public static buf(buf: Array<number>, seed?: number): number {
        if (buf.length > 10000)
            return this.crc32_buf_8(buf, seed);
        var C = seed ^ -1,
            L = buf.length - 3;
        for (var i = 0; i < L;) {
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
        }
        while (i < L + 3) C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
        return C ^ -1;
    }

    private static crc32_buf_8(buf: Array<number>, seed?: number): number {
        var C = seed ^ -1,
            L = buf.length - 7;
        for (var i = 0; i < L;) {
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
        }
        while (i < L + 7) C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xFF];
        return C ^ -1;
    }

    public static str(str: string, seed?: number) {
        var C = seed ^ -1;
        for (var i = 0, L = str.length, c, d; i < L;) {
            c = str.charCodeAt(i++);
            if (c < 0x80) {
                C = (C >>> 8) ^ T[(C ^ c) & 0xFF];
            } else if (c < 0x800) {
                C = (C >>> 8) ^ T[(C ^ (192 | ((c >> 6) & 31))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
            } else if (c >= 0xD800 && c < 0xE000) {
                c = (c & 1023) + 64;
                d = str.charCodeAt(i++) & 1023;
                C = (C >>> 8) ^ T[(C ^ (240 | ((c >> 8) & 7))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 2) & 63))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (d & 63))) & 0xFF];
            } else {
                C = (C >>> 8) ^ T[(C ^ (224 | ((c >> 12) & 15))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 6) & 63))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
            }
        }
        return C ^ -1;
    }
};

/**
 *
 ## Usage

 In all cases, the relevant function takes an argument representing data and an
 optional second argument representing the starting "seed" (for rolling CRC).

 The return value is a signed 32-bit integer.

 - `CRC32.buf(byte array or buffer[, seed])` assumes the argument is a sequence
   of 8-bit unsigned integers (nodejs `Buffer`, `Uint8Array` or array of bytes).

 - `CRC32.bstr(binary string[, seed])` assumes the argument is a binary string
   where byte `i` is the low byte of the UCS-2 char: `str.charCodeAt(i) & 0xFF`

 - `CRC32.str(string[, seed])` assumes the argument is a standard JS string and
   calculates the hash of the UTF-8 encoding.

 For example:
 ```js
 // var CRC32 = require('crc-32');             // uncomment this line if in node
 CRC32.str("SheetJS")                          // -1647298270
 CRC32.bstr("SheetJS")                         // -1647298270
 CRC32.buf([ 83, 104, 101, 101, 116, 74, 83 ]) // -1647298270

 crc32 = CRC32.buf([83, 104])                  // -1826163454  "Sh"
 crc32 = CRC32.str("eet", crc32)               //  1191034598  "Sheet"
 CRC32.bstr("JS", crc32)                       // -1647298270  "SheetJS"

 [CRC32.str("\u2603"),  CRC32.str("\u0003")]   // [ -1743909036,  1259060791 ]
 [CRC32.bstr("\u2603"), CRC32.bstr("\u0003")]  // [  1259060791,  1259060791 ]
 [CRC32.buf([0x2603]),  CRC32.buf([0x0003])]   // [  1259060791,  1259060791 ]
 ```
 */

import { UTest } from "../../utils/UTest";
export let test = function () {
    UTest.begin("CRC32");

    console.log(UCRC32.str("SheetJS")); // -1647298270
    console.log(UCRC32.bstr("SheetJS")); // -1647298270
    console.log(UCRC32.buf([83, 104, 101, 101, 116, 74, 83])); // -1647298270

    let crc32 = UCRC32.buf([83, 104]); // -1826163454  "Sh"
    console.log("str1:", crc32);
    crc32 = UCRC32.str("eet", crc32); //  1191034598  "Sheet"
    console.log("str2:", crc32);
    crc32 = UCRC32.bstr("JS", crc32); // -1647298270  "SheetJS"
    console.log("str2:", crc32);

    UTest.ended("CRC32");
};

test();