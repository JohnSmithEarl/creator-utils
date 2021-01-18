let UtilSerial = {};
UtilSerial.encrypt = function (plaintext, key) {
    let result = String.fromCharCode(plaintext.charCodeAt(0) + plaintext.length);
    for (let i = 1; i < plaintext.length; i++) {
        result += String.fromCharCode(plaintext.charCodeAt(i) + plaintext.charCodeAt(i - 1));
    }
    return escape(result);
};
UtilSerial.decrypt = function (ciphertext, key) {
    ciphertext = unescape(ciphertext);
    let result = String.fromCharCode(ciphertext.charCodeAt(0) - ciphertext.length);
    for (let i = 1; i < ciphertext.length; i++) {
        result += String.fromCharCode(ciphertext.charCodeAt(i) - result.charCodeAt(i - 1));
    }
    return result;
};
module.exports = UtilSerial;
let UtilSerial = require("./UtilSerial");
let UtilCrypto = {};
UtilCrypto.CRYPTO_TYPE = {
    SERIAL: 0,
};
UtilCrypto.CRYPTO_MACHINE = [];
UtilCrypto.CRYPTO_MACHINE[UtilCrypto.CRYPTO_TYPE.SERIAL] = UtilSerial;
UtilCrypto.encrypt = function (plaintext = "", types = [_DECRYPT_TYPE.NORMAL], keys = [""]) {
    if (!(types instanceof Array && keys instanceof Array && types.length == keys.length)) {
        return plaintext;
    }
    let result = plaintext;
    while (types.length > 0 && keys.length > 0) {
        let machine = UtilCrypto.CRYPTO_MACHINE[types.shift()];
        result = machine.encrypt(result, keys.shift());
    }
    return result;
};
UtilCrypto.decrypt = function (ciphertext = "", types = [_DECRYPT_TYPE.NORMAL], keys = [""]) {
    if (!(types instanceof Array && keys instanceof Array && types.length == keys.length)) {
        return ciphertext;
    }
    let result = ciphertext;
    while (types.length > 0 && keys.length > 0) {
        let machine = UtilCrypto.CRYPTO_MACHINE[types.pop()];
        result = machine.decrypt(result, keys.pop());
    }
    return result;
};
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }
function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)); }
function str_md5(s) { return binl2str(core_md5(str2binl(s), s.length * chrsz)); }
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16)
        bkey = core_md5(bkey, key.length * chrsz);
    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}
function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
}
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32)
                str += b64pad;
            else
                str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}
let UtilMd5 = {};
UtilMd5.hex_md5 = hex_md5;
UtilMd5.b64_md5 = b64_md5;
UtilMd5.str_md5 = str_md5;
UtilMd5.hex_hmac_md5 = hex_hmac_md5;
UtilMd5.b64_hmac_md5 = b64_hmac_md5;
UtilMd5.str_hmac_md5 = str_hmac_md5;
module.exports = UtilMd5;
let RC4 = {};
RC4.create = function (t_key) {
    function rc4(key) {
        this.x = this.y = 0;
        this.state = [];
        for (var i = 0; i < 256; i++) {
            this.state.push(i);
        }
        var j = 0;
        for (var i = 0; i < 256; i++) {
            j = (j + this.state[i] + key[i % key.length]) & 0xff;
            this.swap(i, j);
        }
    }
    rc4.prototype.swap = function (i, j) {
        var t = this.state[i];
        this.state[i] = this.state[j];
        this.state[j] = t;
    };
    rc4.prototype.nextByte = function () {
        this.x = (this.x + 1) & 0xff;
        this.y = (this.y + this.state[this.x]) & 0xff;
        this.swap(this.x, this.y);
        var t = (this.state[this.x] + this.state[this.y]) & 0xff;
        return this.state[t];
    };
    rc4.prototype.nextLong = function () {
        var n0 = this.nextByte();
        var n1 = this.nextByte();
        var n2 = this.nextByte();
        var n3 = this.nextByte();
        return n0 + (n1 << 8) + (n2 << 16) + ((n3 << 24) & 0xffffffff);
    };
    return new rc4(t_key);
};
module.exports = RC4;
function rotateRight(n, x) {
    return ((x >>> n) | (x << (32 - n)));
}
function choice(x, y, z) {
    return ((x & y) ^ (~x & z));
}
function majority(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
    return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
    return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
    return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
    return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
    return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
        sha256_sigma0(W[(j + 1) & 0x0f]));
}
var K256 = new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2);
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";
function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
function sha256_init() {
    ihash = new Array(8);
    count = new Array(2);
    buffer = new Array(64);
    count[0] = count[1] = 0;
    ihash[0] = 0x6a09e667;
    ihash[1] = 0xbb67ae85;
    ihash[2] = 0x3c6ef372;
    ihash[3] = 0xa54ff53a;
    ihash[4] = 0x510e527f;
    ihash[5] = 0x9b05688c;
    ihash[6] = 0x1f83d9ab;
    ihash[7] = 0x5be0cd19;
}
function sha256_transform() {
    var a, b, c, d, e, f, g, h, T1, T2;
    var W = new Array(16);
    a = ihash[0];
    b = ihash[1];
    c = ihash[2];
    d = ihash[3];
    e = ihash[4];
    f = ihash[5];
    g = ihash[6];
    h = ihash[7];
    for (var i = 0; i < 16; i++)
        W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1]
            << 16) | (buffer[i << 2] << 24));
    for (var j = 0; j < 64; j++) {
        T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
        if (j < 16)
            T1 += W[j];
        else
            T1 += sha256_expand(W, j);
        T2 = sha256_Sigma0(a) + majority(a, b, c);
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
    }
    ihash[0] += a;
    ihash[1] += b;
    ihash[2] += c;
    ihash[3] += d;
    ihash[4] += e;
    ihash[5] += f;
    ihash[6] += g;
    ihash[7] += h;
}
function sha256_update(data, inputLen) {
    var i, index, curpos = 0;
    index = ((count[0] >> 3) & 0x3f);
    var remainder = (inputLen & 0x3f);
    if ((count[0] += (inputLen << 3)) < (inputLen << 3))
        count[1]++;
    count[1] += (inputLen >> 29);
    for (i = 0; i + 63 < inputLen; i += 64) {
        for (var j = index; j < 64; j++)
            buffer[j] = data.charCodeAt(curpos++);
        sha256_transform();
        index = 0;
    }
    for (var j = 0; j < remainder; j++)
        buffer[j] = data.charCodeAt(curpos++);
}
function sha256_final() {
    var index = ((count[0] >> 3) & 0x3f);
    buffer[index++] = 0x80;
    if (index <= 56) {
        for (var i = index; i < 56; i++)
            buffer[i] = 0;
    }
    else {
        for (var i = index; i < 64; i++)
            buffer[i] = 0;
        sha256_transform();
        for (var i = 0; i < 56; i++)
            buffer[i] = 0;
    }
    buffer[56] = (count[1] >>> 24) & 0xff;
    buffer[57] = (count[1] >>> 16) & 0xff;
    buffer[58] = (count[1] >>> 8) & 0xff;
    buffer[59] = count[1] & 0xff;
    buffer[60] = (count[0] >>> 24) & 0xff;
    buffer[61] = (count[0] >>> 16) & 0xff;
    buffer[62] = (count[0] >>> 8) & 0xff;
    buffer[63] = count[0] & 0xff;
    sha256_transform();
}
function sha256_encode_bytes() {
    var j = 0;
    var output = new Array(32);
    for (var i = 0; i < 8; i++) {
        output[j++] = ((ihash[i] >>> 24) & 0xff);
        output[j++] = ((ihash[i] >>> 16) & 0xff);
        output[j++] = ((ihash[i] >>> 8) & 0xff);
        output[j++] = (ihash[i] & 0xff);
    }
    return output;
}
function sha256_encode_hex() {
    var output = new String();
    for (var i = 0; i < 8; i++) {
        for (var j = 28; j >= 0; j -= 4)
            output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
    }
    return output;
}
function sha256_digest(data) {
    sha256_init();
    sha256_update(data, data.length);
    sha256_final();
    return sha256_encode_hex();
}
function sha256_self_test() {
    return sha256_digest("message digest") ==
        "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
}
let UtilSha256 = {};
UtilSha256.sha256_digest = sha256_digest;
module.exports = UtilSha256;
let UtilXOR = {};
UtilXOR.encrypt = function (plaintext, key) {
};
UtilXOR.decrypt = function (ciphertext, key) {
};
module.exports = UtilXOR;
var create = Object.create || (function () {
    function F() { }
    return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
    };
}());
var Base = (function () {
    return {
        extend: function (overrides) {
            var subtype = create(this);
            if (overrides) {
                subtype.mixIn(overrides);
            }
            if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                subtype.init = function () {
                    subtype.$super.init.apply(this, arguments);
                };
            }
            subtype.init.prototype = subtype;
            subtype.$super = this;
            return subtype;
        },
        create: function () {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
        },
        init: function () { },
        mixIn: function (properties) {
            for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                }
            }
            if (properties.hasOwnProperty('toString')) {
                this.toString = properties.toString;
            }
        },
        clone: function () {
            return this.init.prototype.extend(this);
        }
    };
}());
module.exports = Base;
let WordArray = require("./core_x32_wordArray");
var Hex = {
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
            var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
    },
    parse: function (hexStr) {
        var hexStrLength = hexStr.length;
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new WordArray.init(words, hexStrLength / 2);
    }
};
module.exports = Hex;
let Base = require("./core_base");
let Hex = require("./encoder_hex");
var WordArray = Base.extend({
    init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
            this.sigBytes = sigBytes;
        }
        else {
            this.sigBytes = words.length * 4;
        }
    },
    toString: function (encoder) {
        return (encoder || Hex).stringify(this);
    },
    concat: function (wordArray) {
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;
        this.clamp();
        if (thisSigBytes % 4) {
            for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
            }
        }
        else {
            for (var i = 0; i < thatSigBytes; i += 4) {
                thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
            }
        }
        this.sigBytes += thatSigBytes;
        return this;
    },
    clamp: function () {
        var words = this.words;
        var sigBytes = this.sigBytes;
        words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
        words.length = Math.ceil(sigBytes / 4);
    },
    clone: function () {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
    },
    random: function (nBytes) {
        var words = [];
        var r = function (m_w) {
            var m_w = m_w;
            var m_z = 0x3ade68b1;
            var mask = 0xffffffff;
            return function () {
                m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                var result = ((m_z << 0x10) + m_w) & mask;
                result /= 0x100000000;
                result += 0.5;
                return result * (Math.random() > 0.5 ? 1 : -1);
            };
        };
        for (var i = 0, rcache; i < nBytes; i += 4) {
            var _r = r((rcache || Math.random()) * 0x100000000);
            rcache = _r() * 0x3ade67b7;
            words.push((_r() * 0x100000000) | 0);
        }
        return new WordArray.init(words, nBytes);
    }
});
module.exports = WordArray;
let WordArray = require("./core_x32_wordArray");
var Latin1 = {
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
            var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
    },
    parse: function (latin1Str) {
        var latin1StrLength = latin1Str.length;
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }
        return new WordArray.init(words, latin1StrLength);
    }
};
module.exports = Latin1;
let Latin1 = require("./encoder_latin1");
var Utf8 = {
    stringify: function (wordArray) {
        try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        }
        catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    },
    parse: function (utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
    }
};
module.exports = Utf8;
let Base = require("./core_base");
let WordArray = require("./core_x32_wordArray");
let Utf8 = require("./encoder_utf8");
var BufferedBlockAlgorithm = Base.extend({
    reset: function () {
        this._data = new WordArray.init();
        this._nDataBytes = 0;
    },
    _append: function (data) {
        if (typeof data == 'string') {
            data = Utf8.parse(data);
        }
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
    },
    _process: function (doFlush) {
        var processedWords;
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
            nBlocksReady = Math.ceil(nBlocksReady);
        }
        else {
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }
        var nWordsReady = nBlocksReady * blockSize;
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
        if (nWordsReady) {
            for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
            }
            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
        }
        return new WordArray.init(processedWords, nBytesReady);
    },
    clone: function () {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
    },
    _minBufferSize: 0
});
module.exports = BufferedBlockAlgorithm;
let WordArray = require("./core_x32_wordArray");
function parseLoop(base64Str, base64StrLength, reverseMap) {
    var words = [];
    var nBytes = 0;
    for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
            nBytes++;
        }
    }
    return WordArray.create(words, nBytes);
}
var Base64 = {
    _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = this._map;
        wordArray.clamp();
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
            var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
            var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
            for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
            }
        }
        var paddingChar = map.charAt(64);
        if (paddingChar) {
            while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
            }
        }
        return base64Chars.join('');
    },
    parse: function (base64Str) {
        var base64StrLength = base64Str.length;
        var map = this._map;
        var reverseMap = this._reverseMap;
        if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
            }
        }
        var paddingChar = map.charAt(64);
        if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
            }
        }
        return parseLoop(base64Str, base64StrLength, reverseMap);
    },
};
module.exports = Base64;
let Base = require("./core_base");
var CipherParams = Base.extend({
    init: function (cipherParams) {
        this.mixIn(cipherParams);
    },
    toString: function (formatter) {
        return (formatter || this.formatter).stringify(this);
    }
});
module.exports = CipherParams;
var WordArray = require("./core_x32_wordArray");
var Base64 = require("./encoder_base64");
var CipherParams = require("./helper_cipherParams");
var OpenSSLFormatter = {
    stringify: function (cipherParams) {
        var wordArray;
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;
        if (salt) {
            wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
        }
        else {
            wordArray = ciphertext;
        }
        return wordArray.toString(Base64);
    },
    parse: function (openSSLStr) {
        var salt;
        var ciphertext = Base64.parse(openSSLStr);
        var ciphertextWords = ciphertext.words;
        if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
            salt = WordArray.create(ciphertextWords.slice(2, 4));
            ciphertextWords.splice(0, 4);
            ciphertext.sigBytes -= 16;
        }
        return CipherParams.create({
            ciphertext: ciphertext,
            salt: salt
        });
    }
};
module.exports = OpenSSLFormatter;
let Base = require("./core_base");
let OpenSSLFormatter = require("./format_openSSL");
let CipherParams = require("./helper_cipherParams");
var SerializableCipher = Base.extend({
    cfg: Base.extend({
        format: OpenSSLFormatter
    }),
    encrypt: function (cipher, message, key, cfg) {
        cfg = this.cfg.extend(cfg);
        var encryptor = cipher.createEncryptor(key, cfg);
        var ciphertext = encryptor.finalize(message);
        var cipherCfg = encryptor.cfg;
        return CipherParams.create({
            ciphertext: ciphertext,
            key: key,
            iv: cipherCfg.iv,
            algorithm: cipher,
            mode: cipherCfg.mode,
            padding: cipherCfg.padding,
            blockSize: cipher.blockSize,
            formatter: cfg.format
        });
    },
    decrypt: function (cipher, ciphertext, key, cfg) {
        cfg = this.cfg.extend(cfg);
        ciphertext = this._parse(ciphertext, cfg.format);
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
        return plaintext;
    },
    _parse: function (ciphertext, format) {
        if (typeof ciphertext == 'string') {
            return format.parse(ciphertext, this);
        }
        else {
            return ciphertext;
        }
    }
});
module.exports = SerializableCipher;
let Base = require("./core_base");
var HMAC = Base.extend({
    init: function (hasher, key) {
        hasher = this._hasher = new hasher.init();
        if (typeof key == 'string') {
            key = Utf8.parse(key);
        }
        var hasherBlockSize = hasher.blockSize;
        var hasherBlockSizeBytes = hasherBlockSize * 4;
        if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
        }
        key.clamp();
        var oKey = this._oKey = key.clone();
        var iKey = this._iKey = key.clone();
        var oKeyWords = oKey.words;
        var iKeyWords = iKey.words;
        for (var i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
        this.reset();
    },
    reset: function () {
        var hasher = this._hasher;
        hasher.reset();
        hasher.update(this._iKey);
    },
    update: function (messageUpdate) {
        this._hasher.update(messageUpdate);
        return this;
    },
    finalize: function (messageUpdate) {
        var hasher = this._hasher;
        var innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
        return hmac;
    }
});
module.exports = HMAC;
let Base = require("./core_base");
let HMAC = require("./algo_hmac");
let BufferedBlockAlgorithm = require("./core_bufferedBlockAlgorithm");
var Hasher = BufferedBlockAlgorithm.extend({
    cfg: Base.extend(),
    init: function (cfg) {
        this.cfg = this.cfg.extend(cfg);
        this.reset();
    },
    reset: function () {
        BufferedBlockAlgorithm.reset.call(this);
        this._doReset();
    },
    update: function (messageUpdate) {
        this._append(messageUpdate);
        this._process();
        return this;
    },
    finalize: function (messageUpdate) {
        if (messageUpdate) {
            this._append(messageUpdate);
        }
        var hash = this._doFinalize();
        return hash;
    },
    blockSize: 512 / 32,
    _createHelper: function (hasher) {
        return function (message, cfg) {
            return new hasher.init(cfg).finalize(message);
        };
    },
    _createHmacHelper: function (hasher) {
        return function (message, key) {
            return new HMAC.init(hasher, key).finalize(message);
        };
    }
});
module.exports = Hasher;
let WordArray = require("./core_x32_wordArray");
let Hasher = require("./core_hasher");
var T = [];
(function () {
    for (var i = 0; i < 64; i++) {
        T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
    }
}());
function FF(a, b, c, d, x, s, t) {
    var n = a + ((b & c) | (~b & d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function GG(a, b, c, d, x, s, t) {
    var n = a + ((b & d) | (c & ~d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function HH(a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function II(a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
var MD5 = Hasher.extend({
    _doReset: function () {
        this._hash = new WordArray.init([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
    },
    _doProcessBlock: function (M, offset) {
        for (var i = 0; i < 16; i++) {
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
        }
        var H = this._hash.words;
        var M_offset_0 = M[offset + 0];
        var M_offset_1 = M[offset + 1];
        var M_offset_2 = M[offset + 2];
        var M_offset_3 = M[offset + 3];
        var M_offset_4 = M[offset + 4];
        var M_offset_5 = M[offset + 5];
        var M_offset_6 = M[offset + 6];
        var M_offset_7 = M[offset + 7];
        var M_offset_8 = M[offset + 8];
        var M_offset_9 = M[offset + 9];
        var M_offset_10 = M[offset + 10];
        var M_offset_11 = M[offset + 11];
        var M_offset_12 = M[offset + 12];
        var M_offset_13 = M[offset + 13];
        var M_offset_14 = M[offset + 14];
        var M_offset_15 = M[offset + 15];
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        a = FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = II(a, b, c, d, M_offset_0, 6, T[48]);
        d = II(d, a, b, c, M_offset_7, 10, T[49]);
        c = II(c, d, a, b, M_offset_14, 15, T[50]);
        b = II(b, c, d, a, M_offset_5, 21, T[51]);
        a = II(a, b, c, d, M_offset_12, 6, T[52]);
        d = II(d, a, b, c, M_offset_3, 10, T[53]);
        c = II(c, d, a, b, M_offset_10, 15, T[54]);
        b = II(b, c, d, a, M_offset_1, 21, T[55]);
        a = II(a, b, c, d, M_offset_8, 6, T[56]);
        d = II(d, a, b, c, M_offset_15, 10, T[57]);
        c = II(c, d, a, b, M_offset_6, 15, T[58]);
        b = II(b, c, d, a, M_offset_13, 21, T[59]);
        a = II(a, b, c, d, M_offset_4, 6, T[60]);
        d = II(d, a, b, c, M_offset_11, 10, T[61]);
        c = II(c, d, a, b, M_offset_2, 15, T[62]);
        b = II(b, c, d, a, M_offset_9, 21, T[63]);
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        var nBitsTotalL = nBitsTotal;
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
        data.sigBytes = (dataWords.length + 1) * 4;
        this._process();
        var hash = this._hash;
        var H = hash.words;
        for (var i = 0; i < 4; i++) {
            var H_i = H[i];
            H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
        }
        return hash;
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
    }
});
module.exports = MD5;
var Base = require('./core_base');
var WordArray = require("./core_x32_wordArray");
var algo_md5 = require("./algo_md5");
var EvpKDF = Base.extend({
    cfg: Base.extend({
        keySize: 128 / 32,
        hasher: algo_md5,
        iterations: 1
    }),
    init: function (cfg) {
        this.cfg = this.cfg.extend(cfg);
    },
    compute: function (password, salt) {
        var block;
        var cfg = this.cfg;
        var hasher = cfg.hasher.create();
        var derivedKey = WordArray.create();
        var derivedKeyWords = derivedKey.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;
        while (derivedKeyWords.length < keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();
            for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }
            derivedKey.concat(block);
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
    }
});
module.exports = EvpKDF;
let WordArray = require("./core_x32_wordArray");
let CipherParams = require("./helper_cipherParams");
let EvpKDF = require("./helper_evpkdf");
var OpenSSLKdf = {
    execute: function (password, keySize, ivSize, salt) {
        if (!salt) {
            salt = WordArray.random(64 / 8);
        }
        var key = EvpKDF.create({
            keySize: keySize + ivSize
        }).compute(password, salt);
        var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;
        return CipherParams.create({
            key: key,
            iv: iv,
            salt: salt
        });
    }
};
module.exports = OpenSSLKdf;
let SerializableCipher = require("./helper_serializableCipher");
let OpenSSLKdf = require("./helper_openSSLKdf");
var PasswordBasedCipher = SerializableCipher.extend({
    cfg: SerializableCipher.cfg.extend({
        kdf: OpenSSLKdf
    }),
    encrypt: function (cipher, message, password, cfg) {
        cfg = this.cfg.extend(cfg);
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
        cfg.iv = derivedParams.iv;
        var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
        ciphertext.mixIn(derivedParams);
        return ciphertext;
    },
    decrypt: function (cipher, ciphertext, password, cfg) {
        cfg = this.cfg.extend(cfg);
        ciphertext = this._parse(ciphertext, cfg.format);
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
        cfg.iv = derivedParams.iv;
        var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
        return plaintext;
    }
});
module.exports = PasswordBasedCipher;
let Base = require("./core_base");
let BufferedBlockAlgorithm = require("./core_bufferedBlockAlgorithm");
let SerializableCipher = require("./helper_serializableCipher");
let PasswordBasedCipher = require("./helper_passwordBasedCipher");
var Cipher = BufferedBlockAlgorithm.extend({
    cfg: Base.extend(),
    createEncryptor: function (key, cfg) {
        return this.create(this._ENC_XFORM_MODE, key, cfg);
    },
    createDecryptor: function (key, cfg) {
        return this.create(this._DEC_XFORM_MODE, key, cfg);
    },
    init: function (xformMode, key, cfg) {
        this.cfg = this.cfg.extend(cfg);
        this._xformMode = xformMode;
        this._key = key;
        this.reset();
    },
    reset: function () {
        BufferedBlockAlgorithm.reset.call(this);
        this._doReset();
    },
    process: function (dataUpdate) {
        this._append(dataUpdate);
        return this._process();
    },
    finalize: function (dataUpdate) {
        if (dataUpdate) {
            this._append(dataUpdate);
        }
        var finalProcessedData = this._doFinalize();
        return finalProcessedData;
    },
    keySize: 128 / 32,
    ivSize: 128 / 32,
    _ENC_XFORM_MODE: 1,
    _DEC_XFORM_MODE: 2,
    _createHelper: (function () {
        function selectCipherStrategy(key) {
            if (typeof key == 'string') {
                return PasswordBasedCipher;
            }
            else {
                return SerializableCipher;
            }
        }
        return function (cipher) {
            return {
                encrypt: function (message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function (ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
            };
        };
    }())
});
module.exports = Cipher;
let Base = require("./core_base");
var BlockCipherMode = Base.extend({
    createEncryptor: function (cipher, iv) {
        return this.Encryptor.create(cipher, iv);
    },
    createDecryptor: function (cipher, iv) {
        return this.Decryptor.create(cipher, iv);
    },
    init: function (cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
    }
});
module.exports = BlockCipherMode;
let BlockCipherMode = require("./helper_blockCipherMode");
var mode_CBC = (function () {
    function xorBlock(words, offset, blockSize) {
        var block;
        var iv = this._iv;
        if (iv) {
            block = iv;
            this._iv = undefined;
        }
        else {
            block = this._prevBlock;
        }
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= block[i];
        }
    }
    var CBC = BlockCipherMode.extend();
    CBC.Encryptor = CBC.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            xorBlock.call(this, words, offset, blockSize);
            cipher.encryptBlock(words, offset);
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });
    CBC.Decryptor = CBC.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            cipher.decryptBlock(words, offset);
            xorBlock.call(this, words, offset, blockSize);
            this._prevBlock = thisBlock;
        }
    });
    return CBC;
}());
module.exports = mode_CBC;
let WordArray = require("./core_x32_wordArray");
var Pkcs7 = {
    pad: function (data, blockSize) {
        var blockSizeBytes = blockSize * 4;
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
        var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
        var paddingWords = [];
        for (var i = 0; i < nPaddingBytes; i += 4) {
            paddingWords.push(paddingWord);
        }
        var padding = WordArray.create(paddingWords, nPaddingBytes);
        data.concat(padding);
    },
    unpad: function (data) {
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        data.sigBytes -= nPaddingBytes;
    }
};
module.exports = Pkcs7;
let Cipher = require("./helper_cipher");
let CBC = require("./mode_cbc");
let Pkcs7 = require("./pad_pkcs7");
var BlockCipher = Cipher.extend({
    cfg: Cipher.cfg.extend({
        mode: CBC,
        padding: Pkcs7
    }),
    reset: function () {
        var modeCreator;
        Cipher.reset.call(this);
        var cfg = this.cfg;
        var iv = cfg.iv;
        var mode = cfg.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) {
            modeCreator = mode.createEncryptor;
        }
        else {
            modeCreator = mode.createDecryptor;
            this._minBufferSize = 1;
        }
        if (this._mode && this._mode.__creator == modeCreator) {
            this._mode.init(this, iv && iv.words);
        }
        else {
            this._mode = modeCreator.call(mode, this, iv && iv.words);
            this._mode.__creator = modeCreator;
        }
    },
    _doProcessBlock: function (words, offset) {
        this._mode.processBlock(words, offset);
    },
    _doFinalize: function () {
        var finalProcessedBlocks;
        var padding = this.cfg.padding;
        if (this._xformMode == this._ENC_XFORM_MODE) {
            padding.pad(this._data, this.blockSize);
            finalProcessedBlocks = this._process(!!'flush');
        }
        else {
            finalProcessedBlocks = this._process(!!'flush');
            padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
    },
    blockSize: 128 / 32
});
module.exports = BlockCipher;
var BlockCipher = require("./helper_blockCipher");
var SBOX = [];
var INV_SBOX = [];
var SUB_MIX_0 = [];
var SUB_MIX_1 = [];
var SUB_MIX_2 = [];
var SUB_MIX_3 = [];
var INV_SUB_MIX_0 = [];
var INV_SUB_MIX_1 = [];
var INV_SUB_MIX_2 = [];
var INV_SUB_MIX_3 = [];
(function () {
    var d = [];
    for (var i = 0; i < 256; i++) {
        if (i < 128) {
            d[i] = i << 1;
        }
        else {
            d[i] = (i << 1) ^ 0x11b;
        }
    }
    var x = 0;
    var xi = 0;
    for (var i = 0; i < 256; i++) {
        var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
        sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];
        var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
        SUB_MIX_0[x] = (t << 24) | (t >>> 8);
        SUB_MIX_1[x] = (t << 16) | (t >>> 16);
        SUB_MIX_2[x] = (t << 8) | (t >>> 24);
        SUB_MIX_3[x] = t;
        var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
        INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
        INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
        INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
        INV_SUB_MIX_3[sx] = t;
        if (!x) {
            x = xi = 1;
        }
        else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
        }
    }
}());
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
var AES = BlockCipher.extend({
    _doReset: function () {
        var t;
        if (this._nRounds && this._keyPriorReset === this._key) {
            return;
        }
        var key = this._keyPriorReset = this._key;
        var keyWords = key.words;
        var keySize = key.sigBytes / 4;
        var nRounds = this._nRounds = keySize + 6;
        var ksRows = (nRounds + 1) * 4;
        var keySchedule = this._keySchedule = [];
        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
            }
            else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                    t = (t << 8) | (t >>> 24);
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    t ^= RCON[(ksRow / keySize) | 0] << 24;
                }
                else if (keySize > 6 && ksRow % keySize == 4) {
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
        }
        var invKeySchedule = this._invKeySchedule = [];
        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;
            if (invKsRow % 4) {
                var t = keySchedule[ksRow];
            }
            else {
                var t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
            }
            else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                    INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
        }
    },
    encryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    },
    decryptBlock: function (M, offset) {
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
    },
    _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
        var nRounds = this._nRounds;
        var s0 = M[offset] ^ keySchedule[0];
        var s1 = M[offset + 1] ^ keySchedule[1];
        var s2 = M[offset + 2] ^ keySchedule[2];
        var s3 = M[offset + 3] ^ keySchedule[3];
        var ksRow = 4;
        for (var round = 1; round < nRounds; round++) {
            var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
            var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
            var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
            var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
        }
        var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
        var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
        var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
        var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
        M[offset] = t0;
        M[offset + 1] = t1;
        M[offset + 2] = t2;
        M[offset + 3] = t3;
    },
    keySize: 256 / 32
});
module.exports = AES;
var BlockCipher = require("./helper_blockCipher");
var PC1 = [
    57, 49, 41, 33, 25, 17, 9, 1,
    58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3,
    60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7, 62, 54, 46, 38,
    30, 22, 14, 6, 61, 53, 45, 37,
    29, 21, 13, 5, 28, 20, 12, 4
];
var PC2 = [
    14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
];
var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
var SBOX_P = [{
        0x0: 0x808200,
        0x10000000: 0x8000,
        0x20000000: 0x808002,
        0x30000000: 0x2,
        0x40000000: 0x200,
        0x50000000: 0x808202,
        0x60000000: 0x800202,
        0x70000000: 0x800000,
        0x80000000: 0x202,
        0x90000000: 0x800200,
        0xa0000000: 0x8200,
        0xb0000000: 0x808000,
        0xc0000000: 0x8002,
        0xd0000000: 0x800002,
        0xe0000000: 0x0,
        0xf0000000: 0x8202,
        0x8000000: 0x0,
        0x18000000: 0x808202,
        0x28000000: 0x8202,
        0x38000000: 0x8000,
        0x48000000: 0x808200,
        0x58000000: 0x200,
        0x68000000: 0x808002,
        0x78000000: 0x2,
        0x88000000: 0x800200,
        0x98000000: 0x8200,
        0xa8000000: 0x808000,
        0xb8000000: 0x800202,
        0xc8000000: 0x800002,
        0xd8000000: 0x8002,
        0xe8000000: 0x202,
        0xf8000000: 0x800000,
        0x1: 0x8000,
        0x10000001: 0x2,
        0x20000001: 0x808200,
        0x30000001: 0x800000,
        0x40000001: 0x808002,
        0x50000001: 0x8200,
        0x60000001: 0x200,
        0x70000001: 0x800202,
        0x80000001: 0x808202,
        0x90000001: 0x808000,
        0xa0000001: 0x800002,
        0xb0000001: 0x8202,
        0xc0000001: 0x202,
        0xd0000001: 0x800200,
        0xe0000001: 0x8002,
        0xf0000001: 0x0,
        0x8000001: 0x808202,
        0x18000001: 0x808000,
        0x28000001: 0x800000,
        0x38000001: 0x200,
        0x48000001: 0x8000,
        0x58000001: 0x800002,
        0x68000001: 0x2,
        0x78000001: 0x8202,
        0x88000001: 0x8002,
        0x98000001: 0x800202,
        0xa8000001: 0x202,
        0xb8000001: 0x808200,
        0xc8000001: 0x800200,
        0xd8000001: 0x0,
        0xe8000001: 0x8200,
        0xf8000001: 0x808002
    },
    {
        0x0: 0x40084010,
        0x1000000: 0x4000,
        0x2000000: 0x80000,
        0x3000000: 0x40080010,
        0x4000000: 0x40000010,
        0x5000000: 0x40084000,
        0x6000000: 0x40004000,
        0x7000000: 0x10,
        0x8000000: 0x84000,
        0x9000000: 0x40004010,
        0xa000000: 0x40000000,
        0xb000000: 0x84010,
        0xc000000: 0x80010,
        0xd000000: 0x0,
        0xe000000: 0x4010,
        0xf000000: 0x40080000,
        0x800000: 0x40004000,
        0x1800000: 0x84010,
        0x2800000: 0x10,
        0x3800000: 0x40004010,
        0x4800000: 0x40084010,
        0x5800000: 0x40000000,
        0x6800000: 0x80000,
        0x7800000: 0x40080010,
        0x8800000: 0x80010,
        0x9800000: 0x0,
        0xa800000: 0x4000,
        0xb800000: 0x40080000,
        0xc800000: 0x40000010,
        0xd800000: 0x84000,
        0xe800000: 0x40084000,
        0xf800000: 0x4010,
        0x10000000: 0x0,
        0x11000000: 0x40080010,
        0x12000000: 0x40004010,
        0x13000000: 0x40084000,
        0x14000000: 0x40080000,
        0x15000000: 0x10,
        0x16000000: 0x84010,
        0x17000000: 0x4000,
        0x18000000: 0x4010,
        0x19000000: 0x80000,
        0x1a000000: 0x80010,
        0x1b000000: 0x40000010,
        0x1c000000: 0x84000,
        0x1d000000: 0x40004000,
        0x1e000000: 0x40000000,
        0x1f000000: 0x40084010,
        0x10800000: 0x84010,
        0x11800000: 0x80000,
        0x12800000: 0x40080000,
        0x13800000: 0x4000,
        0x14800000: 0x40004000,
        0x15800000: 0x40084010,
        0x16800000: 0x10,
        0x17800000: 0x40000000,
        0x18800000: 0x40084000,
        0x19800000: 0x40000010,
        0x1a800000: 0x40004010,
        0x1b800000: 0x80010,
        0x1c800000: 0x0,
        0x1d800000: 0x4010,
        0x1e800000: 0x40080010,
        0x1f800000: 0x84000
    },
    {
        0x0: 0x104,
        0x100000: 0x0,
        0x200000: 0x4000100,
        0x300000: 0x10104,
        0x400000: 0x10004,
        0x500000: 0x4000004,
        0x600000: 0x4010104,
        0x700000: 0x4010000,
        0x800000: 0x4000000,
        0x900000: 0x4010100,
        0xa00000: 0x10100,
        0xb00000: 0x4010004,
        0xc00000: 0x4000104,
        0xd00000: 0x10000,
        0xe00000: 0x4,
        0xf00000: 0x100,
        0x80000: 0x4010100,
        0x180000: 0x4010004,
        0x280000: 0x0,
        0x380000: 0x4000100,
        0x480000: 0x4000004,
        0x580000: 0x10000,
        0x680000: 0x10004,
        0x780000: 0x104,
        0x880000: 0x4,
        0x980000: 0x100,
        0xa80000: 0x4010000,
        0xb80000: 0x10104,
        0xc80000: 0x10100,
        0xd80000: 0x4000104,
        0xe80000: 0x4010104,
        0xf80000: 0x4000000,
        0x1000000: 0x4010100,
        0x1100000: 0x10004,
        0x1200000: 0x10000,
        0x1300000: 0x4000100,
        0x1400000: 0x100,
        0x1500000: 0x4010104,
        0x1600000: 0x4000004,
        0x1700000: 0x0,
        0x1800000: 0x4000104,
        0x1900000: 0x4000000,
        0x1a00000: 0x4,
        0x1b00000: 0x10100,
        0x1c00000: 0x4010000,
        0x1d00000: 0x104,
        0x1e00000: 0x10104,
        0x1f00000: 0x4010004,
        0x1080000: 0x4000000,
        0x1180000: 0x104,
        0x1280000: 0x4010100,
        0x1380000: 0x0,
        0x1480000: 0x10004,
        0x1580000: 0x4000100,
        0x1680000: 0x100,
        0x1780000: 0x4010004,
        0x1880000: 0x10000,
        0x1980000: 0x4010104,
        0x1a80000: 0x10104,
        0x1b80000: 0x4000004,
        0x1c80000: 0x4000104,
        0x1d80000: 0x4010000,
        0x1e80000: 0x4,
        0x1f80000: 0x10100
    },
    {
        0x0: 0x80401000,
        0x10000: 0x80001040,
        0x20000: 0x401040,
        0x30000: 0x80400000,
        0x40000: 0x0,
        0x50000: 0x401000,
        0x60000: 0x80000040,
        0x70000: 0x400040,
        0x80000: 0x80000000,
        0x90000: 0x400000,
        0xa0000: 0x40,
        0xb0000: 0x80001000,
        0xc0000: 0x80400040,
        0xd0000: 0x1040,
        0xe0000: 0x1000,
        0xf0000: 0x80401040,
        0x8000: 0x80001040,
        0x18000: 0x40,
        0x28000: 0x80400040,
        0x38000: 0x80001000,
        0x48000: 0x401000,
        0x58000: 0x80401040,
        0x68000: 0x0,
        0x78000: 0x80400000,
        0x88000: 0x1000,
        0x98000: 0x80401000,
        0xa8000: 0x400000,
        0xb8000: 0x1040,
        0xc8000: 0x80000000,
        0xd8000: 0x400040,
        0xe8000: 0x401040,
        0xf8000: 0x80000040,
        0x100000: 0x400040,
        0x110000: 0x401000,
        0x120000: 0x80000040,
        0x130000: 0x0,
        0x140000: 0x1040,
        0x150000: 0x80400040,
        0x160000: 0x80401000,
        0x170000: 0x80001040,
        0x180000: 0x80401040,
        0x190000: 0x80000000,
        0x1a0000: 0x80400000,
        0x1b0000: 0x401040,
        0x1c0000: 0x80001000,
        0x1d0000: 0x400000,
        0x1e0000: 0x40,
        0x1f0000: 0x1000,
        0x108000: 0x80400000,
        0x118000: 0x80401040,
        0x128000: 0x0,
        0x138000: 0x401000,
        0x148000: 0x400040,
        0x158000: 0x80000000,
        0x168000: 0x80001040,
        0x178000: 0x40,
        0x188000: 0x80000040,
        0x198000: 0x1000,
        0x1a8000: 0x80001000,
        0x1b8000: 0x80400040,
        0x1c8000: 0x1040,
        0x1d8000: 0x80401000,
        0x1e8000: 0x400000,
        0x1f8000: 0x401040
    },
    {
        0x0: 0x80,
        0x1000: 0x1040000,
        0x2000: 0x40000,
        0x3000: 0x20000000,
        0x4000: 0x20040080,
        0x5000: 0x1000080,
        0x6000: 0x21000080,
        0x7000: 0x40080,
        0x8000: 0x1000000,
        0x9000: 0x20040000,
        0xa000: 0x20000080,
        0xb000: 0x21040080,
        0xc000: 0x21040000,
        0xd000: 0x0,
        0xe000: 0x1040080,
        0xf000: 0x21000000,
        0x800: 0x1040080,
        0x1800: 0x21000080,
        0x2800: 0x80,
        0x3800: 0x1040000,
        0x4800: 0x40000,
        0x5800: 0x20040080,
        0x6800: 0x21040000,
        0x7800: 0x20000000,
        0x8800: 0x20040000,
        0x9800: 0x0,
        0xa800: 0x21040080,
        0xb800: 0x1000080,
        0xc800: 0x20000080,
        0xd800: 0x21000000,
        0xe800: 0x1000000,
        0xf800: 0x40080,
        0x10000: 0x40000,
        0x11000: 0x80,
        0x12000: 0x20000000,
        0x13000: 0x21000080,
        0x14000: 0x1000080,
        0x15000: 0x21040000,
        0x16000: 0x20040080,
        0x17000: 0x1000000,
        0x18000: 0x21040080,
        0x19000: 0x21000000,
        0x1a000: 0x1040000,
        0x1b000: 0x20040000,
        0x1c000: 0x40080,
        0x1d000: 0x20000080,
        0x1e000: 0x0,
        0x1f000: 0x1040080,
        0x10800: 0x21000080,
        0x11800: 0x1000000,
        0x12800: 0x1040000,
        0x13800: 0x20040080,
        0x14800: 0x20000000,
        0x15800: 0x1040080,
        0x16800: 0x80,
        0x17800: 0x21040000,
        0x18800: 0x40080,
        0x19800: 0x21040080,
        0x1a800: 0x0,
        0x1b800: 0x21000000,
        0x1c800: 0x1000080,
        0x1d800: 0x40000,
        0x1e800: 0x20040000,
        0x1f800: 0x20000080
    },
    {
        0x0: 0x10000008,
        0x100: 0x2000,
        0x200: 0x10200000,
        0x300: 0x10202008,
        0x400: 0x10002000,
        0x500: 0x200000,
        0x600: 0x200008,
        0x700: 0x10000000,
        0x800: 0x0,
        0x900: 0x10002008,
        0xa00: 0x202000,
        0xb00: 0x8,
        0xc00: 0x10200008,
        0xd00: 0x202008,
        0xe00: 0x2008,
        0xf00: 0x10202000,
        0x80: 0x10200000,
        0x180: 0x10202008,
        0x280: 0x8,
        0x380: 0x200000,
        0x480: 0x202008,
        0x580: 0x10000008,
        0x680: 0x10002000,
        0x780: 0x2008,
        0x880: 0x200008,
        0x980: 0x2000,
        0xa80: 0x10002008,
        0xb80: 0x10200008,
        0xc80: 0x0,
        0xd80: 0x10202000,
        0xe80: 0x202000,
        0xf80: 0x10000000,
        0x1000: 0x10002000,
        0x1100: 0x10200008,
        0x1200: 0x10202008,
        0x1300: 0x2008,
        0x1400: 0x200000,
        0x1500: 0x10000000,
        0x1600: 0x10000008,
        0x1700: 0x202000,
        0x1800: 0x202008,
        0x1900: 0x0,
        0x1a00: 0x8,
        0x1b00: 0x10200000,
        0x1c00: 0x2000,
        0x1d00: 0x10002008,
        0x1e00: 0x10202000,
        0x1f00: 0x200008,
        0x1080: 0x8,
        0x1180: 0x202000,
        0x1280: 0x200000,
        0x1380: 0x10000008,
        0x1480: 0x10002000,
        0x1580: 0x2008,
        0x1680: 0x10202008,
        0x1780: 0x10200000,
        0x1880: 0x10202000,
        0x1980: 0x10200008,
        0x1a80: 0x2000,
        0x1b80: 0x202008,
        0x1c80: 0x200008,
        0x1d80: 0x0,
        0x1e80: 0x10000000,
        0x1f80: 0x10002008
    },
    {
        0x0: 0x100000,
        0x10: 0x2000401,
        0x20: 0x400,
        0x30: 0x100401,
        0x40: 0x2100401,
        0x50: 0x0,
        0x60: 0x1,
        0x70: 0x2100001,
        0x80: 0x2000400,
        0x90: 0x100001,
        0xa0: 0x2000001,
        0xb0: 0x2100400,
        0xc0: 0x2100000,
        0xd0: 0x401,
        0xe0: 0x100400,
        0xf0: 0x2000000,
        0x8: 0x2100001,
        0x18: 0x0,
        0x28: 0x2000401,
        0x38: 0x2100400,
        0x48: 0x100000,
        0x58: 0x2000001,
        0x68: 0x2000000,
        0x78: 0x401,
        0x88: 0x100401,
        0x98: 0x2000400,
        0xa8: 0x2100000,
        0xb8: 0x100001,
        0xc8: 0x400,
        0xd8: 0x2100401,
        0xe8: 0x1,
        0xf8: 0x100400,
        0x100: 0x2000000,
        0x110: 0x100000,
        0x120: 0x2000401,
        0x130: 0x2100001,
        0x140: 0x100001,
        0x150: 0x2000400,
        0x160: 0x2100400,
        0x170: 0x100401,
        0x180: 0x401,
        0x190: 0x2100401,
        0x1a0: 0x100400,
        0x1b0: 0x1,
        0x1c0: 0x0,
        0x1d0: 0x2100000,
        0x1e0: 0x2000001,
        0x1f0: 0x400,
        0x108: 0x100400,
        0x118: 0x2000401,
        0x128: 0x2100001,
        0x138: 0x1,
        0x148: 0x2000000,
        0x158: 0x100000,
        0x168: 0x401,
        0x178: 0x2100400,
        0x188: 0x2000001,
        0x198: 0x2100000,
        0x1a8: 0x0,
        0x1b8: 0x2100401,
        0x1c8: 0x100401,
        0x1d8: 0x400,
        0x1e8: 0x2000400,
        0x1f8: 0x100001
    },
    {
        0x0: 0x8000820,
        0x1: 0x20000,
        0x2: 0x8000000,
        0x3: 0x20,
        0x4: 0x20020,
        0x5: 0x8020820,
        0x6: 0x8020800,
        0x7: 0x800,
        0x8: 0x8020000,
        0x9: 0x8000800,
        0xa: 0x20800,
        0xb: 0x8020020,
        0xc: 0x820,
        0xd: 0x0,
        0xe: 0x8000020,
        0xf: 0x20820,
        0x80000000: 0x800,
        0x80000001: 0x8020820,
        0x80000002: 0x8000820,
        0x80000003: 0x8000000,
        0x80000004: 0x8020000,
        0x80000005: 0x20800,
        0x80000006: 0x20820,
        0x80000007: 0x20,
        0x80000008: 0x8000020,
        0x80000009: 0x820,
        0x8000000a: 0x20020,
        0x8000000b: 0x8020800,
        0x8000000c: 0x0,
        0x8000000d: 0x8020020,
        0x8000000e: 0x8000800,
        0x8000000f: 0x20000,
        0x10: 0x20820,
        0x11: 0x8020800,
        0x12: 0x20,
        0x13: 0x800,
        0x14: 0x8000800,
        0x15: 0x8000020,
        0x16: 0x8020020,
        0x17: 0x20000,
        0x18: 0x0,
        0x19: 0x20020,
        0x1a: 0x8020000,
        0x1b: 0x8000820,
        0x1c: 0x8020820,
        0x1d: 0x20800,
        0x1e: 0x820,
        0x1f: 0x8000000,
        0x80000010: 0x20000,
        0x80000011: 0x800,
        0x80000012: 0x8020020,
        0x80000013: 0x20820,
        0x80000014: 0x20,
        0x80000015: 0x8020000,
        0x80000016: 0x8000000,
        0x80000017: 0x8000820,
        0x80000018: 0x8020820,
        0x80000019: 0x8000020,
        0x8000001a: 0x8000800,
        0x8000001b: 0x0,
        0x8000001c: 0x20800,
        0x8000001d: 0x820,
        0x8000001e: 0x20020,
        0x8000001f: 0x8020800
    }
];
var SBOX_MASK = [
    0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
    0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
];
function exchangeLR(offset, mask) {
    var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
    this._rBlock ^= t;
    this._lBlock ^= t << offset;
}
function exchangeRL(offset, mask) {
    var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
    this._lBlock ^= t;
    this._rBlock ^= t << offset;
}
var DES = BlockCipher.extend({
    _doReset: function () {
        var key = this._key;
        var keyWords = key.words;
        var keyBits = [];
        for (var i = 0; i < 56; i++) {
            var keyBitPos = PC1[i] - 1;
            keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
        }
        var subKeys = this._subKeys = [];
        for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
            var subKey = subKeys[nSubKey] = [];
            var bitShift = BIT_SHIFTS[nSubKey];
            for (var i = 0; i < 24; i++) {
                subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
                subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
            }
            subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
            for (var i = 1; i < 7; i++) {
                subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
            }
            subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
        }
        var invSubKeys = this._invSubKeys = [];
        for (var i = 0; i < 16; i++) {
            invSubKeys[i] = subKeys[15 - i];
        }
    },
    encryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._subKeys);
    },
    decryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._invSubKeys);
    },
    _doCryptBlock: function (M, offset, subKeys) {
        this._lBlock = M[offset];
        this._rBlock = M[offset + 1];
        exchangeLR.call(this, 4, 0x0f0f0f0f);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeLR.call(this, 1, 0x55555555);
        for (var round = 0; round < 16; round++) {
            var subKey = subKeys[round];
            var lBlock = this._lBlock;
            var rBlock = this._rBlock;
            var f = 0;
            for (var i = 0; i < 8; i++) {
                f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
            }
            this._lBlock = rBlock;
            this._rBlock = lBlock ^ f;
        }
        var t = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = t;
        exchangeLR.call(this, 1, 0x55555555);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeLR.call(this, 4, 0x0f0f0f0f);
        M[offset] = this._lBlock;
        M[offset + 1] = this._rBlock;
    },
    keySize: 64 / 32,
    ivSize: 64 / 32,
    blockSize: 64 / 32
});
module.exports = DES;
let Cipher = require("./helper_cipher");
var StreamCipher = Cipher.extend({
    _doFinalize: function () {
        var finalProcessedBlocks = this._process(!!'flush');
        return finalProcessedBlocks;
    },
    blockSize: 1
});
module.exports = StreamCipher;
var StreamCipher = require("./helper_streamCipher");
var S = [];
var C_ = [];
var G = [];
function nextState() {
    var X = this._X;
    var C = this._C;
    for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
    }
    C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
    C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
    C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
    C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
    C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
    C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
    C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
    C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
    this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
    for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];
        var ga = gx & 0xffff;
        var gb = gx >>> 16;
        var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
        var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
        G[i] = gh ^ gl;
    }
    X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
    X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
    X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
    X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
    X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
    X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
    X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
    X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
}
var Rabbit = StreamCipher.extend({
    _doReset: function () {
        var K = this._key.words;
        var iv = this.cfg.iv;
        for (var i = 0; i < 4; i++) {
            K[i] = (((K[i] << 8) | (K[i] >>> 24)) & 0x00ff00ff) |
                (((K[i] << 24) | (K[i] >>> 8)) & 0xff00ff00);
        }
        var X = this._X = [
            K[0], (K[3] << 16) | (K[2] >>> 16),
            K[1], (K[0] << 16) | (K[3] >>> 16),
            K[2], (K[1] << 16) | (K[0] >>> 16),
            K[3], (K[2] << 16) | (K[1] >>> 16)
        ];
        var C = this._C = [
            (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
            (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
            (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
            (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
        ];
        this._b = 0;
        for (var i = 0; i < 4; i++) {
            nextState.call(this);
        }
        for (var i = 0; i < 8; i++) {
            C[i] ^= X[(i + 4) & 7];
        }
        if (iv) {
            var IV = iv.words;
            var IV_0 = IV[0];
            var IV_1 = IV[1];
            var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
            var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
            var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
            var i3 = (i2 << 16) | (i0 & 0x0000ffff);
            C[0] ^= i0;
            C[1] ^= i1;
            C[2] ^= i2;
            C[3] ^= i3;
            C[4] ^= i0;
            C[5] ^= i1;
            C[6] ^= i2;
            C[7] ^= i3;
            for (var i = 0; i < 4; i++) {
                nextState.call(this);
            }
        }
    },
    _doProcessBlock: function (M, offset) {
        var X = this._X;
        nextState.call(this);
        S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
        S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
        S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
        S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
        for (var i = 0; i < 4; i++) {
            S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) |
                (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);
            M[offset + i] ^= S[i];
        }
    },
    blockSize: 128 / 32,
    ivSize: 64 / 32
});
module.exports = Rabbit;
var StreamCipher = require("./helper_streamCipher");
var S = [];
var C_ = [];
var G = [];
function nextState() {
    var X = this._X;
    var C = this._C;
    for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
    }
    C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
    C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
    C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
    C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
    C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
    C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
    C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
    C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
    this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
    for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];
        var ga = gx & 0xffff;
        var gb = gx >>> 16;
        var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
        var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
        G[i] = gh ^ gl;
    }
    X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
    X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
    X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
    X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
    X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
    X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
    X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
    X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
}
var RabbitLegacy = StreamCipher.extend({
    _doReset: function () {
        var K = this._key.words;
        var iv = this.cfg.iv;
        var X = this._X = [
            K[0], (K[3] << 16) | (K[2] >>> 16),
            K[1], (K[0] << 16) | (K[3] >>> 16),
            K[2], (K[1] << 16) | (K[0] >>> 16),
            K[3], (K[2] << 16) | (K[1] >>> 16)
        ];
        var C = this._C = [
            (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
            (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
            (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
            (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
        ];
        this._b = 0;
        for (var i = 0; i < 4; i++) {
            nextState.call(this);
        }
        for (var i = 0; i < 8; i++) {
            C[i] ^= X[(i + 4) & 7];
        }
        if (iv) {
            var IV = iv.words;
            var IV_0 = IV[0];
            var IV_1 = IV[1];
            var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
            var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
            var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
            var i3 = (i2 << 16) | (i0 & 0x0000ffff);
            C[0] ^= i0;
            C[1] ^= i1;
            C[2] ^= i2;
            C[3] ^= i3;
            C[4] ^= i0;
            C[5] ^= i1;
            C[6] ^= i2;
            C[7] ^= i3;
            for (var i = 0; i < 4; i++) {
                nextState.call(this);
            }
        }
    },
    _doProcessBlock: function (M, offset) {
        var X = this._X;
        nextState.call(this);
        S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
        S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
        S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
        S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
        for (var i = 0; i < 4; i++) {
            S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) |
                (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);
            M[offset + i] ^= S[i];
        }
    },
    blockSize: 128 / 32,
    ivSize: 64 / 32
});
module.exports = RabbitLegacy;
var StreamCipher = require("./helper_streamCipher");
function generateKeystreamWord() {
    var S = this._S;
    var i = this._i;
    var j = this._j;
    var keystreamWord = 0;
    for (var n = 0; n < 4; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
        keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
    }
    this._i = i;
    this._j = j;
    return keystreamWord;
}
var RC4 = StreamCipher.extend({
    _doReset: function () {
        var key = this._key;
        var keyWords = key.words;
        var keySigBytes = key.sigBytes;
        var S = this._S = [];
        for (var i = 0; i < 256; i++) {
            S[i] = i;
        }
        for (var i = 0, j = 0; i < 256; i++) {
            var keyByteIndex = i % keySigBytes;
            var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
            j = (j + S[i] + keyByte) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
        }
        this._i = this._j = 0;
    },
    _doProcessBlock: function (M, offset) {
        M[offset] ^= generateKeystreamWord.call(this);
    },
    keySize: 256 / 32,
    ivSize: 0
});
module.exports = RC4;
var algo_rc4 = require("./algo_rc4");
function generateKeystreamWord() {
    var S = this._S;
    var i = this._i;
    var j = this._j;
    var keystreamWord = 0;
    for (var n = 0; n < 4; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
        keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
    }
    this._i = i;
    this._j = j;
    return keystreamWord;
}
var RC4Drop = algo_rc4.extend({
    cfg: algo_rc4.cfg.extend({
        drop: 192
    }),
    _doReset: function () {
        algo_rc4._doReset.call(this);
        for (var i = this.cfg.drop; i > 0; i--) {
            generateKeystreamWord.call(this);
        }
    }
});
module.exports = RC4Drop;
var WordArray = require("./core_x32_wordArray");
var Hasher = require("./core_hasher");
var _zl = WordArray.create([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
]);
var _zr = WordArray.create([
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
]);
var _sl = WordArray.create([
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
]);
var _sr = WordArray.create([
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
]);
var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);
function f1(x, y, z) {
    return ((x) ^ (y) ^ (z));
}
function f2(x, y, z) {
    return (((x) & (y)) | ((~x) & (z)));
}
function f3(x, y, z) {
    return (((x) | (~(y))) ^ (z));
}
function f4(x, y, z) {
    return (((x) & (z)) | ((y) & (~(z))));
}
function f5(x, y, z) {
    return ((x) ^ ((y) | (~(z))));
}
function rotl(x, n) {
    return (x << n) | (x >>> (32 - n));
}
var RIPEMD160 = Hasher.extend({
    _doReset: function () {
        this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
    },
    _doProcessBlock: function (M, offset) {
        for (var i = 0; i < 16; i++) {
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
        }
        var H = this._hash.words;
        var hl = _hl.words;
        var hr = _hr.words;
        var zl = _zl.words;
        var zr = _zr.words;
        var sl = _sl.words;
        var sr = _sr.words;
        var al, bl, cl, dl, el;
        var ar, br, cr, dr, er;
        ar = al = H[0];
        br = bl = H[1];
        cr = cl = H[2];
        dr = dl = H[3];
        er = el = H[4];
        var t;
        for (var i = 0; i < 80; i += 1) {
            t = (al + M[offset + zl[i]]) | 0;
            if (i < 16) {
                t += f1(bl, cl, dl) + hl[0];
            }
            else if (i < 32) {
                t += f2(bl, cl, dl) + hl[1];
            }
            else if (i < 48) {
                t += f3(bl, cl, dl) + hl[2];
            }
            else if (i < 64) {
                t += f4(bl, cl, dl) + hl[3];
            }
            else {
                t += f5(bl, cl, dl) + hl[4];
            }
            t = t | 0;
            t = rotl(t, sl[i]);
            t = (t + el) | 0;
            al = el;
            el = dl;
            dl = rotl(cl, 10);
            cl = bl;
            bl = t;
            t = (ar + M[offset + zr[i]]) | 0;
            if (i < 16) {
                t += f5(br, cr, dr) + hr[0];
            }
            else if (i < 32) {
                t += f4(br, cr, dr) + hr[1];
            }
            else if (i < 48) {
                t += f3(br, cr, dr) + hr[2];
            }
            else if (i < 64) {
                t += f2(br, cr, dr) + hr[3];
            }
            else {
                t += f1(br, cr, dr) + hr[4];
            }
            t = t | 0;
            t = rotl(t, sr[i]);
            t = (t + er) | 0;
            ar = er;
            er = dr;
            dr = rotl(cr, 10);
            cr = br;
            br = t;
        }
        t = (H[1] + cl + dr) | 0;
        H[1] = (H[2] + dl + er) | 0;
        H[2] = (H[3] + el + ar) | 0;
        H[3] = (H[4] + al + br) | 0;
        H[4] = (H[0] + bl + cr) | 0;
        H[0] = t;
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff) |
            (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00));
        data.sigBytes = (dataWords.length + 1) * 4;
        this._process();
        var hash = this._hash;
        var H = hash.words;
        for (var i = 0; i < 5; i++) {
            var H_i = H[i];
            H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
        }
        return hash;
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
    }
});
module.exports = RIPEMD160;
var WordArray = require("./core_x32_wordArray");
var Hasher = require("./core_hasher");
var W = [];
var SHA1 = Hasher.extend({
    _doReset: function () {
        this._hash = new WordArray.init([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476,
            0xc3d2e1f0
        ]);
    },
    _doProcessBlock: function (M, offset) {
        var H = this._hash.words;
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for (var i = 0; i < 80; i++) {
            if (i < 16) {
                W[i] = M[offset + i] | 0;
            }
            else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);
            }
            var t = ((a << 5) | (a >>> 27)) + e + W[i];
            if (i < 20) {
                t += ((b & c) | (~b & d)) + 0x5a827999;
            }
            else if (i < 40) {
                t += (b ^ c ^ d) + 0x6ed9eba1;
            }
            else if (i < 60) {
                t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
            }
            else {
                t += (b ^ c ^ d) - 0x359d3e2a;
            }
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
        }
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0;
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;
        this._process();
        return this._hash;
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
    }
});
module.exports = SHA1;
var WordArray = require("./core_x32_wordArray");
var Hasher = require("./core_hasher");
var H = [];
var K = [];
(function () {
    function isPrime(n) {
        var sqrtN = Math.sqrt(n);
        for (var factor = 2; factor <= sqrtN; factor++) {
            if (!(n % factor)) {
                return false;
            }
        }
        return true;
    }
    function getFractionalBits(n) {
        return ((n - (n | 0)) * 0x100000000) | 0;
    }
    var n = 2;
    var nPrime = 0;
    while (nPrime < 64) {
        if (isPrime(n)) {
            if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
            }
            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
            nPrime++;
        }
        n++;
    }
}());
var W = [];
var SHA256 = Hasher.extend({
    _doReset: function () {
        this._hash = new WordArray.init(H.slice(0));
    },
    _doProcessBlock: function (M, offset) {
        var H = this._hash.words;
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        var f = H[5];
        var g = H[6];
        var h = H[7];
        for (var i = 0; i < 64; i++) {
            if (i < 16) {
                W[i] = M[offset + i] | 0;
            }
            else {
                var gamma0x = W[i - 15];
                var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
                    (gamma0x >>> 3);
                var gamma1x = W[i - 2];
                var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
                    (gamma1x >>> 10);
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            var ch = (e & f) ^ (~e & g);
            var maj = (a & b) ^ (a & c) ^ (b & c);
            var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
            var t1 = h + sigma1 + ch + K[i] + W[i];
            var t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0;
        H[5] = (H[5] + f) | 0;
        H[6] = (H[6] + g) | 0;
        H[7] = (H[7] + h) | 0;
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;
        this._process();
        return this._hash;
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
    }
});
module.exports = SHA256;
var WordArray = require("./core_x32_wordArray");
var algo_sha256 = require("./algo_sha256");
var SHA224 = algo_sha256.extend({
    _doReset: function () {
        this._hash = new WordArray.init([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
    },
    _doFinalize: function () {
        var hash = algo_sha256._doFinalize.call(this);
        hash.sigBytes -= 4;
        return hash;
    }
});
module.exports = SHA224;
let Base = require("./core_base");
var X64Word = Base.extend({
    init: function (high, low) {
        this.high = high;
        this.low = low;
    },
    not: function () {
        var high = ~this.high;
        var low = ~this.low;
        return X64Word.create(high, low);
    },
    and: function (word) {
        var high = this.high & word.high;
        var low = this.low & word.low;
        return X64Word.create(high, low);
    },
    or: function (word) {
        var high = this.high | word.high;
        var low = this.low | word.low;
        return X64Word.create(high, low);
    },
    xor: function (word) {
        var high = this.high ^ word.high;
        var low = this.low ^ word.low;
        return X64Word.create(high, low);
    },
    shiftL: function (n) {
        if (n < 32) {
            var high = (this.high << n) | (this.low >>> (32 - n));
            var low = this.low << n;
        }
        else {
            var high = this.low << (n - 32);
            var low = 0;
        }
        return X64Word.create(high, low);
    },
    shiftR: function (n) {
        if (n < 32) {
            var low = (this.low >>> n) | (this.high << (32 - n));
            var high = this.high >>> n;
        }
        else {
            var low = this.high >>> (n - 32);
            var high = 0;
        }
        return X64Word.create(high, low);
    },
    rotL: function (n) {
        return this.shiftL(n).or(this.shiftR(64 - n));
    },
    rotR: function (n) {
        return this.shiftR(n).or(this.shiftL(64 - n));
    },
    add: function (word) {
        var low = (this.low + word.low) | 0;
        var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        var high = (this.high + word.high + carry) | 0;
        return X64Word.create(high, low);
    }
});
module.exports = X64Word;
var WordArray = require("./core_x32_wordArray");
var Hasher = require("./core_hasher");
var X64Word = require("./core_x64_word");
var RHO_OFFSETS = [];
var PI_INDEXES = [];
var ROUND_CONSTANTS = [];
(function () {
    var x = 1, y = 0;
    for (var t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
        var newX = y % 5;
        var newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
    }
    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
            PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
        }
    }
    var LFSR = 0x01;
    for (var i = 0; i < 24; i++) {
        var roundConstantMsw = 0;
        var roundConstantLsw = 0;
        for (var j = 0; j < 7; j++) {
            if (LFSR & 0x01) {
                var bitPosition = (1 << j) - 1;
                if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                }
                else {
                    roundConstantMsw ^= 1 << (bitPosition - 32);
                }
            }
            if (LFSR & 0x80) {
                LFSR = (LFSR << 1) ^ 0x71;
            }
            else {
                LFSR <<= 1;
            }
        }
        ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
    }
}());
var T = [];
(function () {
    for (var i = 0; i < 25; i++) {
        T[i] = X64Word.create();
    }
}());
var SHA3 = Hasher.extend({
    cfg: Hasher.cfg.extend({
        outputLength: 512
    }),
    _doReset: function () {
        var state = this._state = [];
        for (var i = 0; i < 25; i++) {
            state[i] = new X64Word.init();
        }
        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
    },
    _doProcessBlock: function (M, offset) {
        var state = this._state;
        var nBlockSizeLanes = this.blockSize / 2;
        for (var i = 0; i < nBlockSizeLanes; i++) {
            var M2i = M[offset + 2 * i];
            var M2i1 = M[offset + 2 * i + 1];
            M2i = ((((M2i << 8) | (M2i >>> 24)) & 0x00ff00ff) |
                (((M2i << 24) | (M2i >>> 8)) & 0xff00ff00));
            M2i1 = ((((M2i1 << 8) | (M2i1 >>> 24)) & 0x00ff00ff) |
                (((M2i1 << 24) | (M2i1 >>> 8)) & 0xff00ff00));
            var lane = state[i];
            lane.high ^= M2i1;
            lane.low ^= M2i;
        }
        for (var round = 0; round < 24; round++) {
            for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
            }
            for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
                var tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
                for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                }
            }
            for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var tMsw;
                var tLsw;
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                    tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
                    tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
                }
                else {
                    tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
                    tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
            }
            var T0 = T[0];
            var state0 = state[0];
            T0.high = state0.high;
            T0.low = state0.low;
            for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[((x + 1) % 5) + 5 * y];
                    var Tx2Lane = T[((x + 2) % 5) + 5 * y];
                    lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
                    lane.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
                }
            }
            var lane = state[0];
            var roundConstant = ROUND_CONSTANTS[round];
            lane.high ^= roundConstant.high;
            lane.low ^= roundConstant.low;
        }
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        var blockSizeBits = this.blockSize * 32;
        dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
        dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
        data.sigBytes = dataWords.length * 4;
        this._process();
        var state = this._state;
        var outputLengthBytes = this.cfg.outputLength / 8;
        var outputLengthLanes = outputLengthBytes / 8;
        var hashWords = [];
        for (var i = 0; i < outputLengthLanes; i++) {
            var lane = state[i];
            var laneMsw = lane.high;
            var laneLsw = lane.low;
            laneMsw = ((((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff) |
                (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00));
            laneLsw = ((((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff) |
                (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00));
            hashWords.push(laneLsw);
            hashWords.push(laneMsw);
        }
        return new WordArray.init(hashWords, outputLengthBytes);
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        var state = clone._state = this._state.slice(0);
        for (var i = 0; i < 25; i++) {
            state[i] = state[i].clone();
        }
        return clone;
    }
});
module.exports = SHA3;
let Base = require("./core_base");
var X64WordArray = Base.extend({
    init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
            this.sigBytes = sigBytes;
        }
        else {
            this.sigBytes = words.length * 8;
        }
    },
    toX32: function () {
        var x64Words = this.words;
        var x64WordsLength = x64Words.length;
        var x32Words = [];
        for (var i = 0; i < x64WordsLength; i++) {
            var x64Word = x64Words[i];
            x32Words.push(x64Word.high);
            x32Words.push(x64Word.low);
        }
        return X32WordArray.create(x32Words, this.sigBytes);
    },
    clone: function () {
        var clone = Base.clone.call(this);
        var words = clone.words = this.words.slice(0);
        var wordsLength = words.length;
        for (var i = 0; i < wordsLength; i++) {
            words[i] = words[i].clone();
        }
        return clone;
    }
});
var Hasher = require("./core_hasher");
var X64Word = require("./core_x64_word");
var X64WordArray = require("./core_x64_wordArray");
function X64Word_create() {
    return X64Word.create.apply(X64Word, arguments);
}
var K = [
    X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
    X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
    X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
    X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
    X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
    X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
    X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
    X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
    X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
    X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
    X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
    X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
    X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
    X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
    X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
    X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
    X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
    X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
    X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
    X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
    X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
    X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
    X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
    X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
    X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
    X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
    X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
    X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
    X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
    X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
    X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
    X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
    X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
    X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
    X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
    X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
    X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
    X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
    X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
    X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
];
var W = [];
(function () {
    for (var i = 0; i < 80; i++) {
        W[i] = X64Word_create();
    }
}());
var SHA512 = Hasher.extend({
    _doReset: function () {
        this._hash = new X64WordArray.init([
            new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
            new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
            new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
            new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
        ]);
    },
    _doProcessBlock: function (M, offset) {
        var H = this._hash.words;
        var H0 = H[0];
        var H1 = H[1];
        var H2 = H[2];
        var H3 = H[3];
        var H4 = H[4];
        var H5 = H[5];
        var H6 = H[6];
        var H7 = H[7];
        var H0h = H0.high;
        var H0l = H0.low;
        var H1h = H1.high;
        var H1l = H1.low;
        var H2h = H2.high;
        var H2l = H2.low;
        var H3h = H3.high;
        var H3l = H3.low;
        var H4h = H4.high;
        var H4l = H4.low;
        var H5h = H5.high;
        var H5l = H5.low;
        var H6h = H6.high;
        var H6l = H6.low;
        var H7h = H7.high;
        var H7l = H7.low;
        var ah = H0h;
        var al = H0l;
        var bh = H1h;
        var bl = H1l;
        var ch = H2h;
        var cl = H2l;
        var dh = H3h;
        var dl = H3l;
        var eh = H4h;
        var el = H4l;
        var fh = H5h;
        var fl = H5l;
        var gh = H6h;
        var gl = H6l;
        var hh = H7h;
        var hl = H7l;
        for (var i = 0; i < 80; i++) {
            var Wil;
            var Wih;
            var Wi = W[i];
            if (i < 16) {
                Wih = Wi.high = M[offset + i * 2] | 0;
                Wil = Wi.low = M[offset + i * 2 + 1] | 0;
            }
            else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
                var gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                var gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                Wil = Wil + gamma1l;
                Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                Wil = Wil + Wi16l;
                Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
            }
            var chh = (eh & fh) ^ (~eh & gh);
            var chl = (el & fl) ^ (~el & gl);
            var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
            var majl = (al & bl) ^ (al & cl) ^ (bl & cl);
            var sigma0h = ((ah >>> 28) | (al << 4)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
            var sigma0l = ((al >>> 28) | (ah << 4)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
            var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
            var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
            var Ki = K[i];
            var Kih = Ki.high;
            var Kil = Ki.low;
            var t1l = hl + sigma1l;
            var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
            var t1l = t1l + chl;
            var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
            var t1l = t1l + Kil;
            var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
            var t1l = t1l + Wil;
            var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
            var t2l = sigma0l + majl;
            var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = (dl + t1l) | 0;
            eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = (t1l + t2l) | 0;
            ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
        }
        H0l = H0.low = (H0l + al);
        H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
        H1l = H1.low = (H1l + bl);
        H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
        H2l = H2.low = (H2l + cl);
        H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
        H3l = H3.low = (H3l + dl);
        H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
        H4l = H4.low = (H4l + el);
        H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
        H5l = H5.low = (H5l + fl);
        H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
        H6l = H6.low = (H6l + gl);
        H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
        H7l = H7.low = (H7l + hl);
        H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
    },
    _doFinalize: function () {
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;
        this._process();
        var hash = this._hash.toX32();
        return hash;
    },
    clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
    },
    blockSize: 1024 / 32
});
module.exports = SHA512;
var X64Word = require("./core_x64_word");
var X64WordArray = require("./core_x64_wordArray");
var algo_sha512 = require("./algo_sha512");
var SHA384 = algo_sha512.extend({
    _doReset: function () {
        this._hash = new X64WordArray.init([
            new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
            new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
            new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
            new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
        ]);
    },
    _doFinalize: function () {
        var hash = algo_sha512._doFinalize.call(this);
        hash.sigBytes -= 16;
        return hash;
    }
});
module.exports = SHA384;
var BlockCipher = require("./helper_blockCipher");
var algo_des = require("./algo_des");
var TripleDES = BlockCipher.extend({
    _doReset: function () {
        var key = this._key;
        var keyWords = key.words;
        this._des1 = algo_des.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
        this._des2 = algo_des.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
        this._des3 = algo_des.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
    },
    encryptBlock: function (M, offset) {
        this._des1.encryptBlock(M, offset);
        this._des2.decryptBlock(M, offset);
        this._des3.encryptBlock(M, offset);
    },
    decryptBlock: function (M, offset) {
        this._des3.decryptBlock(M, offset);
        this._des2.encryptBlock(M, offset);
        this._des1.decryptBlock(M, offset);
    },
    keySize: 192 / 32,
    ivSize: 64 / 32,
    blockSize: 64 / 32
});
module.exports = TripleDES;
let Easy = {};
Easy.encrypt = function (code, key, cfg) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
};
Easy.decrypt = function (code, key, cfg) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};
module.exports = Easy;
let BlockCipher = require("./helper_blockCipher");
let algo_aes = require("./algo_aes");
let Utf8 = require("./encoder_utf8");
let CBC = require("./mode_cbc");
let Pkcs7 = require("./pad_pkcs7");
let _AES = BlockCipher._createHelper(algo_aes);
var AES = {};
AES.encrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("aes key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let enStr = _AES.encrypt(code, newKey, cfg);
    enStr = enStr.toString();
    return enStr;
};
AES.decrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("aes key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let deStr = _AES.decrypt(code, newKey, cfg);
    let utf8Str = deStr.toString(Utf8);
    return utf8Str;
};
module.exports = AES;
var BlockCipher = require("./helper_blockCipher");
var Utf8 = require("./encoder_utf8");
var CBC = require("./mode_cbc");
var Pkcs7 = require("./pad_pkcs7");
var algo_des = require("./algo_des");
let _DES = BlockCipher._createHelper(algo_des);
var DES = {};
DES.encrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("DES key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let enStr = _DES.encrypt(code, newKey, cfg);
    enStr = enStr.toString();
    return enStr;
};
DES.decrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("DES key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let deStr = _DES.decrypt(code, newKey, cfg);
    let utf8Str = deStr.toString(Utf8);
    return utf8Str;
};
module.exports = DES;
let algo_rabbit = require("./algo_rabbit");
let StreamCipher = require("./helper_streamCipher");
let _Rabbit = StreamCipher._createHelper(algo_rabbit);
var Rabbit = {};
Rabbit.encrypt = function (code, key, cfg) {
    let enStr = _Rabbit.encrypt(code, key, cfg);
    return enStr;
};
Rabbit.decrypt = function (code, key, cfg) {
    let deStr = _Rabbit.decrypt(code, key, cfg);
    return deStr;
};
module.exports = Rabbit;
let StreamCipher = require("./helper_streamCipher");
let algo_rabbitLegacy = require("./algo_rabbitLegacy");
let _RabbitLegacy = StreamCipher._createHelper(algo_rabbitLegacy);
var RabbitLegacy = {};
RabbitLegacy.encrypt = function (code, key, cfg) {
    let enStr = _RabbitLegacy.encrypt(code, key, cfg);
    return enStr;
};
RabbitLegacy.decrypt = function (code, key, cfg) {
    let deStr = _RabbitLegacy.decrypt(code, key, cfg);
    return deStr;
};
module.exports = RabbitLegacy;
var StreamCipher = require("./helper_streamCipher");
var algo_rc4 = require("./algo_rc4");
let _RC4 = StreamCipher._createHelper(algo_rc4);
var RC4 = {};
RC4.encrypt = function (code, key, cfg) {
    let enStr = _RC4.encrypt(code, key, cfg);
    return enStr;
};
RC4.decrypt = function (code, key, cfg) {
    let deStr = _RC4.decrypt(code, key, cfg);
    return deStr;
};
module.exports = RC4;
var StreamCipher = require("./helper_streamCipher");
var algo_rc4Drop = require("./algo_rc4Drop");
let _RC4Drop = StreamCipher._createHelper(algo_rc4Drop);
var RC4Drop = {};
RC4Drop.encrypt = function (code, key, cfg) {
    let enStr = _RC4Drop.encrypt(code, key, cfg);
    return enStr;
};
RC4Drop.decrypt = function (code, key, cfg) {
    let deStr = _RC4Drop.decrypt(code, key, cfg);
    return deStr;
};
module.exports = RC4Drop;
var BlockCipher = require("./helper_blockCipher");
var algo_tripledes = require("./algo_des");
var Utf8 = require("./encoder_utf8");
var CBC = require("./mode_cbc");
var Pkcs7 = require("./pad_pkcs7");
let _TripleDES = BlockCipher._createHelper(algo_tripledes);
var TripleDES = {};
TripleDES.encrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("TripleDES key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let enStr = _TripleDES.encrypt(code, newKey, cfg);
    enStr = enStr.toString();
    return enStr;
};
TripleDES.decrypt = function (code, key, cfg) {
    if (key.length < 20) {
        console.error("TripleDES key is too short!");
        return code;
    }
    let newKey = Utf8.parse(key);
    if (!cfg) {
        cfg = {
            iv: Utf8.parse(key.substr(0, 16)),
            mode: CBC,
            padding: Pkcs7
        };
    }
    let deStr = _TripleDES.decrypt(code, newKey, cfg);
    let utf8Str = deStr.toString(Utf8);
    return utf8Str;
};
module.exports = TripleDES;
let Hasher = require("./core_hasher");
let algo_md5 = require("./algo_md5");
var _MD5 = Hasher._createHelper(algo_md5);
var MD5 = {};
MD5.encrypt = function (code, key, cfg) {
    let enStr = _MD5(code);
    return enStr;
};
MD5.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = MD5;
let algo_ripemd160 = require("./algo_ripemd160");
let Hasher = require("./core_hasher");
let _RIPEMD160 = Hasher._createHelper(algo_ripemd160);
var RIPEMD160 = {};
RIPEMD160.encrypt = function (code, key, cfg) {
    let enStr = _RIPEMD160(code);
    return enStr;
};
RIPEMD160.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = RIPEMD160;
let Hasher = require("./core_hasher");
let algo_sha1 = require("./algo_sha1");
var _SHA1 = Hasher._createHelper(algo_sha1);
var SHA1 = {};
SHA1.encrypt = function (code, key, cfg) {
    let enStr = _SHA1(code, key);
    return enStr;
};
SHA1.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = _SHA1;
let algo_sha3 = require("./algo_sha3");
let Hasher = require("./core_hasher");
let _SHA3 = Hasher._createHelper(algo_sha3);
var SHA3 = {};
SHA3.encrypt = function (code, key, cfg) {
    let enStr = _SHA3(code);
    return enStr;
};
SHA3.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = SHA3;
var algo_sha224 = require("./algo_sha224");
var algo_sha256 = require("./algo_sha256");
let _SHA224 = algo_sha256._createHelper(algo_sha224);
var SHA224 = {};
SHA224.encrypt = function (code, key, cfg) {
    let enStr = _SHA224(code, key, cfg);
    return enStr;
};
SHA224.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = SHA224;
var algo_sha256 = require("./algo_sha256");
var Hasher = require("./core_hasher");
let _SHA256 = Hasher._createHelper(algo_sha256);
var SHA256 = {};
SHA256.encrypt = function (code, key, cfg) {
    let enStr = _SHA256(code, key, cfg);
    return enStr;
};
SHA256.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = SHA256;
var algo_sha384 = require("./algo_sha384");
var algo_sha512 = require("./algo_sha512");
let _SHA384 = algo_sha512._createHelper(algo_sha384);
var SHA384 = {};
SHA384.encrypt = function (code, key, cfg) {
    let enStr = _SHA384(code, key, cfg);
    return enStr;
};
SHA384.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = SHA384;
var algo_sha512 = require("./algo_sha512");
var Hasher = require("./core_hasher");
let _SHA512 = Hasher._createHelper(algo_sha512);
var SHA512 = {};
SHA512.encrypt = function (code, key, cfg) {
    let enStr = _SHA512(code, key, cfg);
    return enStr;
};
SHA512.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = SHA512;
let Hasher = require("./core_hasher");
let algo_md5 = require("./algo_md5");
var _HmacMD5 = Hasher._createHmacHelper(algo_md5);
var HmacMD5 = {};
HmacMD5.encrypt = function (code, key, cfg) {
    let enStr = _HmacMD5(code, key);
    return enStr;
};
HmacMD5.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacMD5;
let algo_ripemd160 = require("./algo_ripemd160");
let Hasher = require("./core_hasher");
let _HmacRIPEMD160 = Hasher._createHmacHelper(algo_ripemd160);
var HmacRIPEMD160 = {};
HmacRIPEMD160.encrypt = function (code, key, cfg) {
    let enStr = _HmacRIPEMD160(code);
    return enStr;
};
HmacRIPEMD160.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacRIPEMD160;
let Hasher = require("./core_hasher");
let algo_sha1 = require("./algo_sha1");
var _HmacSHA1 = Hasher._createHmacHelper(algo_sha1);
var HmacSHA1 = {};
HmacSHA1.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA1(code, key);
    return enStr;
};
HmacSHA1.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA1;
let algo_sha3 = require("./algo_sha3");
let Hasher = require("./core_hasher");
let _HmacSHA3 = Hasher._createHmacHelper(algo_sha3);
var HmacSHA3 = {};
HmacSHA3.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA3(code);
    return enStr;
};
HmacSHA3.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA3;
var algo_sha224 = require("./algo_sha224");
var algo_sha256 = require("./algo_sha256");
let _HmacSHA224 = algo_sha256._createHmacHelper(algo_sha224);
var HmacSHA224 = {};
HmacSHA224.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA224(code, key, cfg);
    return enStr;
};
HmacSHA224.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA224;
var algo_sha256 = require("./algo_sha256");
var Hasher = require("./core_hasher");
let _HmacSHA256 = Hasher._createHmacHelper(algo_sha256);
var HmacSHA256 = {};
HmacSHA256.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA256(code, key, cfg);
    return enStr;
};
HmacSHA256.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA256;
var algo_sha384 = require("./algo_sha384");
var algo_sha512 = require("./algo_sha512");
let _HmacSHA384 = algo_sha512._createHmacHelper(algo_sha384);
var HmacSHA384 = {};
HmacSHA384.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA384(code, key, cfg);
    return enStr;
};
HmacSHA384.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA384;
var algo_sha512 = require("./algo_sha512");
var Hasher = require("./core_hasher");
let _HmacSHA512 = Hasher._createHmacHelper(algo_sha512);
var HmacSHA512 = {};
HmacSHA512.encrypt = function (code, key, cfg) {
    let enStr = _HmacSHA512(code, key, cfg);
    return enStr;
};
HmacSHA512.decrypt = function (code, key, cfg) {
    return code;
};
module.exports = HmacSHA512;
let _TYPE = {};
_TYPE.EASY = "0";
_TYPE.AES = "1";
_TYPE.DES = "2";
_TYPE.RABBIT = "3";
_TYPE.RABBIT_LEGACY = "4";
_TYPE.RC4 = "5";
_TYPE.RC4Drop = "6";
_TYPE.TRIPLE_DES = "7";
_TYPE.MD5 = "100";
_TYPE.RIPEMD160 = "101";
_TYPE.SHA1 = "102";
_TYPE.SHA3 = "103";
_TYPE.SHA224 = "104";
_TYPE.SHA256 = "105";
_TYPE.SHA384 = "106";
_TYPE.SHA512 = "107";
_TYPE.HMAC_MD5 = "200";
_TYPE.HMAC_RIPEMD160 = "201";
_TYPE.HMAC_SHA1 = "202";
_TYPE.HMAC_SHA3 = "203";
_TYPE.HMAC_SHA224 = "204";
_TYPE.HMAC_SHA256 = "205";
_TYPE.HMAC_SHA384 = "206";
_TYPE.HMAC_SHA512 = "207";
let _ENCRYPTION = {};
_ENCRYPTION[_TYPE.EASY] = require("./encyption_ed_easy");
_ENCRYPTION[_TYPE.AES] = require("./encyption_ed_aes");
_ENCRYPTION[_TYPE.DES] = require("./encyption_ed_des");
_ENCRYPTION[_TYPE.RABBIT] = require("./encyption_ed_rabbit");
_ENCRYPTION[_TYPE.RABBIT_LEGACY] = require("./encyption_ed_rabbitLegacy");
_ENCRYPTION[_TYPE.RC4] = require("./encyption_ed_rc4");
_ENCRYPTION[_TYPE.RC4Drop] = require("./encyption_ed_rc4Drop");
_ENCRYPTION[_TYPE.TRIPLE_DES] = require("./encyption_ed_tripledes");
_ENCRYPTION[_TYPE.MD5] = require("./encyption_md5");
_ENCRYPTION[_TYPE.RIPEMD160] = require("./encyption_ripemd160");
_ENCRYPTION[_TYPE.SHA1] = require("./encyption_sha1");
_ENCRYPTION[_TYPE.SHA3] = require("./encyption_sha3");
_ENCRYPTION[_TYPE.SHA224] = require("./encyption_sha224");
_ENCRYPTION[_TYPE.SHA256] = require("./encyption_sha256");
_ENCRYPTION[_TYPE.SHA384] = require("./encyption_sha384");
_ENCRYPTION[_TYPE.SHA512] = require("./encyption_sha512");
_ENCRYPTION[_TYPE.HMAC_MD5] = require("./encyption_hmac_md5");
_ENCRYPTION[_TYPE.HMAC_RIPEMD160] = require("./encyption_hmac_ripemd160");
_ENCRYPTION[_TYPE.HMAC_SHA1] = require("./encyption_hmac_sha1");
_ENCRYPTION[_TYPE.HMAC_SHA3] = require("./encyption_hmac_sha3");
_ENCRYPTION[_TYPE.HMAC_SHA224] = require("./encyption_hmac_sha224");
_ENCRYPTION[_TYPE.HMAC_SHA256] = require("./encyption_hmac_sha256");
_ENCRYPTION[_TYPE.HMAC_SHA384] = require("./encyption_hmac_sha384");
_ENCRYPTION[_TYPE.HMAC_SHA512] = require("./encyption_hmac_sha512");
let Encryption = {};
Encryption.TYPE = _TYPE;
Encryption.encrypt = function (code = "", configs = [{
        type: _TYPE.EASY,
        key: "",
        cfg: {}
    }]) {
    let result = code;
    while (configs.length > 0) {
        let config = configs.shift();
        if (config.type in _ENCRYPTION) {
            let encrypt = _ENCRYPTION[config.type].encrypt;
            if (typeof encrypt == "function") {
                let key = config.key || "";
                let cfg = config.cfg || undefined;
                result = encrypt(result, key, cfg);
            }
        }
    }
    return result;
};
Encryption.decrypt = function (code = "", configs = [{
        type: _TYPE.EASY,
        key: "",
        cfg: {}
    }]) {
    let result = code;
    while (configs.length > 0) {
        let config = configs.pop();
        if (config.type in _ENCRYPTION) {
            let decrypt = _ENCRYPTION[config.type].decrypt;
            if (typeof decrypt == "function") {
                let key = config.key || "";
                let cfg = config.cfg || undefined;
                result = decrypt(result, key, cfg);
            }
        }
    }
    return result;
};
module.exports = Encryption;
let WordArray = require("./core_x32_wordArray");
var Utf16BE = {
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
            var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
            utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
    },
    parse: function (utf16Str) {
        var utf16StrLength = utf16Str.length;
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
        }
        return WordArray.create(words, utf16StrLength * 2);
    }
};
module.exports = Utf16BE;
let WordArray = require("./core_x32_wordArray");
function swapEndian(word) {
    return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
}
var Utf16LE = {
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
            var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
            utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
    },
    parse: function (utf16Str) {
        var utf16StrLength = utf16Str.length;
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
        }
        return WordArray.create(words, utf16StrLength * 2);
    }
};
module.exports = Utf16LE;
let CipherParams = require("./helper_cipherParams");
let Hex = require("./encoder_hex");
var HexFormatter = {
    stringify: function (cipherParams) {
        return cipherParams.ciphertext.toString(Hex);
    },
    parse: function (input) {
        var ciphertext = Hex.parse(input);
        return CipherParams.create({
            ciphertext: ciphertext
        });
    }
};
module.exports = HexFormatter;
let Base = require("./core_base");
let WordArray = require("./core_x32_wordArray");
let SHA1 = require("./algo_sha1");
let HMAC = require("./algo_hmac");
var PBKDF2 = Base.extend({
    cfg: Base.extend({
        keySize: 128 / 32,
        hasher: SHA1,
        iterations: 1
    }),
    init: function (cfg) {
        this.cfg = this.cfg.extend(cfg);
    },
    compute: function (password, salt) {
        var cfg = this.cfg;
        var hmac = HMAC.create(cfg.hasher, password);
        var derivedKey = WordArray.create();
        var blockIndex = WordArray.create([0x00000001]);
        var derivedKeyWords = derivedKey.words;
        var blockIndexWords = blockIndex.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;
        while (derivedKeyWords.length < keySize) {
            var block = hmac.update(salt).finalize(blockIndex);
            hmac.reset();
            var blockWords = block.words;
            var blockWordsLength = blockWords.length;
            var intermediate = block;
            for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                }
            }
            derivedKey.concat(block);
            blockIndexWords[0]++;
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
    }
});
module.exports = PBKDF2;
let BlockCipherMode = require("./helper_blockCipherMode");
var CFB = (function () {
    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        var keystream;
        var iv = this._iv;
        if (iv) {
            keystream = iv.slice(0);
            this._iv = undefined;
        }
        else {
            keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }
    var CFB = BlockCipherMode.extend();
    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });
    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
        }
    });
    return CFB;
}());
module.exports = CFB;
let BlockCipherMode = require("./helper_blockCipherMode");
var CTR = (function () {
    var CTR = BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
}());
module.exports = CTR;
let BlockCipherMode = require("./helper_blockCipherMode");
var CTRGladman = (function () {
    var CTRGladman = BlockCipherMode.extend();
    function incWord(word) {
        if (((word >> 24) & 0xff) === 0xff) {
            var b1 = (word >> 16) & 0xff;
            var b2 = (word >> 8) & 0xff;
            var b3 = word & 0xff;
            if (b1 === 0xff) {
                b1 = 0;
                if (b2 === 0xff) {
                    b2 = 0;
                    if (b3 === 0xff) {
                        b3 = 0;
                    }
                    else {
                        ++b3;
                    }
                }
                else {
                    ++b2;
                }
            }
            else {
                ++b1;
            }
            word = 0;
            word += (b1 << 16);
            word += (b2 << 8);
            word += b3;
        }
        else {
            word += (0x01 << 24);
        }
        return word;
    }
    function incCounter(counter) {
        if ((counter[0] = incWord(counter[0])) === 0) {
            counter[1] = incWord(counter[1]);
        }
        return counter;
    }
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = undefined;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    CTRGladman.Decryptor = Encryptor;
    return CTRGladman;
}());
module.exports = CTRGladman;
let BlockCipherMode = require("./helper_blockCipherMode");
var ECB = (function () {
    var ECB = BlockCipherMode.extend();
    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });
    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });
    return ECB;
}());
module.exports = ECB;
let BlockCipherMode = require("./helper_blockCipherMode");
var OFB = (function () {
    var OFB = BlockCipherMode.extend();
    var Encryptor = OFB.Encryptor = OFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = undefined;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    OFB.Decryptor = Encryptor;
    return OFB;
}());
module.exports = OFB;
var AnsiX923 = {
    pad: function (data, blockSize) {
        var dataSigBytes = data.sigBytes;
        var blockSizeBytes = blockSize * 4;
        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
        var lastBytePos = dataSigBytes + nPaddingBytes - 1;
        data.clamp();
        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
        data.sigBytes += nPaddingBytes;
    },
    unpad: function (data) {
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        data.sigBytes -= nPaddingBytes;
    }
};
module.exports = AnsiX923;
var Iso10126 = {
    pad: function (data, blockSize) {
        var blockSizeBytes = blockSize * 4;
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
            concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },
    unpad: function (data) {
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        data.sigBytes -= nPaddingBytes;
    }
};
module.exports = Iso10126;
var Iso97971 = {
    pad: function (data, blockSize) {
        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },
    unpad: function (data) {
        CryptoJS.pad.ZeroPadding.unpad(data);
        data.sigBytes--;
    }
};
module.exports = Iso97971;
var NoPadding = {
    pad: function () {
    },
    unpad: function () {
    }
};
module.exports = NoPadding;
var ZeroPadding = {
    pad: function (data, blockSize) {
        var blockSizeBytes = blockSize * 4;
        data.clamp();
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
    },
    unpad: function (data) {
        var dataWords = data.words;
        var i = data.sigBytes - 1;
        for (var i = data.sigBytes - 1; i >= 0; i--) {
            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
                data.sigBytes = i + 1;
                break;
            }
        }
    }
};
module.exports = ZeroPadding;
let Queue = {};
Queue.create = function () {
    let _data = [];
    function queue(t_data, t_compare) { }
    ;
    queue.prototype.enqueue = function (element) {
        _data.push(element);
    };
    queue.prototype.dequeue = function () {
        if (this.empty()) {
            return null;
        }
        else {
            return _data.shift();
        }
    };
    queue.prototype.front = function () {
        if (this.empty()) {
            return null;
        }
        else {
            return _data[0];
        }
    };
    queue.prototype.back = function () {
        if (this.empty()) {
            return null;
        }
        else {
            return _data[_data.length - 1];
        }
    };
    queue.prototype.empty = function () {
        if (_data.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    queue.prototype.toString = function (delimit = "\n") {
        let str = _data.join(delimit);
        return str;
    };
    queue.prototype.size = function () {
        return _data.length;
    };
    queue.prototype.clear = function () {
        _data = [];
    };
    return new queue(data, compare);
};
module.exports = Queue;
let RBush = {};
RBush.create = function (maxEntries) {
    let _maxEntries = 0;
    let _data = null;
    function rbush(t_maxEntries = 9) {
        _maxEntries = Math.max(4, t_maxEntries);
        _maxEntries = Math.max(2, Math.ceil(_maxEntries * 0.4));
        this.clear();
    }
    ;
    rbush.prototype.all = function all() {
        return this._all(_data, []);
    };
    rbush.prototype.search = function search(bbox) {
        var node = _data;
        var result = [];
        if (!intersects(bbox, node)) {
            return result;
        }
        var toBBox = this.toBBox;
        var nodesToSearch = [];
        while (node) {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                var childBBox = node.leaf ? toBBox(child) : child;
                if (intersects(bbox, childBBox)) {
                    if (node.leaf) {
                        result.push(child);
                    }
                    else if (contains(bbox, childBBox)) {
                        this._all(child, result);
                    }
                    else {
                        nodesToSearch.push(child);
                    }
                }
            }
            node = nodesToSearch.pop();
        }
        return result;
    };
    rbush.prototype.collides = function collides(bbox) {
        var node = _data;
        if (!intersects(bbox, node)) {
            return false;
        }
        var nodesToSearch = [];
        while (node) {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                var childBBox = node.leaf ? this.toBBox(child) : child;
                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) {
                        return true;
                    }
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }
        return false;
    };
    rbush.prototype.load = function load(data) {
        if (!(data && data.length)) {
            return this;
        }
        if (data.length < _maxEntries) {
            for (var i = 0; i < data.length; i++) {
                this.insert(data[i]);
            }
            return this;
        }
        var node = this._build(data.slice(), 0, data.length - 1, 0);
        if (!_data.children.length) {
            _data = node;
        }
        else if (_data.height === node.height) {
            this._splitRoot(_data, node);
        }
        else {
            if (_data.height < node.height) {
                var tmpNode = _data;
                _data = node;
                node = tmpNode;
            }
            this._insert(node, _data.height - node.height - 1, true);
        }
        return this;
    };
    rbush.prototype.insert = function insert(item) {
        if (item) {
            this._insert(item, _data.height - 1);
        }
        return this;
    };
    rbush.prototype.clear = function clear() {
        _data = createNode([]);
        return this;
    };
    rbush.prototype.remove = function remove(item, equalsFn) {
        if (!item) {
            return this;
        }
        var node = _data;
        var bbox = this.toBBox(item);
        var path = [];
        var indexes = [];
        var i, parent, goingUp;
        while (node || path.length) {
            if (!node) {
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }
            if (node.leaf) {
                var index = findItem(item, node.children, equalsFn);
                if (index !== -1) {
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }
            if (!goingUp && !node.leaf && contains(node, bbox)) {
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];
            }
            else if (parent) {
                i++;
                node = parent.children[i];
                goingUp = false;
            }
            else {
                node = null;
            }
        }
        return this;
    };
    rbush.prototype.toBBox = function toBBox(item) { return item; };
    rbush.prototype.compareMinX = function compareMinX(a, b) { return a.minX - b.minX; };
    rbush.prototype.compareMinY = function compareMinY(a, b) { return a.minY - b.minY; };
    rbush.prototype.toJSON = function toJSON() { return _data; };
    rbush.prototype.fromJSON = function fromJSON(data) {
        _data = data;
        return this;
    };
    rbush.prototype._all = function _all(node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) {
                result.push.apply(result, node.children);
            }
            else {
                nodesToSearch.push.apply(nodesToSearch, node.children);
            }
            node = nodesToSearch.pop();
        }
        return result;
    };
    rbush.prototype._build = function _build(items, left, right, height) {
        var N = right - left + 1;
        var M = _maxEntries;
        var node;
        if (N <= M) {
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }
        if (!height) {
            height = Math.ceil(Math.log(N) / Math.log(M));
            M = Math.ceil(N / Math.pow(M, height - 1));
        }
        node = createNode([]);
        node.leaf = false;
        node.height = height;
        var N2 = Math.ceil(N / M);
        var N1 = N2 * Math.ceil(Math.sqrt(M));
        multiSelect(items, left, right, N1, this.compareMinX);
        for (var i = left; i <= right; i += N1) {
            var right2 = Math.min(i + N1 - 1, right);
            multiSelect(items, i, right2, N2, this.compareMinY);
            for (var j = i; j <= right2; j += N2) {
                var right3 = Math.min(j + N2 - 1, right2);
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }
        calcBBox(node, this.toBBox);
        return node;
    };
    rbush.prototype._chooseSubtree = function _chooseSubtree(bbox, node, level, path) {
        while (true) {
            path.push(node);
            console.log("RBush - chooseSubtree - node:", node);
            if (node.leaf || path.length - 1 === level) {
                break;
            }
            var minArea = Infinity;
            var minEnlargement = Infinity;
            var targetNode = (void 0);
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                var area = bboxArea(child);
                var enlargement = enlargedArea(bbox, child) - area;
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;
                }
                else if (enlargement === minEnlargement) {
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }
            node = targetNode || node.children[0];
        }
        return node;
    };
    rbush.prototype._insert = function _insert(item, level, isNode) {
        var bbox = isNode ? item : this.toBBox(item);
        var insertPath = [];
        var node = this._chooseSubtree(bbox, _data, level, insertPath);
        node.children.push(item);
        extend(node, bbox);
        while (level >= 0) {
            if (insertPath[level].children.length > _maxEntries) {
                this._split(insertPath, level);
                level--;
            }
            else {
                break;
            }
        }
        this._adjustParentBBoxes(bbox, insertPath, level);
    };
    rbush.prototype._split = function _split(insertPath, level) {
        var node = insertPath[level];
        var M = node.children.length;
        var m = _maxEntries;
        this._chooseSplitAxis(node, m, M);
        var splitIndex = this._chooseSplitIndex(node, m, M);
        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;
        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);
        if (level) {
            insertPath[level - 1].children.push(newNode);
        }
        else {
            this._splitRoot(node, newNode);
        }
    };
    rbush.prototype._splitRoot = function _splitRoot(node, newNode) {
        _data = createNode([node, newNode]);
        _data.height = node.height + 1;
        _data.leaf = false;
        calcBBox(_data, this.toBBox);
    };
    rbush.prototype._chooseSplitIndex = function _chooseSplitIndex(node, m, M) {
        var index;
        var minOverlap = Infinity;
        var minArea = Infinity;
        for (var i = m; i <= M - m; i++) {
            var bbox1 = distBBox(node, 0, i, this.toBBox);
            var bbox2 = distBBox(node, i, M, this.toBBox);
            var overlap = intersectionArea(bbox1, bbox2);
            var area = bboxArea(bbox1) + bboxArea(bbox2);
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;
                minArea = area < minArea ? area : minArea;
            }
            else if (overlap === minOverlap) {
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }
        return index;
    };
    rbush.prototype._chooseSplitAxis = function _chooseSplitAxis(node, m, M) {
        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
        var compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
        var xMargin = this._allDistMargin(node, m, M, compareMinX);
        var yMargin = this._allDistMargin(node, m, M, compareMinY);
        if (xMargin < yMargin) {
            node.children.sort(compareMinX);
        }
    };
    rbush.prototype._allDistMargin = function _allDistMargin(node, m, M, compare) {
        node.children.sort(compare);
        var toBBox = this.toBBox;
        var leftBBox = distBBox(node, 0, m, toBBox);
        var rightBBox = distBBox(node, M - m, M, toBBox);
        var margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
        for (var i = m; i < M - m; i++) {
            var child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }
        for (var i$1 = M - m - 1; i$1 >= m; i$1--) {
            var child$1 = node.children[i$1];
            extend(rightBBox, node.leaf ? toBBox(child$1) : child$1);
            margin += bboxMargin(rightBBox);
        }
        return margin;
    };
    rbush.prototype._adjustParentBBoxes = function _adjustParentBBoxes(bbox, path, level) {
        for (var i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    };
    rbush.prototype._condense = function _condense(path) {
        for (var i = path.length - 1, siblings = (void 0); i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);
                }
                else {
                    this.clear();
                }
            }
            else {
                calcBBox(path[i], this.toBBox);
            }
        }
    };
    rbush.prototype.data = function data() {
        return _data;
    };
    function findItem(item, items, equalsFn) {
        if (!equalsFn) {
            return items.indexOf(item);
        }
        for (var i = 0; i < items.length; i++) {
            if (equalsFn(item, items[i])) {
                return i;
            }
        }
        return -1;
    }
    function calcBBox(node, toBBox) {
        distBBox(node, 0, node.children.length, toBBox, node);
    }
    function distBBox(node, k, p, toBBox, destNode) {
        if (!destNode) {
            destNode = createNode(null);
        }
        destNode.minX = Infinity;
        destNode.minY = Infinity;
        destNode.maxX = -Infinity;
        destNode.maxY = -Infinity;
        for (var i = k; i < p; i++) {
            var child = node.children[i];
            extend(destNode, node.leaf ? toBBox(child) : child);
        }
        return destNode;
    }
    function extend(a, b) {
        a.minX = Math.min(a.minX, b.minX);
        a.minY = Math.min(a.minY, b.minY);
        a.maxX = Math.max(a.maxX, b.maxX);
        a.maxY = Math.max(a.maxY, b.maxY);
        return a;
    }
    function compareNodeMinX(a, b) { return a.minX - b.minX; }
    function compareNodeMinY(a, b) { return a.minY - b.minY; }
    function bboxArea(a) { return (a.maxX - a.minX) * (a.maxY - a.minY); }
    function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }
    function enlargedArea(a, b) {
        return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
            (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
    }
    function intersectionArea(a, b) {
        var minX = Math.max(a.minX, b.minX);
        var minY = Math.max(a.minY, b.minY);
        var maxX = Math.min(a.maxX, b.maxX);
        var maxY = Math.min(a.maxY, b.maxY);
        return Math.max(0, maxX - minX) *
            Math.max(0, maxY - minY);
    }
    function contains(a, b) {
        return a.minX <= b.minX &&
            a.minY <= b.minY &&
            b.maxX <= a.maxX &&
            b.maxY <= a.maxY;
    }
    function intersects(a, b) {
        return b.minX <= a.maxX &&
            b.minY <= a.maxY &&
            b.maxX >= a.minX &&
            b.maxY >= a.minY;
    }
    function createNode(children) {
        return {
            children: children,
            height: 1,
            leaf: true,
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };
    }
    function multiSelect(arr, left, right, n, compare) {
        var stack = [left, right];
        while (stack.length) {
            right = stack.pop();
            left = stack.pop();
            if (right - left <= n) {
                continue;
            }
            var mid = left + Math.ceil((right - left) / n / 2) * n;
            quickselect(arr, mid, left, right, compare);
            stack.push(left, mid, mid, right);
        }
    }
    function quickselect(arr, k, left, right, compare) {
        quickselectStep(arr, k, left || 0, right || (arr.length - 1), compare || defaultCompare);
    }
    ;
    function quickselectStep(arr, k, left, right, compare) {
        while (right > left) {
            if (right - left > 600) {
                var n = right - left + 1;
                var m = k - left + 1;
                var z = Math.log(n);
                var s = 0.5 * Math.exp(2 * z / 3);
                var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
                var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
                var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
                quickselectStep(arr, k, newLeft, newRight, compare);
            }
            var t = arr[k];
            var i = left;
            var j = right;
            swap(arr, left, k);
            if (compare(arr[right], t) > 0) {
                swap(arr, left, right);
            }
            while (i < j) {
                swap(arr, i, j);
                i++;
                j--;
                while (compare(arr[i], t) < 0) {
                    i++;
                }
                while (compare(arr[j], t) > 0) {
                    j--;
                }
            }
            if (compare(arr[left], t) === 0) {
                swap(arr, left, j);
            }
            else {
                j++;
                swap(arr, j, right);
            }
            if (j <= k) {
                left = j + 1;
            }
            if (k <= j) {
                right = j - 1;
            }
        }
    }
    ;
    function swap(arr, i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    ;
    function defaultCompare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    return new rbush(maxEntries);
};
module.exports = RBush;
let Stack = {};
Stack.create = function () {
    let _data = [];
    function stack() { }
    ;
    stack.prototype.push = function (element) {
        _data.push(element);
    };
    stack.prototype.pop = function () {
        return _data.pop();
    };
    stack.prototype.peek = function () {
        return _data[_data.length - 1];
    };
    stack.prototype.size = function () {
        return _data.length;
    };
    stack.prototype.clear = function () {
        _data = [];
    };
    stack.prototype.toString = function (delimit = "\n") {
        let str = _data.join(delimit);
        return str;
    };
    stack.prototype.empty = function () {
        if (_data.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return new stack();
};
module.exports = Stack;
let Unordered_map = {};
Unordered_map.create = function () {
    let length = 0;
    let _data = new Object();
    function unordered_map() { }
    ;
    unordered_map.prototype.put = function (key, value) {
        let isSuccess = false;
        if (!this.isValidKey(key)) {
            console.error("unorder_map - put - invalid key");
        }
        else {
            if (!this.containsKey(key)) {
                length++;
                _data[key] = value;
                isSuccess = true;
            }
            else {
                console.error("The key(" + key + ") is exsit in HashMap, please use a new key");
            }
        }
        return isSuccess;
    };
    unordered_map.prototype.get = function (key) {
        if (this.containsKey(key)) {
            return _data[key];
        }
        else {
            return null;
        }
    };
    unordered_map.prototype.remove = function (key) {
        if (delete _data[key]) {
            length--;
        }
    };
    unordered_map.prototype.clear = function () {
        if (this.empty()) {
            return;
        }
        for (let prop in _data) {
            delete _data[prop];
        }
        length = 0;
    };
    unordered_map.prototype.values = function () {
        let values = new Array();
        for (let prop in _data) {
            values.push(_data[prop]);
        }
        return values;
    };
    unordered_map.prototype.keys = function () {
        let keys = new Array();
        for (let prop in _data) {
            keys.push(prop);
        }
        return keys;
    };
    unordered_map.prototype.size = function () {
        return length;
    };
    unordered_map.prototype.empty = function () {
        return length == 0;
    };
    unordered_map.prototype.serialize = function (delimit = "\n") {
        if (this.empty()) {
            return null;
        }
        let keys = this.keys();
        let str = "";
        for (let i in keys) {
            let key = keys[i];
            str = str + key + "=" + this.get(key) + delimit;
        }
        str = str.substring(0, str.length - 1).toString();
        return str;
    };
    unordered_map.prototype.equals = function (object) {
        return (_data == object);
    };
    unordered_map.prototype.clear = function () {
        length = 0;
        _data = new Object();
    };
    return new unordered_map();
};
module.exports = Unordered_map;
