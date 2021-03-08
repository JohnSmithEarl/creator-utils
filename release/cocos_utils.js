var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("algo/AlgoAStar", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sopt {
        constructor(x, y) {
            this.x = 0;
            this.y = 0;
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.parent = null;
            this.wall = false;
            this.neighbors = [];
            this.x = x;
            this.y = y;
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.parent = undefined;
            this.wall = false;
            this.neighbors = [];
        }
        addNeighbors(grid, cols, rows) {
            let x = this.x;
            let y = this.y;
            if (y - 1 >= 0) {
                this.neighbors.push(grid[x][y - 1]);
            }
            if (x - 1 >= 0) {
                this.neighbors.push(grid[x - 1][y]);
            }
            if (x + 1 < cols) {
                this.neighbors.push(grid[x + 1][y]);
            }
            if (y + 1 < rows) {
                this.neighbors.push(grid[x][y + 1]);
            }
        }
    }
    ;
    class AlgoAStar {
        constructor(mapData, startPos, endPos, passTag) {
            this.startPos = null;
            this.endPos = null;
            this.rows = 0;
            this.cols = 0;
            this.map = [];
            this.grid = [];
            this.openList = [];
            this.closedList = [];
            this.startSopt = null;
            this.endSopt = null;
            this.pathList = [];
            this.startPos = startPos;
            this.endPos = endPos;
            this.rows = mapData.length;
            this.cols = mapData[0].length;
            this.map = mapData;
            this.grid = [];
            this.openList = [];
            this.closedList = [];
            this.startSopt = null;
            this.endSopt = null;
            this.pathList = [];
            for (let i = 0; i < this.cols; i++) {
                this.grid[i] = [];
                for (let j = 0; j < this.rows; j++) {
                    this.grid[i][j] = new Sopt(i, j);
                    if (this.map[j][i] != passTag) {
                        this.grid[i][j]['wall'] = true;
                    }
                }
            }
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.grid[i][j].addNeighbors(this.grid, this.rows, this.cols);
                }
            }
            this.startSopt = this.grid[startPos.x][startPos.y];
            this.endSopt = this.grid[endPos.x][endPos.y];
            this.startSopt.wall = this.endSopt.wall = false;
            this.startSopt.g = 0;
            this.startSopt.h = Math.abs(this.endSopt.x - this.startSopt.x) + Math.abs(this.endSopt.y - this.startSopt.y);
            this.startSopt.f = this.startSopt.g + this.startSopt.h;
            this.openList.push(this.startSopt);
        }
        getPath() {
            if (this.openList.length > 0) {
                let currIndex = 0;
                let curr = null;
                for (let i = 0; i < this.openList.length; i++) {
                    if (this.openList[i].f < this.openList[currIndex].f) {
                        currIndex = i;
                    }
                }
                curr = this.openList[currIndex];
                if (curr === this.endSopt) {
                    let pathList = this._getPath(curr);
                    return pathList;
                }
                else {
                    this.removeFromArray(this.openList, curr);
                    this.closedList.push(curr);
                    for (let i = 0; i < curr.neighbors.length; i++) {
                        let neighbor = curr.neighbors[i];
                        if (!this.closedList.includes(neighbor) && !neighbor.wall) {
                            let tmpF = curr.g + this.getG(curr, neighbor) + this.getH(neighbor);
                            let newPath = false;
                            if (this.openList.includes(neighbor)) {
                                if (tmpF <= neighbor.f) {
                                    neighbor.f = tmpF;
                                    newPath = true;
                                }
                            }
                            else {
                                neighbor.g = curr.g + this.getG(curr, neighbor);
                                neighbor.h = this.getH(neighbor);
                                neighbor.f = neighbor.g + neighbor.h;
                                newPath = true;
                                this.openList.push(neighbor);
                            }
                            if (newPath) {
                                neighbor.parent = curr;
                            }
                        }
                    }
                    this.getPath();
                    return this.pathList;
                }
            }
            else {
                return this.pathList;
            }
        }
        _getPath(curr) {
            if (curr.parent) {
                let v2 = cc.v2(curr.parent.x, curr.parent.y);
                this.pathList.push(v2);
                return this._getPath(curr.parent);
            }
            else {
                this.pathList.reverse();
                this.pathList.shift();
                let v2 = cc.v2(this.endPos.x, this.endPos.y);
                this.pathList.push(v2);
                return this.pathList;
            }
        }
        removeFromArray(arr, elt) {
            arr.forEach((el, index) => {
                if (el == elt) {
                    arr.splice(index, 1);
                }
            });
        }
        ;
        getH(el) {
            return (Math.abs(this.endSopt.x - el.x) + Math.abs(el.y - el.y)) * 10;
        }
        getG(el1, el2) {
            let g = 0;
            if (Math.abs(el1.x - el2.x) == Math.abs(el1.y - el2.y)) {
                g = Math.abs(el1.x - el2.x) * 14;
            }
            else {
                let x = Math.abs(el1.x - el2.x);
                let y = Math.abs(el1.y - el2.y);
                g = (x + y) * 10;
            }
            return g;
        }
    }
    exports.AlgoAStar = AlgoAStar;
    ;
    exports.test = function () {
        console.log("test AlgoAStar\n\n");
        let arr2 = [
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        for (let j = 0; j < arr2.length; j++) {
            let arr1 = arr2[j];
            let line = '';
            if (arr1) {
                for (let i = 0; i < arr1.length; i++) {
                    let item = arr1[i];
                    line += item + ",";
                }
                line += "\n";
                console.log(line);
            }
        }
        let aStar = new AlgoAStar(arr2, cc.v2(0, 0), cc.v2(4, 0), 0);
        let paths = aStar.getPath();
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            console.log("==> ", path.y, path.x);
        }
        console.log("test AlgoAStar\n\n");
    };
});
define("algo/AlgoSearch", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class USearch {
        static sequentialSearch(arr, data) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == data) {
                    return i;
                }
            }
            return -1;
        }
        static binarySearch(arr, data) {
            var low = 0;
            var high = arr.length - 1;
            while (low <= high) {
                var middle = Math.floor((low + high) / 2);
                if (arr[middle] < data) {
                    low = middle + 1;
                }
                else if (arr[middle] > data) {
                    high = middle - 1;
                }
                else {
                    return middle;
                }
            }
            return -1;
        }
    }
    exports.USearch = USearch;
    ;
    exports.test = function () {
        let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
        console.log("\n\n 顺序查找");
        console.log(USearch.sequentialSearch(arr, 15));
        console.log("\n\n 二分查找");
        console.log(USearch.binarySearch(arr, 15));
    };
});
define("algo/AlgoSort", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class USort {
        static bubbleSort(arr) {
            var i = arr.length;
            while (i > 0) {
                var pos = 0;
                for (var j = 0; j < i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        pos = j;
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
                i = pos;
            }
            return arr;
        }
        static selectionSort(arr) {
            var len = arr.length;
            var minIndex, temp;
            for (var i = 0; i < len - 1; i++) {
                minIndex = i;
                for (var j = i + 1; j < len; j++) {
                    if (arr[j] < arr[minIndex]) {
                        minIndex = j;
                    }
                }
                temp = arr[minIndex];
                arr[minIndex] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
        static insertSort(arr) {
            var len = arr.length;
            for (let i = 1; i < len; i++) {
                var key = arr[i];
                var j = i - 1;
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
            return arr;
        }
        static shellSort(arr) {
            var len = arr.length;
            var temp, gap = 1;
            while (gap < len / 3) {
                gap = gap * 3 + 1;
            }
            while (gap >= 1) {
                for (var i = gap; i < len; i++) {
                    temp = arr[i];
                    for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                        arr[j + gap] = arr[j];
                    }
                    arr[j + gap] = temp;
                }
                gap = (gap - 1) / 3;
            }
            return arr;
        }
        static merge(left, right) {
            var result = [];
            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    result.push(left.shift());
                }
                else {
                    result.push(right.shift());
                }
            }
            while (left.length) {
                result.push(left.shift());
            }
            while (right.length) {
                result.push(right.shift());
            }
            return result;
        }
        static mergeSort(arr) {
            var len = arr.length;
            if (len < 2) {
                return arr;
            }
            var middle = Math.floor(len / 2);
            var left = arr.slice(0, middle);
            var right = arr.slice(middle);
            return USort.merge(USort.mergeSort(left), USort.mergeSort(right));
        }
        static quickSort(arr) {
            if (arr.length == 0) {
                return [];
            }
            var left = [];
            var right = [];
            var pivot = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < pivot) {
                    left.push(arr[i]);
                }
                else {
                    right.push(arr[i]);
                }
            }
            return USort.quickSort(left).concat(pivot, USort.quickSort(right));
        }
        static heapify(array, heapSize, index) {
            let largest = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            if (left < heapSize && array[left] > array[index]) {
                largest = left;
            }
            if (right < heapSize && array[right] > array[largest]) {
                largest = right;
            }
            if (largest !== index) {
                [array[index], array[largest]] = [array[largest], array[index]];
                USort.heapify(array, heapSize, largest);
            }
        }
        ;
        static buildHeap(array) {
            let heapSize = array.length;
            for (let i = heapSize; i >= 0; i--) {
                USort.heapify(array, heapSize, i);
            }
        }
        ;
        static heapSort(array) {
            let heapSize = array.length;
            USort.buildHeap(array);
            while (heapSize > 1) {
                heapSize--;
                [array[0], array[heapSize]] = [array[heapSize], array[0]];
                USort.heapify(array, heapSize, 0);
            }
            return array;
        }
    }
    exports.USort = USort;
    ;
    exports.test = function () {
        console.log("\n\n冒泡排序:");
        var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
        console.log(USort.bubbleSort(arr));
        console.log("\n\n选择排序:");
        console.log(USort.selectionSort(arr));
        console.log("\n\n插入排序:");
        console.log(USort.insertSort(arr));
        console.log("\n\n希尔排序:");
        console.log(USort.shellSort(arr));
        console.log("\n\n归并排序:");
        console.log(USort.mergeSort(arr));
        console.log("\n\n快速排序:");
        console.log(USort.quickSort(arr));
        console.log("\n\n堆排序:");
        console.log(USort.heapSort(arr));
    };
});
define("crypt/AES", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    let IV = "1234567812345678";
    class AES {
        static encrypt(text, key = KEY, iv = IV) {
            let ciphertext = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return CryptoJS.enc.Base64.stringify(ciphertext.ciphertext);
        }
        static decrypt(text, key = KEY, iv = IV) {
            let result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString(CryptoJS.enc.Utf8);
        }
    }
    exports.AES = AES;
    ;
});
define("crypt/Base64", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Base64 {
        static encrypt(plaintext) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let base64string = CryptoJS.enc.Base64.stringify(src);
            return base64string;
        }
        static decrypt(ciphertext) {
            let base64string = CryptoJS.enc.Base64.parse(ciphertext);
            let str = CryptoJS.enc.Utf8.stringify(base64string);
            return str;
        }
    }
    exports.Base64 = Base64;
});
define("crypt/DES", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    let IV = "1234567812345678";
    class DES {
        static encrypt(plaintext, key = KEY, iv = IV) {
            let encrypted = CryptoJS.DES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            });
            return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
        }
        static decrypt(ciphertext, key = KEY, iv = IV) {
            let result = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            let plaintext = result.toString(CryptoJS.enc.Utf8);
            return plaintext;
        }
        static encryptEBC(plaintext, key = KEY) {
            let keyHex = CryptoJS.enc.Utf8.parse(key);
            let encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            let strHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static decryptEBC(ciphertext, key = KEY) {
            let keyHex = CryptoJS.enc.Utf8.parse(key);
            let decrypted = CryptoJS.DES.decrypt(ciphertext, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            let strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
            return strUtf8;
        }
    }
    exports.DES = DES;
    ;
});
define("crypt/HASH", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HASH {
        static MD5(str) {
            let md5 = CryptoJS.MD5(str);
            let strHex = md5.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static RIPEMD160(str) {
            let ripemd160 = CryptoJS.RIPEMD160(str);
            let strHex = ripemd160.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA1(str) {
            let sha1 = CryptoJS.SHA1(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA3(str) {
            let sha1 = CryptoJS.SHA3(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA224(str) {
            let sha1 = CryptoJS.SHA224(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA256(str) {
            let sha1 = CryptoJS.SHA256(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA384(str) {
            let sha1 = CryptoJS.SHA384(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static SHA512(str) {
            let sha1 = CryptoJS.SHA512(str);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacMD5(str, key) {
            let sha1 = CryptoJS.HmacMD5(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacRIPEMD160(str, key) {
            let sha1 = CryptoJS.HmacRIPEMD160(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA1(str, key) {
            let sha1 = CryptoJS.HmacSHA1(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA3(str, key) {
            let sha1 = CryptoJS.HmacSHA3(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA224(str, key) {
            let sha1 = CryptoJS.HmacSHA224(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA256(str, key) {
            let sha1 = CryptoJS.HmacSHA256(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA384(str, key) {
            let sha1 = CryptoJS.HmacSHA384(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static HmacSHA512(str, key) {
            let sha1 = CryptoJS.HmacSHA512(str, key);
            let strHex = sha1.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static PBKDF2(password, salt, c = 1000, dkLen = 8) {
            let pbkdf2 = CryptoJS.PBKDF2(password, salt, { keySize: dkLen, iterations: c });
            let strHex = pbkdf2.toString(CryptoJS.enc.Hex);
            return strHex;
        }
        static EvpKDF(password, salt, c = 1000, dkLen = 8) {
            let pbkdf2 = CryptoJS.EvpKDF(password, salt, { keySize: dkLen, iterations: c });
            let strHex = pbkdf2.toString(CryptoJS.enc.Hex);
            return strHex;
        }
    }
    exports.HASH = HASH;
});
define("crypt/RC4", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    class RC4 {
        static encrypt(plaintext, keyStr = KEY) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let encrypted = CryptoJS.RC4.encrypt(src, key);
            let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return str;
        }
        static decrypt(ciphertext, keyStr = KEY) {
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let decrypted = CryptoJS.RC4.decrypt(ciphertext, key);
            let str = decrypted.toString(CryptoJS.enc.Utf8);
            return str;
        }
    }
    exports.RC4 = RC4;
    ;
});
define("crypt/RC4Drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    class RC4Drop {
        static encrypt(plaintext, keyStr = KEY) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let encrypted = CryptoJS.RC4Drop.encrypt(src, key);
            let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return str;
        }
        static decrypt(ciphertext, keyStr = KEY) {
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let decrypted = CryptoJS.RC4Drop.decrypt(ciphertext, key);
            let str = decrypted.toString(CryptoJS.enc.Utf8);
            return str;
        }
    }
    exports.RC4Drop = RC4Drop;
    ;
});
define("crypt/Rabbit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    let IV = "1234567812345678";
    class Rabbit {
        static encrypt(plaintext, keyStr = KEY, ivStr = IV) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let encrypted = CryptoJS.Rabbit.encrypt(src, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            });
            let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return str;
        }
        static decrypt(ciphertext, keyStr = KEY, ivStr = IV) {
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let decrypted = CryptoJS.Rabbit.decrypt(ciphertext, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            });
            let str = decrypted.toString(CryptoJS.enc.Utf8);
            return str;
        }
    }
    exports.Rabbit = Rabbit;
    ;
});
define("crypt/RabbitLegacy", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    let IV = "1234567812345678";
    class RabbitLegacy {
        static encrypt(plaintext, keyStr = KEY, ivStr = IV) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let encrypted = CryptoJS.RabbitLegacy.encrypt(src, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            });
            let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return str;
        }
        static decrypt(ciphertext, keyStr = KEY, ivStr = IV) {
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let decrypted = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
                format: CryptoJS.format.Hex
            });
            let str = decrypted.toString(CryptoJS.enc.Utf8);
            return str;
        }
    }
    exports.RabbitLegacy = RabbitLegacy;
    ;
});
define("crypt/TripleDES", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let KEY = "aaaabbbbccccddddeeeeffffgggghhhh";
    let IV = "1234567812345678";
    class TripleDES {
        static encrypt(plaintext, keyStr = KEY, ivStr = IV) {
            let src = CryptoJS.enc.Utf8.parse(plaintext);
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let encrypted = CryptoJS.TripleDES.encrypt(src, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            let str = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return str;
        }
        static decrypt(ciphertext, keyStr = KEY, ivStr = IV) {
            let key = CryptoJS.enc.Utf8.parse(keyStr);
            let iv = CryptoJS.enc.Utf8.parse(ivStr);
            let decrypt = CryptoJS.TripleDES.decrypt(ciphertext, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            let str = decrypt.toString(CryptoJS.enc.Utf8);
            return str;
        }
    }
    exports.TripleDES = TripleDES;
    ;
    (function test() {
        let str = "你好，world!";
        let eStr = TripleDES.encrypt(str);
        let dStr = TripleDES.decrypt(eStr);
        console.log("eStr:", eStr);
        console.log("dStr:", dStr);
    })();
});
define("struct/BinarySearchTree", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TreeNode {
        constructor(val, left, right) {
            this.val = val === undefined ? 0 : val;
            this.left = left === undefined ? null : left;
            this.right = right === undefined ? null : right;
        }
    }
    exports.TreeNode = TreeNode;
    class BinarySearchTree {
        constructor() {
            this.postOrderTraversal = function (handler = (key) => { console.log(key); }) {
                this.postOrderTraversalNode(this.root, handler);
            };
            this.root = null;
        }
        insert(key) {
            const newNode = new TreeNode(key);
            if (this.root === null) {
                this.root = newNode;
            }
            else {
                this.insertNode(this.root, newNode);
            }
        }
        insertNode(curNode, newNode) {
            if (newNode.val < curNode.val) {
                if (curNode.left === null) {
                    curNode.left = newNode;
                }
                else {
                    this.insertNode(curNode.left, newNode);
                }
            }
            else {
                if (curNode.right === null) {
                    curNode.right = newNode;
                }
                else {
                    this.insertNode(curNode.right, newNode);
                }
            }
        }
        search(key) {
            return this.searchNode(this.root, key);
        }
        searchNode(node, key) {
            if (node === null)
                return false;
            if (key < node.val)
                return this.searchNode(node.left, key);
            if (key > node.val)
                return this.searchNode(node.right, key);
            return true;
        }
        preOrderTraversal(handler = (key) => { console.log(key); }) {
            this.preOrderTranversalNode(this.root, handler);
        }
        preOrderTranversalNode(node, handler) {
            if (node !== null) {
                handler(node.val);
                this.preOrderTranversalNode(node.left, handler);
                this.preOrderTranversalNode(node.right, handler);
            }
        }
        inOrderTraversal(handler = (key) => { console.log(key); }) {
            this.inOrderTraversalNode(this.root, handler);
        }
        inOrderTraversalNode(node, handler) {
            if (node !== null) {
                this.inOrderTraversalNode(node.left, handler);
                handler(node.val);
                this.inOrderTraversalNode(node.right, handler);
            }
        }
        postOrderTraversalNode(node, handler) {
            if (node !== null) {
                this.postOrderTraversalNode(node.left, handler);
                this.postOrderTraversalNode(node.right, handler);
                handler(node.val);
            }
        }
        min() {
            return this.minNode(this.root);
        }
        minNode(node) {
            if (node) {
                while (node.left) {
                    node = node.left;
                }
                return node.val;
            }
            return null;
        }
        max() {
            return this.maxNode(this.root);
        }
        maxNode(node) {
            if (node) {
                while (node.right) {
                    node = node.right;
                }
                return node.val;
            }
            return null;
        }
        remove(key) {
            return this.removeNode(this.root, key);
        }
        removeNode(node, key) {
            if (node === null)
                return null;
            if (node.val === key) {
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                if (node.left === null) {
                    node = node.right;
                    return node;
                }
                if (node.right === null) {
                    node = node.left;
                    return node;
                }
                let aux = this.minNode(node.right);
                node.val = aux.val;
                node.right = this.removeNode(node.right, aux.val);
                return node;
            }
            else if (key < node.val) {
                node.left = this.removeNode(node.left, key);
                return node;
            }
            else {
                node.right = this.removeNode(node.right, key);
                return node;
            }
        }
    }
    exports.BinarySearchTree = BinarySearchTree;
    ;
});
define("struct/AVLTree", ["require", "exports", "struct/BinarySearchTree"], function (require, exports, BinarySearchTree_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AVLTree extends BinarySearchTree_1.BinarySearchTree {
        constructor() {
            super();
        }
        getNodeHeight(node) {
            if (node === null)
                return 0;
            return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
        }
        ;
        rotationLL(node) {
            let tmp = node.left;
            node.left = tmp.right;
            tmp.right = node;
            return tmp;
        }
        rotationRR(node) {
            let tmp = node.right;
            node.right = tmp.left;
            tmp.left = node;
            return tmp;
        }
        rotationLR(node) {
            node.left = this.rotationRR(node.left);
            return this.rotationLL(node);
        }
        rotationRL(node) {
            node.right = this.rotationLL(node.right);
            return this.rotationRR(node);
        }
        insert(key) {
            super.insert(key);
            if (this.getNodeHeight(this.root.left) - this.getNodeHeight(this.root.right) > 1) {
                if (key < this.root.left.val) {
                    this.root = this.rotationLL(this.root);
                }
                else {
                    this.root = this.rotationLR(this.root);
                }
            }
            else if (this.getNodeHeight(this.root.right) - this.getNodeHeight(this.root.left) > 1) {
                if (key > this.root.right.val) {
                    this.root = this.rotationRR(this.root);
                }
                else {
                    this.root = this.rotationRL(this.root);
                }
            }
        }
        remove(key) {
            let node = super.remove(key);
            if (this.getNodeHeight(this.root.left) - this.getNodeHeight(this.root.right) > 1) {
                if (key < this.root.left.val) {
                    this.root = this.rotationLL(this.root);
                }
                else {
                    this.root = this.rotationLR(this.root);
                }
            }
            else if (this.getNodeHeight(this.root.right) - this.getNodeHeight(this.root.left) > 1) {
                if (key > this.root.right.val) {
                    this.root = this.rotationRR(this.root);
                }
                else {
                    this.root = this.rotationRL(this.root);
                }
            }
            return node;
        }
    }
    exports.AVLTree = AVLTree;
    ;
});
define("struct/CircularLinkedList", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListNode {
        constructor(element) {
            this.element = null;
            this.next = null;
            this.element = element;
            this.next = null;
        }
    }
    ;
    class CircularLinkedList {
        constructor() {
            this.length = 0;
            this.head = null;
            this.length = 0;
            this.head = null;
        }
        append(element) {
            let node = new ListNode(element);
            if (this.head === null) {
                this.head = node;
            }
            else {
                let current = this.getElementAt(this.length - 1);
                current.next = node;
            }
            node.next = this.head;
            this.length++;
        }
        insert(position, element) {
            if (position < 0 || position > this.length) {
                return false;
            }
            let node = new ListNode(element);
            if (position === 0) {
                node.next = this.head;
                let current = this.getElementAt(this.length - 1);
                current.next = node;
                this.head = node;
            }
            else {
                let previous = this.getElementAt(position - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.length++;
            return true;
        }
        getElementAt(position) {
            if (position < 0 || position >= this.length)
                return null;
            let current = this.head;
            for (let i = 0; i < position; i++) {
                current = current.next;
            }
            return current;
        }
        removeAt(position) {
            if (position < 0 || position >= this.length) {
                return null;
            }
            let current = this.head;
            if (position === 0) {
                this.head = current.next;
            }
            else {
                let previous = this.getElementAt(position - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.length--;
            if (this.length > 1) {
                let last = this.getElementAt(this.length - 1);
                last.next = this.head;
            }
            return current.element;
        }
        toString() {
            let current = this.head;
            let s = '';
            for (let i = 0; i < this.length; i++) {
                let next = current.next;
                next = next ? next.element : 'null';
                s += `[element: ${current.element}, next: ${next}] `;
                current = current.next;
            }
            return s;
        }
    }
    exports.CircularLinkedList = CircularLinkedList;
});
define("type/Objects", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Objects {
        static extend(first, second) {
            let result = {};
            for (let id in first) {
                result[id] = first[id];
            }
            for (let id in second) {
                if (!result.hasOwnProperty(id)) {
                    result[id] = second[id];
                }
            }
            return result;
        }
        static isInherited(childInstance, parentClass) {
            let isInherited = childInstance instanceof parentClass;
            return isInherited;
        }
        static keys(obj) {
            if (typeof obj == "object") {
                let keys = [];
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keys[keys.length] = key;
                    }
                }
                return keys;
            }
            else {
                return obj;
            }
        }
        static values(obj) {
            if (typeof obj == "object") {
                let values = [];
                let keys = Object.keys(obj);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    if (obj.hasOwnProperty(key)) {
                        let val = obj[key];
                        values[values.length] = val;
                    }
                }
                return values;
            }
            else {
                return obj;
            }
        }
        static deepCopy(obj) {
            let objClone = Array.isArray(obj) ? [] : {};
            if (obj && typeof obj === "object") {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] && typeof obj[key] === "object") {
                            objClone[key] = Objects.deepCopy(obj[key]);
                        }
                        else {
                            objClone[key] = obj[key];
                        }
                    }
                }
                if (obj.hasOwnProperty('toString')) {
                    this.toString = obj.toString;
                }
            }
            else {
                return obj;
            }
            return objClone;
        }
        static merge(to, from) {
            for (let key in from) {
                if (from.hasOwnProperty(key)) {
                    to[key] = from[key];
                }
            }
            if (from.hasOwnProperty('toString')) {
                to.toString = from.toString;
            }
        }
        constructor(...args) {
            this.merge(args);
        }
        isInherited(parentClass) {
            let isInherited = this instanceof parentClass;
            return isInherited;
        }
        keys() {
            let keys = Object.keys(this);
            return keys;
        }
        values() {
            let values = Objects.values(this);
            return values;
        }
        deepCopy() {
            let obj = Objects.deepCopy(this);
            return obj;
        }
        clone() {
            let create = this.constructor;
            let cloneObj = new create();
            for (let attribute in this) {
                if (this.hasOwnProperty(attribute)) {
                    if (typeof this[attribute] === "object") {
                        let obj = this[attribute];
                        cloneObj[attribute] = obj.clone.call(obj);
                    }
                    else {
                        cloneObj[attribute] = this[attribute];
                    }
                }
            }
            return cloneObj;
        }
        merge(from) {
            Objects.merge(this, from);
            return this;
        }
        toString(encoder = JSON) {
            let str = encoder.stringify(this);
            return str;
        }
    }
    exports.Objects = Objects;
    ;
});
define("struct/Dictionary", ["require", "exports", "type/Objects"], function (require, exports, Objects_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Dictionary {
        constructor() {
            this.items = null;
            this.items = {};
        }
        set(key, value) {
            this.items[key] = value;
        }
        get(key) {
            return this.items[key];
        }
        delete(key) {
            if (this.has(key)) {
                delete this.items[key];
                return true;
            }
            return false;
        }
        has(key) {
            return this.items.hasOwnProperty(key);
        }
        clear() {
            this.items = {};
        }
        size() {
            return Objects_1.Objects.keys(this.items).length;
        }
        keys() {
            return Objects_1.Objects.keys(this.items);
        }
        values() {
            return Objects_1.Objects.values(this.items);
        }
        getItems() {
            return this.items;
        }
    }
    exports.Dictionary = Dictionary;
    ;
});
define("struct/DoubleLinkedList", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DoubleListNode {
        constructor(element) {
            this.element = null;
            this.prev = null;
            this.next = null;
            this.element = element;
            this.prev = null;
            this.next = null;
        }
    }
    ;
    class DoubleLinkedList {
        constructor() {
            this.length = 0;
            this.head = null;
            this.tail = null;
            this.length = 0;
            this.head = null;
            this.tail = null;
        }
        append(element) {
            let node = new DoubleListNode(element);
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            }
            else {
                this.tail.next = node;
                node.prev = this.tail;
                this.tail = node;
            }
            this.length++;
        }
        getElementAt(position) {
            if (position < 0 || position >= this.length) {
                return null;
            }
            if (position > Math.floor(this.length / 2)) {
                let current = this.tail;
                for (let i = this.length - 1; i > position; i--) {
                    current = current.prev;
                }
                return current;
            }
            else {
                if (position < 0 || position >= this.length) {
                    return null;
                }
                let current = this.head;
                for (let i = 0; i < position; i++) {
                    current = current.next;
                }
                return current;
            }
        }
        insert(position, element) {
            if (position < 0 || position > this.length) {
                return false;
            }
            if (position === this.length)
                this.append(element);
            else {
                let node = new DoubleListNode(element);
                if (position === 0) {
                    if (this.head === null) {
                        this.head = node;
                        this.tail = node;
                    }
                    else {
                        node.next = this.head;
                        this.head.prev = node;
                        this.head = node;
                    }
                }
                else {
                    let current = this.getElementAt(position);
                    let previous = current.prev;
                    node.next = current;
                    node.prev = previous;
                    previous.next = node;
                    current.prev = node;
                }
            }
            this.length++;
            return true;
        }
        removeAt(position) {
            if (position < 0 || position >= this.length)
                return null;
            let current = this.head;
            let previous;
            if (position === 0) {
                this.head = current.next;
                this.head.prev = null;
                if (this.length === 1)
                    this.tail = null;
            }
            else if (position === this.length - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            }
            else {
                current = this.getElementAt(position);
                previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.length--;
            return current.element;
        }
        getTail() {
            return this.tail;
        }
        clear() {
            this.length = 0;
            this.head = null;
            this.tail = null;
        }
        toString() {
            let current = this.head;
            let s = '';
            while (current) {
                let next = current.next;
                let previous = current.prev;
                next = next ? next.element : 'null';
                previous = previous ? previous.element : 'null';
                s += `[element: ${current.element}, prev: ${previous}, next: ${next}] `;
                current = current.next;
            }
            return s;
        }
    }
    exports.DoubleLinkedList = DoubleLinkedList;
    ;
    exports.test = function () {
        let doubleLinkedList = new DoubleLinkedList();
        doubleLinkedList.append(10);
        doubleLinkedList.append(15);
        doubleLinkedList.append(20);
        doubleLinkedList.append(25);
        doubleLinkedList.append(30);
        console.log(doubleLinkedList.toString());
        console.log(doubleLinkedList.getElementAt(1).element);
        console.log(doubleLinkedList.getElementAt(2).element);
        console.log(doubleLinkedList.getElementAt(3).element);
        doubleLinkedList.insert(0, 9);
        doubleLinkedList.insert(4, 24);
        doubleLinkedList.insert(7, 35);
        console.log(doubleLinkedList.toString());
        console.log(doubleLinkedList.removeAt(0));
        console.log(doubleLinkedList.removeAt(1));
        console.log(doubleLinkedList.removeAt(5));
        console.log(doubleLinkedList.toString());
    };
});
define("struct/Queue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Queue {
        constructor() {
            this.data = [];
        }
        enqueue(element_elements) {
            if (element_elements instanceof Array) {
                for (let i = 0; i < element_elements.length; i++) {
                    let element = element_elements[i];
                    this.data.push(element);
                }
            }
            else {
                this.data.push(element_elements);
            }
        }
        dequeue() {
            let element = this.data.shift();
            return element;
        }
        head() {
            if (this.isEmpty()) {
                return null;
            }
            else {
                let element = this.data[0];
                return element;
            }
        }
        tail() {
            if (this.isEmpty()) {
                return null;
            }
            else {
                let element = this.data[this.data.length - 1];
                return element;
            }
        }
        isEmpty() {
            let isEmpty = this.data.length == 0;
            return isEmpty;
        }
        size() {
            let size = this.data.length;
            return size;
        }
        clear() {
            if (this.data.length > 0) {
                this.data.splice(0, this.data.length);
            }
        }
        toString(delimit = ",") {
            let str = this.data.join(delimit);
            return str;
        }
    }
    exports.Queue = Queue;
    ;
});
define("struct/Graph", ["require", "exports", "struct/Dictionary", "struct/Queue"], function (require, exports, Dictionary_1, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let COLORS = {
        WHITE: 0,
        GREY: 1,
        BLACK: 2
    };
    class Graph {
        constructor(isDirected = false) {
            this.isDirected = false;
            this.vertices = null;
            this.adjList = null;
            this.isDirected = isDirected;
            this.vertices = [];
            this.adjList = new Dictionary_1.Dictionary();
        }
        addVertex(v) {
            if (!this.vertices.includes(v)) {
                this.vertices.push(v);
                this.adjList.set(v, []);
            }
        }
        addEdge(a, b) {
            if (!this.adjList.has(a)) {
                this.addVertex(a);
            }
            if (!this.adjList.has(b)) {
                this.addVertex(b);
            }
            this.adjList.get(a).push(b);
            if (this.isDirected !== true) {
                this.adjList.get(b).push(a);
            }
        }
        getVertices() {
            return this.vertices;
        }
        getAdjList() {
            return this.adjList;
        }
        toString() {
            let s = '';
            this.vertices.forEach((v) => {
                s += `${v} -> `;
                this.adjList.get(v).forEach((n) => {
                    s += `${n} `;
                });
                s += '\n';
            });
            return s;
        }
        static breadthFirstTraversal(graph, startVertex, handler) {
            let vertices = graph.getVertices();
            let adjList = graph.getAdjList();
            let color = {};
            vertices.forEach(v => color[v] = COLORS.WHITE);
            let queue = new Queue_1.Queue();
            queue.enqueue(startVertex);
            while (!queue.isEmpty()) {
                let u = queue.dequeue();
                adjList.get(u).forEach(n => {
                    if (color[n] === COLORS.WHITE) {
                        color[n] = COLORS.GREY;
                        queue.enqueue(n);
                    }
                });
                color[u] = COLORS.BLACK;
                if (handler) {
                    handler(u);
                }
            }
        }
        ;
        static breadthFirstSearchPath(graph, startVertex) {
            let vertices = graph.getVertices();
            let adjList = graph.getAdjList();
            let color = {};
            vertices.forEach(v => color[v] = COLORS.WHITE);
            let queue = new Queue_1.Queue();
            let distances = {};
            let predecessors = {};
            queue.enqueue(startVertex);
            vertices.forEach(v => {
                distances[v] = 0;
                predecessors[v] = null;
            });
            while (!queue.isEmpty()) {
                let u = queue.dequeue();
                adjList.get(u).forEach(n => {
                    if (color[n] === COLORS.WHITE) {
                        color[n] = COLORS.GREY;
                        distances[n] = distances[u] + 1;
                        predecessors[n] = u;
                        queue.enqueue(n);
                    }
                });
                color[u] = COLORS.BLACK;
            }
            return { distances, predecessors };
        }
        ;
    }
    exports.Graph = Graph;
    ;
    exports.test = function () {
        let graph = new Graph();
        let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        myVertices.forEach((v) => {
            graph.addVertex(v);
        });
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('A', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('C', 'G');
        graph.addEdge('D', 'G');
        graph.addEdge('D', 'H');
        graph.addEdge('B', 'E');
        graph.addEdge('B', 'F');
        graph.addEdge('E', 'I');
        console.log(graph.toString());
        console.log("\n\n 广度优先遍历");
        Graph.breadthFirstTraversal(graph, 'A', (value) => console.log(`visited vertex: ${value}`));
    };
});
define("struct/HashTable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HashTable {
        constructor() {
            this.table = null;
            this.table = [];
        }
        loseloseHashCode(key) {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % 37;
        }
        djb2HashCode(key) {
            let hash = 5381;
            for (let i = 0; i < key.length; i++) {
                hash = hash * 33 + key.charCodeAt(i);
            }
            return hash % 1013;
        }
        put(key, value) {
            let position = this.djb2HashCode(key);
            console.log(`${position} - ${key}`);
            this.table[position] = value;
        }
        get(key) {
            return this.table[this.djb2HashCode(key)];
        }
        remove(key) {
            this.table[this.djb2HashCode(key)] = undefined;
        }
        isEmpty() {
            return this.size() === 0;
        }
        size() {
            let count = 0;
            this.table.forEach(item => {
                if (item !== undefined)
                    count++;
            });
            return count;
        }
        clear() {
            this.table = [];
        }
    }
    exports.HashTable = HashTable;
    exports.test = function () {
        let hash = new HashTable();
        hash.put('Gandalf', 'gandalf@email.com');
        hash.put('John', 'john@email.com');
        hash.put('Tyrion', 'tyrion@email.com');
        hash.put('Aaron', 'aaron@email.com');
        hash.put('Donnie', 'donnie@email.com');
        hash.put('Ana', 'ana@email.com');
        hash.put('Jamie', 'jamie@email.com');
        hash.put('Sue', 'sue@email.com');
        hash.put('Mindy', 'mindy@email.com');
        hash.put('Paul', 'paul@email.com');
        hash.put('Nathan', 'nathan@email.com');
    };
});
define("struct/HashTableLinearProbing", ["require", "exports", "struct/HashTable"], function (require, exports, HashTable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValuePair {
        constructor(key, value) {
            this.key = null;
            this.value = null;
            this.key = key;
            this.value = value;
        }
        toString() {
            return `[${this.key} - ${this.value}]`;
        }
    }
    exports.ValuePair = ValuePair;
    ;
    class UHashTableLinearProbing extends HashTable_1.HashTable {
        constructor() {
            super();
        }
        put(key, value) {
            let position = this.djb2HashCode(key);
            if (this.table[position] === undefined) {
                this.table[position] = new ValuePair(key, value);
            }
            else {
                let index = position + 1;
                while (this.table[index] !== undefined) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
        }
        get(key) {
            let position = this.djb2HashCode(key);
            if (this.table[position] !== undefined) {
                if (this.table[position].key === key)
                    return this.table[position].value;
                let index = position + 1;
                while (this.table[index] !== undefined && this.table[index].key !== key) {
                    index++;
                }
                return this.table[index].value;
            }
            return undefined;
        }
        remove(key) {
            let position = this.djb2HashCode(key);
            if (this.table[position] !== undefined) {
                if (this.table[position].key === key) {
                    this.table[position] = undefined;
                    return true;
                }
                let index = position + 1;
                while (this.table[index] !== undefined && this.table[index].key !== key) {
                    index++;
                }
                this.table[index] = undefined;
                return true;
            }
            return false;
        }
        toString() {
            let objString = "";
            for (let i = 0; i < this.table.length; i++) {
                let ci = this.table[i];
                if (ci === undefined)
                    continue;
                objString += `${i}: ${ci}\r\n`;
            }
            return objString;
        }
    }
    exports.UHashTableLinearProbing = UHashTableLinearProbing;
    ;
    exports.test = function () {
        let hash = new UHashTableLinearProbing();
        hash.put('Gandalf', 'gandalf@email.com');
        hash.put('John', 'john@email.com');
        hash.put('Tyrion', 'tyrion@email.com');
        hash.put('Aaron', 'aaron@email.com');
        hash.put('Donnie', 'donnie@email.com');
        hash.put('Ana', 'ana@email.com');
        hash.put('Jamie', 'jamie@email.com');
        hash.put('Sue', 'sue@email.com');
        hash.put('Mindy', 'mindy@email.com');
        hash.put('Paul', 'paul@email.com');
        hash.put('Nathan', 'nathan@email.com');
        console.log(hash.toString());
        console.log(`size: ${hash.size()}`);
        console.log(hash.get('John'));
        console.log(hash.remove('Ana'));
        console.log(hash.remove('John'));
        console.log(hash.toString());
    };
});
define("struct/LinkedList", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListNode {
        constructor(element) {
            this.element = null;
            this.next = null;
            this.element = element;
            this.next = null;
        }
    }
    ;
    class LinkedList {
        constructor() {
            this.length = 0;
            this.head = null;
            this.length = 0;
            this.head = null;
        }
        append(element) {
            let node = new ListNode(element);
            if (this.head === null)
                this.head = node;
            else {
                let current = this.getElementAt(this.length - 1);
                current.next = node;
            }
            this.length++;
        }
        insert(position, element) {
            if (position < 0 || position > this.length)
                return false;
            let node = new ListNode(element);
            if (position === 0) {
                node.next = this.head;
                this.head = node;
            }
            else {
                let previous = this.getElementAt(position - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.length++;
            return true;
        }
        removeAt(position) {
            if (position < 0 || position >= this.length) {
                return null;
            }
            let current = this.head;
            if (position === 0) {
                this.head = current.next;
            }
            else {
                let previous = this.getElementAt(position - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        }
        remove(element) {
            let index = this.indexOf(element);
            return this.removeAt(index);
        }
        indexOf(element) {
            let current = this.head;
            for (let i = 0; i < this.length; i++) {
                if (current.element === element) {
                    return i;
                }
                else {
                    current = current.next;
                }
            }
            return -1;
        }
        getElementAt(position) {
            if (position < 0 || position >= this.length)
                return null;
            let current = this.head;
            for (let i = 0; i < position; i++) {
                current = current.next;
            }
            return current;
        }
        isEmpty() {
            return this.length === 0;
        }
        size() {
            return this.length;
        }
        getHead() {
            return this.head;
        }
        clear() {
            this.head = null;
            this.length = 0;
        }
        toString() {
            let current = this.head;
            let s = '';
            while (current) {
                let next = current.next;
                next = next ? next.element : 'null';
                s += `[element: ${current.element}, next: ${next}] `;
                current = current.next;
            }
            return s;
        }
    }
    exports.LinkedList = LinkedList;
    ;
    exports.test = function () {
        let linkedList = new LinkedList();
        linkedList.append(10);
        linkedList.append(15);
        linkedList.append(20);
        console.log(linkedList.toString());
        linkedList.insert(0, 9);
        linkedList.insert(2, 11);
        linkedList.insert(5, 25);
        console.log(linkedList.toString());
        console.log(linkedList.removeAt(0));
        console.log(linkedList.removeAt(1));
        console.log(linkedList.removeAt(3));
        console.log(linkedList.toString());
        console.log(linkedList.indexOf(20));
        linkedList.remove(20);
        console.log(linkedList.toString());
        linkedList.clear();
        console.log(linkedList.size());
    };
});
define("struct/HashTableSeparateChaining", ["require", "exports", "struct/HashTable", "struct/LinkedList"], function (require, exports, HashTable_2, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValuePair {
        constructor(key, value) {
            this.key = null;
            this.value = null;
            this.key = key;
            this.value = value;
        }
        toString() {
            return `[${this.key} - ${this.value}]`;
        }
    }
    exports.ValuePair = ValuePair;
    ;
    class UHashTableSeparateChaining extends HashTable_2.HashTable {
        constructor() {
            super();
        }
        put(key, value) {
            let position = this.djb2HashCode(key);
            if (this.table[position] === undefined) {
                this.table[position] = new LinkedList_1.LinkedList();
            }
            this.table[position].append(new ValuePair(key, value));
        }
        get(key) {
            let position = this.djb2HashCode(key);
            if (this.table[position] !== undefined) {
                let current = this.table[position].getHead();
                while (current) {
                    if (current.element.key === key)
                        return current.element.value;
                    current = current.next;
                }
                return current;
            }
            return undefined;
        }
        remove(key) {
            let position = this.djb2HashCode(key);
            let hash = this.table[position];
            if (hash !== undefined) {
                let current = hash.getHead();
                while (current) {
                    if (current.element.key === key) {
                        hash.remove(current.element);
                        if (hash.isEmpty())
                            this.table[position] = undefined;
                        return true;
                    }
                    current = current.next;
                }
            }
            return false;
        }
        size() {
            let count = 0;
            this.table.forEach(item => {
                if (item !== undefined)
                    count += item.size();
            });
            return count;
        }
        toString() {
            let objString = "";
            for (let i = 0; i < this.table.length; i++) {
                let ci = this.table[i];
                if (ci === undefined)
                    continue;
                objString += `${i}: `;
                let current = ci.getHead();
                while (current) {
                    objString += current.element.toString();
                    current = current.next;
                    if (current)
                        objString += ', ';
                }
                objString += '\r\n';
            }
            return objString;
        }
    }
    exports.UHashTableSeparateChaining = UHashTableSeparateChaining;
    ;
    exports.test = function () {
        let hash = new UHashTableSeparateChaining();
        hash.put('Gandalf', 'gandalf@email.com');
        hash.put('John', 'john@email.com');
        hash.put('Tyrion', 'tyrion@email.com');
        hash.put('Aaron', 'aaron@email.com');
        hash.put('Donnie', 'donnie@email.com');
        hash.put('Ana', 'ana@email.com');
        hash.put('Jamie', 'jamie@email.com');
        hash.put('Sue', 'sue@email.com');
        hash.put('Mindy', 'mindy@email.com');
        hash.put('Paul', 'paul@email.com');
        hash.put('Nathan', 'nathan@email.com');
        console.log(hash.toString());
        console.log(`size: ${hash.size()}`);
        console.log(hash.get('John'));
        console.log(hash.remove('Ana'));
        console.log(hash.remove('John'));
        console.log(hash.toString());
    };
});
define("struct/RBush", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RBush {
        constructor(maxEntries = 9) {
            this.data = null;
            this._maxEntries = null;
            this._minEntries = null;
            this._maxEntries = Math.max(4, maxEntries);
            this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
            this.clear();
        }
        all() {
            return this._all(this.data, []);
        }
        search(bbox) {
            let node = this.data;
            const result = [];
            if (!intersects(bbox, node))
                return result;
            const toBBox = this.toBBox;
            const nodesToSearch = [];
            while (node) {
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    const childBBox = node.leaf ? toBBox(child) : child;
                    if (intersects(bbox, childBBox)) {
                        if (node.leaf)
                            result.push(child);
                        else if (contains(bbox, childBBox))
                            this._all(child, result);
                        else
                            nodesToSearch.push(child);
                    }
                }
                node = nodesToSearch.pop();
            }
            return result;
        }
        collides(bbox) {
            let node = this.data;
            if (!intersects(bbox, node))
                return false;
            const nodesToSearch = [];
            while (node) {
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    const childBBox = node.leaf ? this.toBBox(child) : child;
                    if (intersects(bbox, childBBox)) {
                        if (node.leaf || contains(bbox, childBBox))
                            return true;
                        nodesToSearch.push(child);
                    }
                }
                node = nodesToSearch.pop();
            }
            return false;
        }
        load(data) {
            if (!(data && data.length))
                return this;
            if (data.length < this._minEntries) {
                for (let i = 0; i < data.length; i++) {
                    this.insert(data[i]);
                }
                return this;
            }
            let node = this._build(data.slice(), 0, data.length - 1, 0);
            if (!this.data.children.length) {
                this.data = node;
            }
            else if (this.data.height === node.height) {
                this._splitRoot(this.data, node);
            }
            else {
                if (this.data.height < node.height) {
                    const tmpNode = this.data;
                    this.data = node;
                    node = tmpNode;
                }
                this._insert(node, this.data.height - node.height - 1, true);
            }
            return this;
        }
        insert(item) {
            if (item)
                this._insert(item, this.data.height - 1);
            return this;
        }
        clear() {
            this.data = createNode([]);
            return this;
        }
        remove(item, equalsFn) {
            if (!item)
                return this;
            let node = this.data;
            const bbox = this.toBBox(item);
            const path = [];
            const indexes = [];
            let i, parent, goingUp;
            while (node || path.length) {
                if (!node) {
                    node = path.pop();
                    parent = path[path.length - 1];
                    i = indexes.pop();
                    goingUp = true;
                }
                if (node.leaf) {
                    const index = findItem(item, node.children, equalsFn);
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
                else
                    node = null;
            }
            return this;
        }
        toBBox(item) { return item; }
        compareMinX(a, b) { return a.minX - b.minX; }
        compareMinY(a, b) { return a.minY - b.minY; }
        toJSON() { return this.data; }
        fromJSON(data) {
            this.data = data;
            return this;
        }
        _all(node, result) {
            const nodesToSearch = [];
            while (node) {
                if (node.leaf)
                    result.push(...node.children);
                else
                    nodesToSearch.push(...node.children);
                node = nodesToSearch.pop();
            }
            return result;
        }
        _build(items, left, right, height) {
            const N = right - left + 1;
            let M = this._maxEntries;
            let node;
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
            const N2 = Math.ceil(N / M);
            const N1 = N2 * Math.ceil(Math.sqrt(M));
            multiSelect(items, left, right, N1, this.compareMinX);
            for (let i = left; i <= right; i += N1) {
                const right2 = Math.min(i + N1 - 1, right);
                multiSelect(items, i, right2, N2, this.compareMinY);
                for (let j = i; j <= right2; j += N2) {
                    const right3 = Math.min(j + N2 - 1, right2);
                    node.children.push(this._build(items, j, right3, height - 1));
                }
            }
            calcBBox(node, this.toBBox);
            return node;
        }
        _chooseSubtree(bbox, node, level, path) {
            while (true) {
                path.push(node);
                if (node.leaf || path.length - 1 === level)
                    break;
                let minArea = Infinity;
                let minEnlargement = Infinity;
                let targetNode;
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    const area = bboxArea(child);
                    const enlargement = enlargedArea(bbox, child) - area;
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
        }
        _insert(item, level, isNode) {
            const bbox = isNode ? item : this.toBBox(item);
            const insertPath = [];
            const node = this._chooseSubtree(bbox, this.data, level, insertPath);
            node.children.push(item);
            extend(node, bbox);
            while (level >= 0) {
                if (insertPath[level].children.length > this._maxEntries) {
                    this._split(insertPath, level);
                    level--;
                }
                else
                    break;
            }
            this._adjustParentBBoxes(bbox, insertPath, level);
        }
        _split(insertPath, level) {
            const node = insertPath[level];
            const M = node.children.length;
            const m = this._minEntries;
            this._chooseSplitAxis(node, m, M);
            const splitIndex = this._chooseSplitIndex(node, m, M);
            const newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
            newNode.height = node.height;
            newNode.leaf = node.leaf;
            calcBBox(node, this.toBBox);
            calcBBox(newNode, this.toBBox);
            if (level)
                insertPath[level - 1].children.push(newNode);
            else
                this._splitRoot(node, newNode);
        }
        _splitRoot(node, newNode) {
            this.data = createNode([node, newNode]);
            this.data.height = node.height + 1;
            this.data.leaf = false;
            calcBBox(this.data, this.toBBox);
        }
        _chooseSplitIndex(node, m, M) {
            let index;
            let minOverlap = Infinity;
            let minArea = Infinity;
            for (let i = m; i <= M - m; i++) {
                const bbox1 = distBBox(node, 0, i, this.toBBox);
                const bbox2 = distBBox(node, i, M, this.toBBox);
                const overlap = intersectionArea(bbox1, bbox2);
                const area = bboxArea(bbox1) + bboxArea(bbox2);
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
            return index || M - m;
        }
        _chooseSplitAxis(node, m, M) {
            const compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
            const compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
            const xMargin = this._allDistMargin(node, m, M, compareMinX);
            const yMargin = this._allDistMargin(node, m, M, compareMinY);
            if (xMargin < yMargin)
                node.children.sort(compareMinX);
        }
        _allDistMargin(node, m, M, compare) {
            node.children.sort(compare);
            const toBBox = this.toBBox;
            const leftBBox = distBBox(node, 0, m, toBBox);
            const rightBBox = distBBox(node, M - m, M, toBBox);
            let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
            for (let i = m; i < M - m; i++) {
                const child = node.children[i];
                extend(leftBBox, node.leaf ? toBBox(child) : child);
                margin += bboxMargin(leftBBox);
            }
            for (let i = M - m - 1; i >= m; i--) {
                const child = node.children[i];
                extend(rightBBox, node.leaf ? toBBox(child) : child);
                margin += bboxMargin(rightBBox);
            }
            return margin;
        }
        _adjustParentBBoxes(bbox, path, level) {
            for (let i = level; i >= 0; i--) {
                extend(path[i], bbox);
            }
        }
        _condense(path) {
            for (let i = path.length - 1, siblings; i >= 0; i--) {
                if (path[i].children.length === 0) {
                    if (i > 0) {
                        siblings = path[i - 1].children;
                        siblings.splice(siblings.indexOf(path[i]), 1);
                    }
                    else
                        this.clear();
                }
                else
                    calcBBox(path[i], this.toBBox);
            }
        }
    }
    exports.RBush = RBush;
    function findItem(item, items, equalsFn) {
        if (!equalsFn)
            return items.indexOf(item);
        for (let i = 0; i < items.length; i++) {
            if (equalsFn(item, items[i]))
                return i;
        }
        return -1;
    }
    function calcBBox(node, toBBox) {
        distBBox(node, 0, node.children.length, toBBox, node);
    }
    function distBBox(node, k, p, toBBox, destNode) {
        if (!destNode)
            destNode = createNode(null);
        destNode.minX = Infinity;
        destNode.minY = Infinity;
        destNode.maxX = -Infinity;
        destNode.maxY = -Infinity;
        for (let i = k; i < p; i++) {
            const child = node.children[i];
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
        const minX = Math.max(a.minX, b.minX);
        const minY = Math.max(a.minY, b.minY);
        const maxX = Math.min(a.maxX, b.maxX);
        const maxY = Math.min(a.maxY, b.maxY);
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
            children,
            height: 1,
            leaf: true,
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };
    }
    function multiSelect(arr, left, right, n, compare) {
        const stack = [left, right];
        while (stack.length) {
            right = stack.pop();
            left = stack.pop();
            if (right - left <= n)
                continue;
            const mid = left + Math.ceil((right - left) / n / 2) * n;
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
    function defaultCompare(a, b) {
        return (a.minX - b.minX) || (a.minY - b.minY) || (a.maxX - b.maxX) || (a.maxY - b.maxY);
    }
    function swap(arr, i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    ;
});
define("struct/Set", ["require", "exports", "type/Objects"], function (require, exports, Objects_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Set {
        constructor() {
            this.items = null;
            this.items = {};
        }
        add(value) {
            if (!this.has(value)) {
                this.items[value] = value;
                return true;
            }
            return false;
        }
        delete(value) {
            if (this.has(value)) {
                delete this.items[value];
                return true;
            }
            return false;
        }
        has(value) {
            return this.items.hasOwnProperty(value);
        }
        clear() {
            this.items = {};
        }
        size() {
            return Objects_2.Objects.keys(this.items).length;
        }
        values() {
            return Objects_2.Objects.values(this.items);
        }
        union(otherSet) {
            let unionSet = new Set();
            this.values().forEach(value => unionSet.add(value));
            otherSet.values().forEach(value => unionSet.add(value));
            return unionSet;
        }
        intersection(otherSet) {
            let intersectionSet = new Set();
            this.values().forEach(value => {
                if (otherSet.has(value))
                    intersectionSet.add(value);
            });
            return intersectionSet;
        }
        difference(otherSet) {
            let differenceSet = new Set();
            this.values().forEach(value => {
                if (!otherSet.has(value))
                    differenceSet.add(value);
            });
            return differenceSet;
        }
        subset(otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            let isSubset = true;
            this.values().every(value => {
                if (!otherSet.has(value)) {
                    isSubset = false;
                    return false;
                }
                return true;
            });
            return isSubset;
        }
    }
    exports.Set = Set;
    ;
    exports.test = function () {
        let set = new Set();
        set.add(1);
        console.log(set.values());
        console.log(set.has(1));
        console.log(set.size());
        set.add(2);
        console.log(set.values());
        console.log(set.has(2));
        console.log(set.size());
        set.delete(1);
        console.log(set.values());
        set.delete(2);
        console.log(set.values());
        console.log("\n=============================\n");
        let setA = new Set();
        setA.add("first");
        setA.add("second");
        setA.add("third");
        let setB = new Set();
        setB.add("third");
        setB.add("fourth");
        setB.add("fifth");
        setB.add("sixth");
        console.log(setA.union(setB).values());
        console.log("\n=============================\n");
        let setC = new Set();
        setC.add("first");
        setC.add("second");
        setC.add("third");
        let setD = new Set();
        setD.add("second");
        setD.add("third");
        setD.add("fourth");
        console.log(setC.intersection(setD).values());
        console.log("\n=============================\n");
        let setE = new Set();
        setE.add("first");
        setE.add("second");
        setE.add("third");
        let setF = new Set();
        setF.add("second");
        setF.add("third");
        setF.add("fourth");
        console.log(setE.difference(setF).values());
        let setJ = new Set();
        setJ.add("first");
        setJ.add("second");
        let setH = new Set();
        setH.add("first");
        setH.add("second");
        setH.add("third");
        let setI = new Set();
        setI.add("second");
        setI.add("third");
        setI.add("fourth");
        console.log(setJ.subset(setH));
        console.log(setJ.subset(setI));
    };
});
define("struct/Stack", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Stack {
        constructor() {
            this.data = [];
        }
        push(element_elements) {
            if (element_elements instanceof Array) {
                for (let i = 0; i < element_elements.length; i++) {
                    let element = element_elements[i];
                    this.data.push(element);
                }
            }
            else {
                this.data.push(element_elements);
            }
        }
        pop() {
            let element = this.data.pop();
            return element;
        }
        peek() {
            let item = null;
            if (this.data.length > 0) {
                item = this.data[this.data.length - 1];
            }
            return item;
        }
        size() {
            let size = this.data.length;
            return size;
        }
        isEmpty() {
            let isEmpty = this.data.length == 0;
            return isEmpty;
        }
        clear() {
            if (this.data.length > 0) {
                this.data.splice(0, this.data.length);
            }
        }
        toString(delimit = ",") {
            let str = this.data.join(delimit);
            return str;
        }
    }
    exports.Stack = Stack;
    ;
});
define("type/Array1", ["require", "exports", "type/Objects"], function (require, exports, Objects_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Array1 {
        constructor(arr_len, initVal = 0) {
            this.data = undefined;
            if (arr_len instanceof Array) {
                this.data = arr_len;
            }
            else {
                let len = arr_len > 0 ? arr_len : 0;
                let arr = new Array(len);
                for (let i = 0; i < arr.length; i++) {
                    this.data[i] = initVal;
                }
                this.data = arr;
            }
        }
        getData() {
            return this.data;
        }
        get(idx) {
            let item = this.data[idx] || 0;
            return item;
        }
        set(idx, val) {
            if (this.data[idx]) {
                this.data[idx] = val;
            }
        }
        toString() {
            let str = JSON.stringify(this.data);
            return str;
        }
        clone() {
            let arr1 = new Array1();
            arr1.copy(this);
            return arr1;
        }
        copy(arr1) {
            let data = arr1.getData();
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item) {
                    let copyItem = Objects_3.Objects.deepCopy(item);
                    this.data[i] = copyItem;
                }
            }
        }
        clear() {
            this.data.splice(0, this.data.length);
        }
        reverse() {
            this.data.reverse();
        }
        sort(sortFunc) {
            if (typeof sortFunc == "function") {
                this.data.sort(sortFunc);
            }
            else {
                this.data.sort();
            }
        }
        contact(arr1) {
            let data = arr1.getData();
            this.data = this.data.concat(data);
        }
        distinct(arr1) {
            let newData = this.data;
            if (arr1) {
                let data = arr1.getData();
                newData = newData.concat(data);
            }
            let result = [];
            let keyObj = {};
            for (let key in newData) {
                if (!keyObj[key]) {
                    keyObj[key] = true;
                    result.push(key);
                }
            }
            return result;
        }
        flatten(arr) {
            let newArr = arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), []);
            this.copy(newArr);
            return newArr;
        }
        sum(sunFunc = (a, b) => { return a + b; }) {
            let sum = this.data.reduce(sunFunc);
            return sum;
        }
        mul(mulFunc = (a, b) => { return a * b; }) {
            let mul = this.data.reduce(mulFunc);
            return mul;
        }
        linesIdx(row = 3, col = 3) {
            let lineIdxs = [];
            for (let j = 0; j < row; j++) {
                let horizontal = [];
                for (let i = 0; i < col; i++) {
                    let idx = j * col + i;
                    horizontal[horizontal.length] = idx;
                }
                lineIdxs[lineIdxs.length] = horizontal;
            }
            for (let i = 0; i < row; i++) {
                let vertical = [];
                for (let j = 0; j < col; j++) {
                    let idx = j * col + i;
                    vertical[vertical.length] = idx;
                }
                lineIdxs[lineIdxs.length] = vertical;
            }
            if (row == col) {
                let diag_left_to_right = [];
                for (let k = 0, initVal = 0, interval = col + 1; k < row; k++) {
                    let idx = initVal + k * interval;
                    diag_left_to_right[diag_left_to_right.length] = idx;
                }
                lineIdxs[lineIdxs.length] = diag_left_to_right;
                let diag_right_to_left = [];
                for (let k = 0, initVal = col - 1, interval = initVal; k < row; k++) {
                    let idx = initVal + k * interval;
                    diag_right_to_left[diag_right_to_left.length] = idx;
                }
                lineIdxs[lineIdxs.length] = diag_right_to_left;
            }
            return lineIdxs;
        }
        lines(row = 3, col = 3) {
            let lines = this.linesIdx(row, col);
            for (let j = 0; j < lines.length; j++) {
                if (lines[j]) {
                    for (let i = 0; i < lines[j].length; i++) {
                        let idx = lines[i];
                        lines[i] = this.data[idx] || 0;
                    }
                }
            }
            ;
            return lines;
        }
    }
    exports.Array1 = Array1;
    ;
});
define("type/Array2", ["require", "exports", "type/Objects"], function (require, exports, Objects_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Array2 {
        constructor(arr_row, col, initVal = 0) {
            this.data = undefined;
            if (arr_row instanceof Array) {
                this.data = arr_row;
            }
            else {
                let row = arr_row > 0 ? arr_row : 0;
                col = col > 0 ? col : 0;
                let arr = new Array();
                for (let j = 0; j < row; j++) {
                    if (!arr[j]) {
                        arr[j] = [];
                    }
                    for (let i = 0; i < col; i++) {
                        arr[j][i] = initVal;
                    }
                }
                this.data = arr;
            }
        }
        getData() {
            return this.data;
        }
        getRowCount() {
            return this.data.length;
        }
        getColCount() {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i]) {
                    return this.data[i].length;
                }
            }
            return 0;
        }
        get(x_pos, y = 0) {
            let x = undefined;
            if (typeof x_pos == "object") {
                x = x_pos.x;
                y = x_pos.y;
            }
            else {
                x = x_pos || 0;
            }
            let val = this.data && this.data[y] && this.data[y][x] || 0;
            return val;
        }
        set(x_pos, y_val = 0, val = 0) {
            let x = undefined;
            let y = undefined;
            let value = undefined;
            if (typeof x_pos == "object") {
                x = x_pos.x;
                y = x_pos.y;
                value = y_val;
            }
            else {
                x = x_pos || 0;
                y = y_val || 0;
                value = val;
            }
            if (this.data && this.data[y]) {
                this.data[y][x] = value;
            }
        }
        toString() {
            let str = JSON.stringify(this.data);
            return str;
        }
        clone() {
            let newArr2 = new Array2();
            newArr2.copy(this);
            return newArr2;
        }
        copy(arr2) {
            let data = arr2.getData();
            for (let j = 0; j < data.length; j++) {
                let items = data[j];
                if (items) {
                    if (!this.data[j]) {
                        this.data[j] = [];
                    }
                    for (let i = 0; i < items[j]; i++) {
                        let item = items[i];
                        let copyItem = Objects_4.Objects.deepCopy(item);
                        this.data[j][i] = copyItem;
                    }
                }
            }
        }
        clear() {
            if (this.data instanceof Array) {
                for (let j = 0; j < this.data.length; j++) {
                    let items = this.data[j];
                    if (items instanceof Array) {
                        items.splice(0, items.length);
                    }
                }
                this.data.splice(0, this.data.length);
            }
        }
        rotate90() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let temp = new Array2(col, row);
            for (let j = 0; j < col; j++) {
                let k = col - 1 - j;
                for (let i = 0; i < row; i++) {
                    temp[j][i] = this.data[i][k];
                }
            }
            return temp;
        }
        ;
        rotate180() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let temp = new Array2(row, col);
            for (let j = 0; j < row; j++) {
                for (let i = 0; i < col; i++) {
                    temp[j][i] = this.data[row - 1 - j][col - 1 - i];
                }
            }
            return temp;
        }
        ;
        rotate270() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let temp = new Array2(col, row);
            for (let j = 0; j < col; j++) {
                for (let i = 0; i < row; i++) {
                    temp[j][i] = this.data[row - 1 - i][j];
                }
            }
            return temp;
        }
        ;
        flipX() {
            let temp = this.clone();
            let data = temp.getData();
            for (let j = 0; j < data.length; j++) {
                let items = data[j];
                if (items) {
                    items.reverse();
                }
            }
            return temp;
        }
        ;
        flipY() {
            let temp = this.clone();
            let data = temp.getData();
            data.reverse();
            return temp;
        }
        ;
        flipXY() {
            let temp = this.clone();
            let data = this.getData();
            for (let j = 0; j < data.length; j++) {
                let items = data[j];
                if (items) {
                    items.reverse();
                }
            }
            data.reverse();
            return temp;
        }
        ;
        flipBackslash() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let temp = new Array2(col, row);
            for (let i = 0; i < col; i++) {
                for (let j = 0; j < row; j++) {
                    temp[i][j] = this.data[j][i];
                }
            }
            return temp;
        }
        ;
        flipPositiveSlash() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let temp = new Array2(col, row);
            for (let i = 0; i < col; i++) {
                for (let j = 0; j < row; j++) {
                    temp[i][j] = this.data[row - 1 - j][col - 1 - i];
                }
            }
            return temp;
        }
        ;
        linesIdx() {
            let row = this.getRowCount();
            let col = this.getColCount();
            let lineIdxs = [];
            for (let j = 0; j < row; j++) {
                let horizontal = [];
                for (let i = 0; i < col; i++) {
                    horizontal[horizontal.length] = { x: i, y: j };
                }
                lineIdxs[lineIdxs.length] = horizontal;
            }
            for (let i = 0; i < row; i++) {
                let vertical = [];
                for (let j = 0; j < col; j++) {
                    vertical[vertical.length] = { x: i, y: j };
                }
                lineIdxs[lineIdxs.length] = vertical;
            }
            if (row == col) {
                let diag_left_to_right = [];
                for (let j = 0, initVal = 0, interval = col + 1; j < row; j++) {
                    let i = (initVal + j * interval) % col;
                    diag_left_to_right[diag_left_to_right.length] = { x: i, y: j };
                }
                lineIdxs[lineIdxs.length] = diag_left_to_right;
                let diag_right_to_left = [];
                for (let j = 0, initVal = col - 1, interval = initVal; j < row; j++) {
                    let i = (initVal + j * interval);
                    diag_right_to_left[diag_right_to_left.length] = { x: i, y: j };
                }
                lineIdxs[lineIdxs.length] = diag_right_to_left;
            }
            return lineIdxs;
        }
        ;
        lines() {
            let lines = this.linesIdx();
            for (let j = 0; j < lines.length; j++) {
                if (lines[j]) {
                    for (let i = 0; i < lines[j].length; i++) {
                        let pos = lines[j][i];
                        lines[j][i] = this.data && this.data[pos.y] && this.data[pos.y][pos.x] || 0;
                    }
                }
            }
            return lines;
        }
        ;
    }
    exports.Array2 = Array2;
    ;
});
define("type/Numbers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Numbers {
        constructor() {
        }
    }
    exports.Numbers = Numbers;
    ;
});
define("type/Strings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Strings {
        static repeat(ch = "a", repeatTimes = 0) {
            let result = "";
            for (let i = 0; i < repeatTimes; i++) {
                result += ch;
            }
            return result;
        }
        static checkPwd(str) {
            let Lv = 0;
            if (str.length < 6) {
                return Lv;
            }
            if (/[0-9]/.test(str)) {
                Lv++;
            }
            if (/[a-z]/.test(str)) {
                Lv++;
            }
            if (/[A-Z]/.test(str)) {
                Lv++;
            }
            if (/[\.|-|_]/.test(str)) {
                Lv++;
            }
            return Lv;
        }
        static filterTag(str) {
            str = str.replace(/&/ig, "&amp;");
            str = str.replace(/</ig, "&lt;");
            str = str.replace(/>/ig, "&gt;");
            str = str.replace(" ", "&nbsp;");
            return str;
        }
        ;
        static formatMoney(num) {
            let str = "" + num;
            let newStr = "";
            let count = 0;
            if (str.indexOf(".") == -1) {
                for (let i = str.length - 1; i >= 0; i--) {
                    if (count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    }
                    else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
                str = newStr;
                return str;
            }
            else {
                for (let i = str.indexOf(".") - 1; i >= 0; i--) {
                    if (count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    }
                    else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
                str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
                return str;
            }
        }
        static isEmpty(input) {
            return input == null || input == "";
        }
        static isNotEmpty(input) {
            return !this.isEmpty(input);
        }
        static isBlank(input) {
            return input == null || /^\s*$/.test(input);
        }
        static isNotBlank(input) {
            return !this.isBlank(input);
        }
        static trim(input) {
            return input.trim();
        }
        static startsWith(input, prefix) {
            return input.indexOf(prefix) === 0;
        }
        static endsWith(input, suffix) {
            return input.lastIndexOf(suffix) === 0;
        }
        static contains(input, searchSeq) {
            return input.indexOf(searchSeq) >= 0;
        }
        static equals(input, str) {
            return input == str;
        }
        static equalsIgnoreCase(input, str) {
            return input.toLocaleLowerCase() == str.toLocaleLowerCase();
        }
        static containsWhitespace(input) {
            return this.contains(input, " ");
        }
        static deleteWhitespace(input) {
            return input.replace(/\s+/g, '');
        }
        static rightPad(input, size, padStr) {
            return input + Strings.repeat(padStr, size);
        }
        static leftPad(input, size, padStr) {
            return Strings.repeat(padStr, size) + input;
        }
        static capitalize(input) {
            if (input == null || input.length == 0) {
                return input;
            }
            return input.replace(/^[a-z]/, function (matchStr) {
                return matchStr.toLocaleUpperCase();
            });
        }
        static uncapitalize(input) {
            if (input == null || input.length == 0) {
                return input;
            }
            return input.replace(/^[A-Z]/, function (matchStr) {
                return matchStr.toLocaleLowerCase();
            });
        }
        static swapCase(input) {
            return input.replace(/[a-z]/ig, function (matchStr) {
                if (matchStr >= 'A' && matchStr <= 'Z') {
                    return matchStr.toLocaleLowerCase();
                }
                else if (matchStr >= 'a' && matchStr <= 'z') {
                    return matchStr.toLocaleUpperCase();
                }
            });
        }
        static countMatches(input, sub) {
            if (this.isEmpty(input)) {
                return 0;
            }
            if (this.isEmpty(sub)) {
                return 0;
            }
            let count = 0;
            let index = 0;
            while ((index = input.indexOf(sub, index)) != -1) {
                index += sub.length;
                count++;
            }
            return count;
        }
        static isAlpha(input) {
            return /^[a-z]+$/i.test(input);
        }
        static isAlphaSpace(input) {
            return /^[a-z\s]*$/i.test(input);
        }
        static isAlphanumeric(input) {
            return /^[a-z0-9]+$/i.test(input);
        }
        static isAlphanumericSpace(input) {
            return /^[a-z0-9\s]*$/i.test(input);
        }
        static isNumeric(input) {
            return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
        }
        static isDecimal(input) {
            return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        static isNegativeDecimal(input) {
            return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        static isPositiveDecimal(input) {
            return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        static isInteger(input) {
            return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
        }
        static isPositiveInteger(input) {
            return /^\+?(?:0|[1-9]\d*)$/.test(input);
        }
        static isNegativeInteger(input) {
            return /^\-?(?:0|[1-9]\d*)$/.test(input);
        }
        static isNumericSpace(input) {
            return /^[\d\s]*$/.test(input);
        }
        static isWhitespace(input) {
            return /^\s*$/.test(input);
        }
        static isAllLowerCase(input) {
            return /^[a-z]+$/.test(input);
        }
        static isAllUpperCase(input) {
            return /^[A-Z]+$/.test(input);
        }
        static reverse(input) {
            if (this.isBlank(input)) {
                return input;
            }
            return input.split("").reverse().join("");
        }
        static removeSpecialCharacter(input) {
            return input.replace(/[!-/:-@\[-`{-~]/g, "");
        }
        static isSpecialCharacterAlphanumeric(input) {
            return /^[!-~]+$/.test(input);
        }
        static format(message, arr) {
            return message.replace(/{(\d+)}/g, function (matchStr, group1) {
                return arr[group1];
            });
        }
        static compressRepeatedStr(input, ignoreCase = false) {
            let pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
            return input.replace(pattern, function (matchStr, group1) {
                return matchStr.length + group1;
            });
        }
        static isChinese(input) {
            return /^[\u4E00-\u9FA5]+$/.test(input);
        }
        static removeChinese(input) {
            return input.replace(/[\u4E00-\u9FA5]+/gm, "");
        }
        static escapeMetacharacter(input) {
            var metacharacter = "^$()*+.[]|\\-?{}|";
            if (metacharacter.indexOf(input) >= 0) {
                input = "\\" + input;
            }
            return input;
        }
        static escapeMetacharacterOfStr(input) {
            return input.replace(/[\^\$\(\)\*\+\.\[\]\|\\\-\?\{\}\|]/gm, "\\$&");
        }
        static isPatternMustExcludeSomeStr(input, conditions) {
            let matcherFlag = conditions.matcherFlag;
            let excludeStrArr = conditions.excludeStrArr;
            let length = conditions.length;
            let ignoreCase = conditions.ignoreCase;
            let size = excludeStrArr.length;
            let regex = (size == 0) ? "^" : "^(?!.*(?:{0}))";
            let subPattern = "";
            for (let i = 0; i < size; i++) {
                excludeStrArr[i] = this.escapeMetacharacterOfStr(excludeStrArr[i]);
                subPattern += excludeStrArr[i];
                if (i != size - 1) {
                    subPattern += "|";
                }
            }
            regex = this.format(regex, [subPattern]);
            switch (matcherFlag) {
                case '0':
                    regex += "\\d";
                    break;
                case '1':
                    regex += "[a-zA-Z]";
                    break;
                case '2':
                    regex += "[a-z]";
                    break;
                case '3':
                    regex += "[A-Z]";
                    break;
                case '4':
                    regex += "[!-/:-@\[-`{-~]";
                    break;
                case '5':
                    regex += "[\u4E00-\u9FA5]";
                    break;
                case '6':
                    regex += "[a-zA-Z0-9]";
                    break;
                case '7':
                    regex += "[a-z0-9]";
                    break;
                case '8':
                    regex += "[A-Z0-9]";
                    break;
                case '9':
                    regex += "[!-~]";
                    break;
                case '10':
                    regex += "[0-9\u4E00-\u9FA5]";
                    break;
                case '11':
                    regex += "[a-z!-/:-@\[-`{-~]";
                    break;
                case '12':
                    regex += "[A-Z!-/:-@\[-`{-~]";
                    break;
                case '13':
                    regex += "[a-zA-Z!-/:-@\[-`{-~]";
                    break;
                case '14':
                    regex += "[a-z\u4E00-\u9FA5]";
                    break;
                case '15':
                    regex += "[A-Z\u4E00-\u9FA5]";
                    break;
                case '16':
                    regex += "[a-zA-Z\u4E00-\u9FA5]";
                    break;
                case '17':
                    regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '18':
                    regex += "[\u4E00-\u9FA5!-~]";
                    break;
                case '19':
                    regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '20':
                    regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '100':
                    regex += "[\s\S]";
                    break;
                default:
                    alert(matcherFlag + ":This type is not supported!");
            }
            regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
            regex += "$";
            let pattern = new RegExp(regex, ignoreCase ? "i" : "");
            return pattern.test(input);
        }
        static formatUnit(str) {
            let unit = ["", "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极", "归", "僧", "那", "思", "猴", "格"];
            let num = parseFloat(str);
            let newStr = "";
            if (typeof num == "number") {
                let n = num;
                let u = 0;
                let p = num >= 10000 ? 2 : 0;
                while (n >= 10000) {
                    n = n / 10000;
                    u++;
                }
                newStr = n.toFixed(p) + unit[u];
            }
            return newStr;
        }
        ;
    }
    exports.Strings = Strings;
    ;
});
define("type/Times", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Times extends Date {
        constructor(...args) {
            super();
            this.init(args);
        }
        static isTimes(obj) {
            return Object.prototype.toString.call(obj) === "[object Times]";
        }
        ;
        static create(str = "1970-01-01 00:00:00:000", pattern = "YYYY-MM-DD hh:mm:ss:iii") {
            try {
                if (!pattern) {
                    if (str.length === 10) {
                        pattern = "YYYY-MM-DD";
                    }
                    else if (str.length === 19) {
                        pattern = "YYYY-MM-DD hh:mm:ss";
                    }
                    else if (str.length === 23) {
                        pattern = "YYYY-MM-DD hh:mm:ss:iii";
                    }
                    else {
                        pattern = "MM-DD";
                    }
                }
                pattern = (pattern || (str.length === 10 ? "YYYY-MM-DD" : (str.length === 19 ? "YYYY-MM-DD hh:mm:ss" : "YYYY-MM-DD hh:mm:ss:iii")));
                let matchs1 = pattern.match(Times.REG_DATE);
                let matchs2 = str.match(/(\d)+/g);
                if (matchs1.length > 0) {
                    let date = new Date(1970, 0, 1);
                    for (let i = 0; i < matchs1.length; i++) {
                        let time = parseInt(matchs2[i], 10);
                        switch (matchs1[i].charAt(0) || "") {
                            case "Y":
                                date.setFullYear(time);
                                break;
                            case "M":
                                date.setMonth(time - 1);
                                break;
                            case "D":
                                date.setDate(time);
                                break;
                            case "h":
                                date.setHours(time);
                                break;
                            case "m":
                                date.setMinutes(time);
                                break;
                            case "s":
                                date.setSeconds(time);
                                break;
                            case "i":
                                date.setMilliseconds(time);
                                break;
                            default:
                                break;
                        }
                    }
                    return date;
                }
            }
            catch (err) {
                console.error(err);
            }
            return null;
        }
        static format(times, pattern) {
            if (!Times.isTimes(times)) {
                return "";
            }
            function leftPad0(num = 0, len = 0) {
                let newLen = len - (num + "").length;
                for (let i = 0; i < newLen; i++) {
                    num = "0" + num;
                }
                return num;
            }
            function replacer(match) {
                switch (match.charAt(0)) {
                    case "Y":
                        return leftPad0(times.getFullYear(), match.length);
                    case "M":
                        return leftPad0(times.getMonth() + 1, match.length);
                    case "D":
                        return leftPad0(times.getDate(), match.length);
                    case "h":
                        return leftPad0(times.getHours(), match.length);
                    case "m":
                        return leftPad0(times.getMinutes(), match.length);
                    case "s":
                        return leftPad0(times.getSeconds(), match.length);
                    case "i":
                        return leftPad0(times.getMilliseconds(), match.length);
                    case "w":
                        return "" + times.getDay();
                    case "W":
                        return leftPad0(Times.WEEK[times.getDay()], match.length);
                    default:
                        return "";
                }
            }
            try {
                pattern = pattern || "YYYY-MM-DD hh:mm:ss:iii";
                let timeStr = pattern.replace(Times.REG_DATE, replacer);
                return timeStr;
            }
            catch (err) {
                console.error(err);
            }
            return "";
        }
        ;
        static clone(times) {
            let time = times.getTime();
            let newUDate = new Times(time);
            return newUDate;
        }
        static isSameDate(timeStampA, timeStampB) {
            let dateA = new Date(timeStampA);
            dateA.setHours(0, 0, 0, 0);
            let dateB = new Date(timeStampB);
            dateB.setHours(0, 0, 0, 0);
            let timestamp1 = dateA.getTime();
            let timestame2 = dateB.getTime();
            let isSameDay = timestamp1 == timestame2;
            return isSameDay;
        }
        static isSameWeek(timestamp1, timestamp2) {
            let old_count = Math.floor(timestamp1 / Times.STAMP_DATE);
            let now_other = Math.floor(timestamp2 / Times.STAMP_DATE);
            let isSameWeek = Math.floor((old_count + 4) / 7) == Math.floor((now_other + 4) / 7);
            return isSameWeek;
        }
        ;
        static isLeapYear(year = 1970) {
            if (year < 0) {
                year = year % 400 + 400;
            }
            let isLeapYear = (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
            return isLeapYear;
        }
        static getYearDays(year) {
            let isLeapYear = Times.isLeapYear(year);
            let yearDays = isLeapYear ? 366 : 365;
            return yearDays;
        }
        static getMonthDays(month) {
            if (month < 0) {
                month = month % 12 + 12;
            }
            else if (month > 12) {
                month = month % 12;
            }
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                case 2:
                    if (Times.isLeapYear()) {
                        return 29;
                    }
                    else {
                        return 28;
                    }
                default:
                    console.error("err:", month);
                    return 0;
            }
        }
        static getWeekOfMonth(timestamp) {
            let date = new Date(timestamp);
            let dayOfMonth = date.getDate();
            let day = date.getDay();
            let weekIdx = Math.ceil((dayOfMonth + 6 - day) / 7);
            return weekIdx;
        }
        static getWeekOfYear(timestamp) {
            let dateNow = new Date(timestamp);
            let dateFirst = new Date(dateNow.getFullYear(), 0, 1);
            let offsetDay = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / Times.STAMP_DATE);
            let weekId = Math.ceil((offsetDay + ((dateFirst.getDay() + 1) - 1)) / 7);
            return weekId;
        }
        static getDayOfYear(timestamp) {
            let start = null;
            if (timestamp > 0) {
                start = new Date(timestamp);
            }
            else {
                start = new Date();
            }
            start.setMonth(0);
            start.setDate(1);
            let now = new Date();
            let timeOffset = now.getTime() - start.getTime();
            let dayOffset = Math.ceil(timeOffset / Times.STAMP_DATE);
            return dayOffset;
        }
        static getDateTimeMin(timestamp) {
            let date = new Date(timestamp);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            let time = date.getTime();
            return time;
        }
        static getDateTimeMax(timestamp) {
            let date = new Date(timestamp);
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(999);
            let time = date.getTime();
            return time;
        }
        init(...args) {
        }
        toString() {
            let str = Times.format(this, "YYYY-MM-DD hh:mm:ss:iii");
            return str;
        }
        getMonth() {
            let month = super.getMonth() + 1;
            return month;
        }
        setMonth(month) {
            let newMonth = month - 1;
            super.setMonth(newMonth);
            return newMonth;
        }
        addFullYear(offset) {
            let year = this.getFullYear();
            let newYear = year + offset;
            if (newYear >= 1970) {
                this.setFullYear(newYear);
            }
            else {
                console.error("year < 1970.");
            }
            return this;
        }
        addMonth(offset) {
            let month = this.getMonth();
            let newMonth = month + offset;
            if (newMonth <= 0) {
                let year = Math.ceil(newMonth / 12) - 1;
                this.setFullYear(year);
                newMonth = newMonth % 12 + 12;
                this.setMonth(month);
            }
            else if (newMonth > 12) {
                let year = Math.floor(newMonth / 12);
                this.addFullYear(year);
                newMonth = newMonth % 12;
                this.setMonth(newMonth);
            }
            else {
                this.setMonth(newMonth);
            }
            return this;
        }
        addDate(offset) {
            let offsetTimestamp = offset * Times.STAMP_DATE;
            this.addMilliseconds(offsetTimestamp);
            return this;
        }
        addHour(offset) {
            let offsetTimestamp = offset * Times.STAMP_HOUR;
            this.addMilliseconds(offsetTimestamp);
            return this;
        }
        addMinutes(offset) {
            let offsetTimestamp = offset * Times.STAMP_MINUTES;
            this.addMilliseconds(offsetTimestamp);
            return this;
        }
        addMilliseconds(offset) {
            let currentTimestamp = this.getTime();
            let newTimestamp = currentTimestamp + offset;
            let date = new Date(newTimestamp);
            this.setFullYear(date.getFullYear());
            this.setMonth(date.getMonth() + 1);
            this.setDate(date.getDate());
            this.setHours(date.getHours());
            this.setSeconds(date.getSeconds());
            this.setMilliseconds(date.getMilliseconds());
            return this;
        }
        getWhatDay() {
            let week = [7, 1, 2, 3, 4, 5, 6];
            let day = this.getDay();
            let whatDay = week[day];
            return whatDay;
        }
        compare(udate) {
            let selfTime = this.getTime();
            let otherTime = udate.getTime();
            return selfTime - otherTime;
        }
        compareYear(udate) {
            let selfYear = this.getFullYear();
            let otherYear = udate.getFullYear();
            return selfYear - otherYear;
        }
        compareMonth(udate) {
            let selfMonth = this.getMonth();
            let otherMonth = udate.getMonth();
            return selfMonth - otherMonth;
        }
        compareDay(times) {
            let selfDay = this.getDay();
            let otherDay = times.getDate();
            return selfDay - otherDay;
        }
        compareHour(times) {
            let selfHours = this.getHours();
            let otherHours = times.getHours();
            return selfHours - otherHours;
        }
        compareMinutes(times) {
            let selfMinutes = this.getMinutes();
            let otherMinutes = times.getMinutes();
            return selfMinutes - otherMinutes;
        }
        compareSecond(times) {
            let selfSeconds = this.getHours();
            let otherSeconds = times.getHours();
            return selfSeconds - otherSeconds;
        }
    }
    Times.REG_DATE = /([YMDhmsiWw])(\1*)/g;
    Times.STAMP_SECONDS = 1000;
    Times.STAMP_MINUTES = 60 * Times.STAMP_SECONDS;
    Times.STAMP_HOUR = 60 * Times.STAMP_MINUTES;
    Times.STAMP_DATE = 24 * Times.STAMP_HOUR;
    Times.WEEK = ["日", "一", "二", "三", "四", "五", "六"];
    exports.Times = Times;
    ;
});
define("utils/Adapter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _NOTCH_RATE = 1.86;
    let _NOTCH_ADJUST_Y = 70;
    class Adapter {
        static adapterScreen() {
            let canvas = cc.Canvas.instance;
            let rateR = canvas.designResolution.height / canvas.designResolution.width;
            let rateV = cc.winSize.height / cc.winSize.width;
            if (rateV > rateR) {
                canvas.fitHeight = false;
                canvas.fitWidth = true;
            }
            else {
                canvas.fitHeight = true;
                canvas.fitWidth = false;
            }
        }
        ;
        static isNotch() {
            let rateV = cc.winSize.height / cc.winSize.width;
            let isNotchScreen = rateV > _NOTCH_RATE;
            return isNotchScreen;
        }
        ;
    }
    Adapter.adapterNotch = function (nodes = [], offsetY = _NOTCH_ADJUST_Y) {
        let isNotch = Adapter.isNotch();
        if (isNotch) {
            if (nodes && nodes.length > 0) {
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    if (node && typeof node.y == "number") {
                        node.y = node.y - offsetY;
                    }
                }
            }
        }
    };
    exports.Adapter = Adapter;
});
define("utils/Storage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Storage {
        static collectGarbage() {
            cc.sys.garbageCollect();
        }
        static clear() {
            cc.sys.localStorage.clear();
        }
        static get(key) {
            try {
                if (!key) {
                    throw new Error("key is empty.");
                }
                let value = cc.sys.localStorage.getItem(key);
                return value;
            }
            catch (err) {
                console.error("get - err:", err && err.message);
            }
        }
        ;
        static remove(key) {
            try {
                if (!key) {
                    throw new Error("key is empty.");
                }
                setTimeout(() => {
                    cc.sys.localStorage.removeItem(key);
                }, 1);
            }
            catch (err) {
                console.error("remove - err:", err && err.message);
            }
        }
        ;
        static multiGet(keys = []) {
            let values = [];
            if (keys && keys.length > 0) {
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = Storage.get(key);
                    values.push(value);
                }
            }
            return values;
        }
        ;
    }
    Storage.set = function (key, value) {
        try {
            if (!key) {
                throw new Error("key is empty.");
            }
            if (typeof value != "string") {
                value = value.toString();
            }
            setTimeout(() => {
                cc.sys.localStorage.setItem(key, value);
            }, 1);
        }
        catch (err) {
            console.error("set - err:", err && err.message);
        }
    };
    Storage.multiSet = function (keysOrPairs = [{
            key: "k",
            value: "v"
        }], values = []) {
        if (values && values.length === 0) {
            for (let i = 0; i < keysOrPairs.length; i++) {
                let pair = keysOrPairs[i];
                let key = pair.key;
                let value = pair.value;
                Storage.set(key, value);
            }
        }
        else {
            let minLength = keysOrPairs.length < values.length ? keysOrPairs.length : values.length;
            for (let i = 0; i < minLength; i++) {
                let key = keysOrPairs[i];
                let value = values[i];
                Storage.set(key, value);
            }
        }
    };
    Storage.mutilRemove = function (keys = []) {
        if (keys && keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                Storage.remove(key);
            }
        }
    };
    exports.Storage = Storage;
    ;
});
define("utils/Audio", ["require", "exports", "utils/Storage", "type/Objects"], function (require, exports, Storage_1, Objects_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _AUDIO_KEY = "cu.audio.object";
    class Audio {
        constructor() {
            this.audioObj = {
                _inited: false,
                musicStatus: true,
                musicVolume: 1.0,
                effectStatus: true,
                effectVolume: 1.0,
                vibrateStatus: true,
            };
        }
        getAudioObj() {
            if (!this.audioObj._inited) {
                let str = Storage_1.Storage.get(_AUDIO_KEY);
                if (!str) {
                    this.audioObj._inited = true;
                    this.saveAudioObj(this.audioObj);
                }
                else {
                    let audioObj = JSON.parse(str);
                    Objects_5.Objects.merge(this.audioObj, audioObj);
                    this.audioObj._inited = true;
                }
            }
            return this.audioObj;
        }
        saveAudioObj(obj) {
            setTimeout(() => {
                let str = JSON.stringify(obj);
                Storage_1.Storage.set(_AUDIO_KEY, str);
            }, 1);
        }
        ;
        init() {
            let musicStatus = this.getMusicStatus();
            this.setMusicStatus(musicStatus);
            let musicVolume = this.getMusicVolume();
            this.setMusicVolume(musicVolume);
            let effectStatus = this.getEffectStatus();
            this.setEffectStatus(effectStatus);
            let effectVolume = this.getEffectVolume();
            this.setEffectVolume(effectVolume);
        }
        getMusicStatus() {
            this.audioObj = this.getAudioObj();
            return this.audioObj.musicStatus;
        }
        setMusicStatus(musicStatus) {
            this.audioObj = this.getAudioObj();
            if (this.audioObj.musicStatus != musicStatus) {
                this.audioObj.musicStatus = musicStatus;
                this.saveAudioObj(this.audioObj);
            }
            if (musicStatus) {
                this.pauseMusic();
            }
            else {
                this.pauseMusic();
            }
        }
        getMusicVolume() {
            this.audioObj = this.getAudioObj();
            return this.audioObj.musicVolume;
        }
        setMusicVolume(musicVolume) {
            this.audioObj = this.getAudioObj();
            if (this.audioObj.musicVolume != musicVolume) {
                this.audioObj.musicVolume = musicVolume;
                cc.audioEngine.setMusicVolume(musicVolume);
                this.saveAudioObj(this.audioObj);
            }
        }
        getEffectStatus() {
            this.audioObj = this.getAudioObj();
            return this.audioObj.effectStatus;
        }
        setEffectStatus(effectStatus) {
            this.audioObj = this.getAudioObj();
            if (this.audioObj.effectStatus != effectStatus) {
                this.audioObj.effectStatus = effectStatus;
                this.saveAudioObj(this.audioObj);
            }
            if (effectStatus) {
                this.resumeAllEffects();
            }
            else {
                this.pauseAllEffects();
            }
        }
        getEffectVolume() {
            this.audioObj = this.getAudioObj();
            return this.audioObj.effectVolume;
        }
        setEffectVolume(effectVolume) {
            this.audioObj = this.getAudioObj();
            if (this.audioObj.effectVolume != effectVolume) {
                this.audioObj.effectVolume = effectVolume;
                this.saveAudioObj(this.audioObj);
            }
        }
        getVibrateStatus() {
            this.audioObj = this.getAudioObj();
            return this.audioObj.vibrateStatus;
        }
        setVibrateStatus(vibrateStatus) {
            this.audioObj = this.getAudioObj();
            if (this.audioObj.vibrateStatus != vibrateStatus) {
                this.audioObj.vibrateStatus = vibrateStatus;
                this.saveAudioObj(this.audioObj);
            }
            if (vibrateStatus) {
                this.startVibrate(1);
            }
            else {
                this.stopVibrate();
            }
        }
        stopAll() {
            cc.audioEngine.stopAll();
        }
        pauseAll() {
            cc.audioEngine.pauseAll();
        }
        resumeAll() {
            cc.audioEngine.resumeAll();
        }
        isMusicPlaying() {
            return cc.audioEngine.isMusicPlaying();
        }
        playMusic(clip, loop = true) {
            if (!clip) {
                return;
            }
            let isOpen = this.getMusicStatus();
            if (isOpen) {
                let audioID = cc.audioEngine.playMusic(clip, loop);
                return audioID;
            }
            return null;
        }
        stopMusic() {
            cc.audioEngine.stopMusic();
        }
        pauseMusic() {
            cc.audioEngine.pauseMusic();
        }
        resumeMusic() {
            cc.audioEngine.resumeMusic();
        }
        playEffect(clip, loop = false) {
            if (!clip) {
                return;
            }
            let isOpen = this.getEffectStatus();
            if (isOpen && clip) {
                let audioID = cc.audioEngine.playEffect(clip, loop);
                return audioID;
            }
            return null;
        }
        stopEffect(audioId) {
            if (audioId) {
                cc.audioEngine.stopEffect(audioId);
            }
        }
        pauseEffect(audioId) {
            if (audioId) {
                cc.audioEngine.pauseEffect(audioId);
            }
        }
        resumeEffect(audioId) {
            let isOpen = this.getEffectStatus();
            if (audioId || isOpen) {
                cc.audioEngine.resumeEffect(audioId);
            }
        }
        stopAllEffects() {
            cc.audioEngine.stopAllEffects();
        }
        pauseAllEffects() {
            cc.audioEngine.pauseAllEffects();
        }
        resumeAllEffects() {
            let isOpen = this.getEffectStatus();
            if (isOpen) {
                cc.audioEngine.resumeAllEffects();
            }
        }
        startVibrate(duration) {
            if (!cc.sys.isNative) {
                navigator.vibrate(duration * 1000);
                return;
            }
            else if (cc.sys.os === cc.sys.OS_ANDROID) {
            }
            else if (cc.sys.os === cc.sys.OS_IOS) {
            }
        }
        stopVibrate() {
            if (!cc.sys.isNative) {
                navigator.vibrate(0);
                return;
            }
            else if (cc.sys.os === cc.sys.OS_ANDROID) {
            }
            else if (cc.sys.os === cc.sys.OS_IOS) {
            }
        }
    }
    exports.Audio = Audio;
});
define("utils/Convert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Convert {
        static localConvertWorldPointAR(node) {
            if (node) {
                let pos = node.convertToWorldSpaceAR(cc.v2(0, 0));
                return pos;
            }
            return null;
        }
        static localConvertWorldPoint(node) {
            if (node) {
                let pos = node.convertToWorldSpace(cc.v2(0, 0));
                return pos;
            }
            return null;
        }
        ;
        static worldConvertLocalPointAR(node, worldPos) {
            if (node) {
                let pos = node.convertToNodeSpaceAR(worldPos);
                return pos;
            }
            return null;
        }
        ;
        static worldConvertLocalPoint(node, worldPos) {
            if (node) {
                let pos = node.convertToNodeSpace(worldPos);
                return pos;
            }
            return null;
        }
        ;
        static convetOtherNodeSpace(node, targetNode) {
            if (!node || !targetNode) {
                return null;
            }
            let worldPos = Convert.localConvertWorldPoint(node);
            let pos = Convert.worldConvertLocalPoint(targetNode, worldPos);
            return pos;
        }
        static convetOtherNodeSpaceAR(node, targetNode) {
            if (!node || !targetNode) {
                return null;
            }
            let worldPos = Convert.localConvertWorldPointAR(node);
            let pos = Convert.worldConvertLocalPointAR(targetNode, worldPos);
            return pos;
        }
    }
    exports.Convert = Convert;
    ;
});
define("utils/Events", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Events {
        static on(eventName, handler, target) {
            var objHandler = {
                handler: handler,
                target: target
            };
            var handlerList = this.handlers[eventName];
            if (!handlerList) {
                handlerList = [];
                this.handlers[eventName] = handlerList;
            }
            for (var i = 0; i < handlerList.length; i++) {
                if (!handlerList[i]) {
                    handlerList[i] = objHandler;
                    return i;
                }
            }
            handlerList.push(objHandler);
            return handlerList.length;
        }
        static off(eventName, handler, target) {
            var handlerList = this.handlers[eventName];
            if (!handlerList) {
                return;
            }
            for (var i = 0; i < handlerList.length; i++) {
                var oldObj = handlerList[i];
                if (oldObj.handler === handler && (!target || target === oldObj.target)) {
                    handlerList.splice(i, 1);
                    break;
                }
            }
        }
        ;
        static setSupportEventList(arrSupportEvent = []) {
            if (!(arrSupportEvent instanceof Array)) {
                console.error("supportEvent was not array");
                return false;
            }
            this.supportEvent = {};
            for (var i in arrSupportEvent) {
                var eventName = arrSupportEvent[i];
                this.supportEvent[eventName] = i;
            }
            return true;
        }
    }
    Events.handlers = {};
    Events.supportEvent = {};
    Events.dispatchEvent = function (eventName, ...args) {
        var handlerList = this.handlers[eventName];
        var args = [];
        var i;
        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (!handlerList) {
            return;
        }
        for (i = 0; i < handlerList.length; i++) {
            var objHandler = handlerList[i];
            if (objHandler.handler) {
                objHandler.handler.apply(objHandler.target, args);
            }
        }
    };
    exports.Events = Events;
    ;
});
define("utils/Graphics", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Graphics {
        static clear(graphics) {
            graphics.clear();
        }
        ;
        static drawLine(graphics, fromP = cc.v2(), toP = cc.v2(), lineWidth = 2, color = cc.Color.BLACK) {
            graphics.lineWidth = lineWidth;
            graphics.strokeColor = color;
            graphics.moveTo(fromP.x, fromP.y);
            graphics.lineTo(toP.x, toP.y);
            graphics.stroke();
        }
        ;
    }
    Graphics.drawCircle = function (graphics, P = cc.v2(), radius = 6, color = cc.Color.BLACK) {
        graphics.fillColor = color;
        graphics.circle(P.x, P.y, radius);
        graphics.fill();
    };
    Graphics.drawBezier = function (graphics, P0 = cc.v2(), P1 = cc.v2(), P2 = cc.v2(), P3 = cc.v2(), lineWidth = 2, color = cc.Color.BLACK) {
        graphics.lineWidth = lineWidth;
        graphics.strokeColor = color;
        graphics.moveTo(P0.x, P0.y);
        graphics.bezierCurveTo(P1.x, P1.y, P2.x, P2.y, P3.x, P3.y);
        graphics.stroke();
    };
    exports.Graphics = Graphics;
    ;
});
define("utils/Maths", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Maths {
        static isOdd(num) {
            let isOdd = num % 2 == 1;
            return isOdd;
        }
        static isEven(num) {
            let isEven = (num % 2) == 0;
            return isEven;
        }
        static randomNum(min = 0, max = 1) {
            let random = Math.random();
            let range = max - min;
            let randomNum = Math.round(random * range) + min;
            return randomNum;
        }
        static randomFloat(min = 0.0, max = 1.0) {
            let random = Math.random();
            let range = max - min;
            let randomFloat = random * range + min;
            return randomFloat;
        }
        static randomPop(arr = []) {
            let idx = Math.random() * arr.length | 0;
            return arr.splice(idx, 1)[0];
        }
    }
    exports.Maths = Maths;
    ;
});
define("utils/Net", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NetBase {
        constructor() {
            this.parse = function (httpResponse) {
                let response = {};
                response.code = -1;
                response.http_status = httpResponse.status;
                response.http_status_message = httpResponse.status_message;
                response.duration = httpResponse.duration;
                try {
                    let bodyObj = JSON.parse(httpResponse.body);
                    response.code = bodyObj.code;
                    response.data = bodyObj.data;
                }
                catch (err) {
                    console.error(err);
                }
                return response;
            };
            this.getQueryString = function (urlParams, name) {
                try {
                    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    let res = urlParams.substr(1).match(reg);
                    if (res) {
                        return unescape(res[2]);
                    }
                }
                catch (err) {
                    console.error(err);
                }
                return null;
            };
            this.getQueryInt = function (urlParams, name) {
                try {
                    let value = Number.parseInt(this.getQueryString(urlParams, name));
                    if (isNaN(value)) {
                        return null;
                    }
                }
                catch (err) {
                    console.error(err);
                }
                return null;
            };
        }
        quest(options, callback) {
            let url = options.url;
            let method = options.method;
            let data = options.data;
            let timeout = options.timeout || 0;
            let xhr = new XMLHttpRequest();
            let response = {};
            response.xhr = xhr;
            if (timeout > 0) {
                xhr.timeout = timeout;
            }
            let time_begin = new Date().getTime();
            if (cc.sys.platform == cc.sys.MACOS ||
                cc.sys.platform == cc.sys.IPHONE ||
                cc.sys.platform == cc.sys.IPAD) {
            }
            else {
                xhr.withCredentials = true;
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    response.status = xhr.status;
                    response.status_message = xhr.statusText;
                    if (xhr.status >= 200 && xhr.status < 400) {
                        response.body = xhr.responseText;
                    }
                    if (callback) {
                        let time_end = new Date().getTime();
                        response.duration = time_end - time_begin;
                        callback(response);
                        callback = null;
                    }
                }
            };
            xhr.open(method, url, options.async);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            if (options.cookie && options.cookie.length > 0) {
                xhr.setRequestHeader('cookie', options.cookie);
            }
            if (typeof data === 'object') {
                try {
                    data = JSON.stringify(data);
                }
                catch (err) {
                    console.error(err);
                }
            }
            xhr.send(data);
            xhr.ontimeout = () => {
                response.status = xhr.status;
                response.status_message = xhr.statusText;
                if (callback) {
                    let time_end = new Date().getTime();
                    response.duration = time_end - time_begin;
                    callback(response);
                    callback = null;
                }
            };
        }
        get(url, cookie, callback) {
            let options = {
                timeout: 10000,
                async: true,
            };
            if (typeof url === 'object') {
                Object.assign(options, url);
            }
            else if (typeof url === 'string') {
                options.url = url;
            }
            options.method = 'get';
            options.cookie = cookie;
            this.quest(options, callback);
        }
        post(url, data, cookie, callback) {
            let options = {
                timeout: 10000,
                async: true,
            };
            if (typeof url === 'object') {
                Object.assign(options, url);
            }
            else if (typeof url === 'string') {
                options.url = url;
            }
            options.method = 'post';
            options.data = data;
            options.cookie = cookie;
            this.quest(options, callback);
        }
    }
    ;
    class UNet {
        constructor() {
            this.cookie = null;
            this.netBase = null;
            this.netBase = new NetBase();
            this.cookie = {};
        }
        get(url, callback) {
            this.netBase.get(url, this.cookie, (httpResponse) => {
                this.cookie = httpResponse.xhr.getResponseHeader('Set-Cookie');
                let data = this.netBase.parse(httpResponse);
                if (typeof callback == "function") {
                    callback(data);
                }
            });
        }
        post(url, data, callback) {
            this.netBase.post(url, data, this.cookie, (httpResponse) => {
                this.cookie = httpResponse.xhr.getResponseHeader('Set-Cookie');
                let data = this.netBase.parse(httpResponse);
                if (typeof callback == "function") {
                    callback(data);
                }
            });
        }
    }
    exports.UNet = UNet;
    ;
});
define("utils/Platform", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LANGUAGE;
    (function (LANGUAGE) {
        LANGUAGE[LANGUAGE["LANGUAGE_ENGLISH"] = 0] = "LANGUAGE_ENGLISH";
        LANGUAGE[LANGUAGE["LANGUAGE_CHINESE"] = 1] = "LANGUAGE_CHINESE";
        LANGUAGE[LANGUAGE["LANGUAGE_FRENCH"] = 2] = "LANGUAGE_FRENCH";
        LANGUAGE[LANGUAGE["LANGUAGE_ITALIAN"] = 3] = "LANGUAGE_ITALIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_GERMAN"] = 4] = "LANGUAGE_GERMAN";
        LANGUAGE[LANGUAGE["LANGUAGE_SPANISH"] = 5] = "LANGUAGE_SPANISH";
        LANGUAGE[LANGUAGE["LANGUAGE_DUTCH"] = 6] = "LANGUAGE_DUTCH";
        LANGUAGE[LANGUAGE["LANGUAGE_RUSSIAN"] = 7] = "LANGUAGE_RUSSIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_KOREAN"] = 8] = "LANGUAGE_KOREAN";
        LANGUAGE[LANGUAGE["LANGUAGE_JAPANESE"] = 9] = "LANGUAGE_JAPANESE";
        LANGUAGE[LANGUAGE["LANGUAGE_HUNGARIAN"] = 10] = "LANGUAGE_HUNGARIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_PORTUGUESE"] = 11] = "LANGUAGE_PORTUGUESE";
        LANGUAGE[LANGUAGE["LANGUAGE_ARABIC"] = 12] = "LANGUAGE_ARABIC";
        LANGUAGE[LANGUAGE["LANGUAGE_NORWEGIAN"] = 13] = "LANGUAGE_NORWEGIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_POLISH"] = 14] = "LANGUAGE_POLISH";
        LANGUAGE[LANGUAGE["LANGUAGE_TURKISH"] = 15] = "LANGUAGE_TURKISH";
        LANGUAGE[LANGUAGE["LANGUAGE_UKRAINIAN"] = 16] = "LANGUAGE_UKRAINIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_ROMANIAN"] = 17] = "LANGUAGE_ROMANIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_BULGARIAN"] = 18] = "LANGUAGE_BULGARIAN";
        LANGUAGE[LANGUAGE["LANGUAGE_UNKNOWN"] = 19] = "LANGUAGE_UNKNOWN";
    })(LANGUAGE = exports.LANGUAGE || (exports.LANGUAGE = {}));
    ;
    var OS;
    (function (OS) {
        OS[OS["OS_IOS"] = 10001] = "OS_IOS";
        OS[OS["OS_ANDROID"] = 10002] = "OS_ANDROID";
        OS[OS["OS_WINDOWS"] = 10003] = "OS_WINDOWS";
        OS[OS["OS_MARMALADE"] = 10004] = "OS_MARMALADE";
        OS[OS["OS_LINUX"] = 10005] = "OS_LINUX";
        OS[OS["OS_BADA"] = 10006] = "OS_BADA";
        OS[OS["OS_BLACKBERRY"] = 10007] = "OS_BLACKBERRY";
        OS[OS["OS_OSX"] = 10008] = "OS_OSX";
        OS[OS["OS_WP8"] = 10009] = "OS_WP8";
        OS[OS["OS_WINRT"] = 10010] = "OS_WINRT";
        OS[OS["OS_UNKNOWN"] = 10011] = "OS_UNKNOWN";
    })(OS = exports.OS || (exports.OS = {}));
    ;
    var PLATFORM;
    (function (PLATFORM) {
        PLATFORM[PLATFORM["UNKNOWN"] = 20001] = "UNKNOWN";
        PLATFORM[PLATFORM["WIN32"] = 20002] = "WIN32";
        PLATFORM[PLATFORM["LINUX"] = 20003] = "LINUX";
        PLATFORM[PLATFORM["MACOS"] = 20004] = "MACOS";
        PLATFORM[PLATFORM["ANDROID"] = 20005] = "ANDROID";
        PLATFORM[PLATFORM["IPHONE"] = 20006] = "IPHONE";
        PLATFORM[PLATFORM["IPAD"] = 20007] = "IPAD";
        PLATFORM[PLATFORM["BLACKBERRY"] = 20008] = "BLACKBERRY";
        PLATFORM[PLATFORM["NACL"] = 20009] = "NACL";
        PLATFORM[PLATFORM["EMSCRIPTEN"] = 20010] = "EMSCRIPTEN";
        PLATFORM[PLATFORM["TIZEN"] = 20011] = "TIZEN";
        PLATFORM[PLATFORM["WINRT"] = 20012] = "WINRT";
        PLATFORM[PLATFORM["WP8"] = 20013] = "WP8";
        PLATFORM[PLATFORM["MOBILE_BROWSER"] = 20014] = "MOBILE_BROWSER";
        PLATFORM[PLATFORM["DESKTOP_BROWSER"] = 20015] = "DESKTOP_BROWSER";
        PLATFORM[PLATFORM["EDITOR_PAGE"] = 20016] = "EDITOR_PAGE";
        PLATFORM[PLATFORM["EDITOR_CORE"] = 20017] = "EDITOR_CORE";
        PLATFORM[PLATFORM["WECHAT_GAME"] = 20018] = "WECHAT_GAME";
        PLATFORM[PLATFORM["QQ_PLAY"] = 20019] = "QQ_PLAY";
        PLATFORM[PLATFORM["FB_PLAYABLE_ADS"] = 20020] = "FB_PLAYABLE_ADS";
        PLATFORM[PLATFORM["BAIDU_GAME"] = 20021] = "BAIDU_GAME";
        PLATFORM[PLATFORM["VIVO_GAME"] = 20022] = "VIVO_GAME";
        PLATFORM[PLATFORM["OPPO_GAME"] = 20023] = "OPPO_GAME";
        PLATFORM[PLATFORM["HUAWEI_GAME"] = 20024] = "HUAWEI_GAME";
        PLATFORM[PLATFORM["XIAOMI_GAME"] = 20025] = "XIAOMI_GAME";
        PLATFORM[PLATFORM["JKW_GAME"] = 20026] = "JKW_GAME";
        PLATFORM[PLATFORM["ALIPAY_GAME"] = 20027] = "ALIPAY_GAME";
        PLATFORM[PLATFORM["WECHAT_GAME_SUB"] = 20029] = "WECHAT_GAME_SUB";
        PLATFORM[PLATFORM["BAIDU_GAME_SUB"] = 20030] = "BAIDU_GAME_SUB";
        PLATFORM[PLATFORM["QTT_GAME"] = 20031] = "QTT_GAME";
        PLATFORM[PLATFORM["BYTEDANCE_GAME"] = 200032] = "BYTEDANCE_GAME";
        PLATFORM[PLATFORM["BYTEDANCE_GAME_SUB"] = 20033] = "BYTEDANCE_GAME_SUB";
        PLATFORM[PLATFORM["LINKSURE"] = 20034] = "LINKSURE";
    })(PLATFORM = exports.PLATFORM || (exports.PLATFORM = {}));
    var BROWSER;
    (function (BROWSER) {
        BROWSER[BROWSER["BROWSER_TYPE_WECHAT"] = 30035] = "BROWSER_TYPE_WECHAT";
        BROWSER[BROWSER["BROWSER_TYPE_ANDROID"] = 30036] = "BROWSER_TYPE_ANDROID";
        BROWSER[BROWSER["BROWSER_TYPE_IE"] = 30037] = "BROWSER_TYPE_IE";
        BROWSER[BROWSER["BROWSER_TYPE_EDGE"] = 30038] = "BROWSER_TYPE_EDGE";
        BROWSER[BROWSER["BROWSER_TYPE_QQ"] = 30039] = "BROWSER_TYPE_QQ";
        BROWSER[BROWSER["BROWSER_TYPE_MOBILE_QQ"] = 30040] = "BROWSER_TYPE_MOBILE_QQ";
        BROWSER[BROWSER["BROWSER_TYPE_UC"] = 30041] = "BROWSER_TYPE_UC";
        BROWSER[BROWSER["BROWSER_TYPE_UCBS"] = 30042] = "BROWSER_TYPE_UCBS";
        BROWSER[BROWSER["BROWSER_TYPE_360"] = 30043] = "BROWSER_TYPE_360";
        BROWSER[BROWSER["BROWSER_TYPE_BAIDU_APP"] = 30044] = "BROWSER_TYPE_BAIDU_APP";
        BROWSER[BROWSER["BROWSER_TYPE_BAIDU"] = 30045] = "BROWSER_TYPE_BAIDU";
        BROWSER[BROWSER["BROWSER_TYPE_MAXTHON"] = 30046] = "BROWSER_TYPE_MAXTHON";
        BROWSER[BROWSER["BROWSER_TYPE_OPERA"] = 30047] = "BROWSER_TYPE_OPERA";
        BROWSER[BROWSER["BROWSER_TYPE_OUPENG"] = 30048] = "BROWSER_TYPE_OUPENG";
        BROWSER[BROWSER["BROWSER_TYPE_MIUI"] = 30049] = "BROWSER_TYPE_MIUI";
        BROWSER[BROWSER["BROWSER_TYPE_FIREFOX"] = 30050] = "BROWSER_TYPE_FIREFOX";
        BROWSER[BROWSER["BROWSER_TYPE_SAFARI"] = 30051] = "BROWSER_TYPE_SAFARI";
        BROWSER[BROWSER["BROWSER_TYPE_CHROME"] = 30052] = "BROWSER_TYPE_CHROME";
        BROWSER[BROWSER["BROWSER_TYPE_LIEBAO"] = 30053] = "BROWSER_TYPE_LIEBAO";
        BROWSER[BROWSER["BROWSER_TYPE_QZONE"] = 30054] = "BROWSER_TYPE_QZONE";
        BROWSER[BROWSER["BROWSER_TYPE_SOUGOU"] = 30055] = "BROWSER_TYPE_SOUGOU";
        BROWSER[BROWSER["BROWSER_TYPE_HUAWEI"] = 30056] = "BROWSER_TYPE_HUAWEI";
        BROWSER[BROWSER["BROWSER_TYPE_UNKNOWN"] = 30057] = "BROWSER_TYPE_UNKNOWN";
    })(BROWSER = exports.BROWSER || (exports.BROWSER = {}));
    var NETWORK;
    (function (NETWORK) {
        NETWORK[NETWORK["NONE"] = 40001] = "NONE";
        NETWORK[NETWORK["LAN"] = 40002] = "LAN";
        NETWORK[NETWORK["WWAN"] = 40003] = "WWAN";
    })(NETWORK = exports.NETWORK || (exports.NETWORK = {}));
    ;
    class Platform {
        static getLanguage() {
            if (!this.language) {
                if (cc.sys.languageCode == cc.sys.LANGUAGE_ENGLISH) {
                    this.language = LANGUAGE.LANGUAGE_ENGLISH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_CHINESE) {
                    this.language = LANGUAGE.LANGUAGE_CHINESE;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_FRENCH) {
                    this.language = LANGUAGE.LANGUAGE_FRENCH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_ITALIAN) {
                    this.language = LANGUAGE.LANGUAGE_ITALIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_GERMAN) {
                    this.language = LANGUAGE.LANGUAGE_GERMAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_SPANISH) {
                    this.language = LANGUAGE.LANGUAGE_SPANISH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_DUTCH) {
                    this.language = LANGUAGE.LANGUAGE_DUTCH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_RUSSIAN) {
                    this.language = LANGUAGE.LANGUAGE_RUSSIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_KOREAN) {
                    this.language = LANGUAGE.LANGUAGE_KOREAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_JAPANESE) {
                    this.language = LANGUAGE.LANGUAGE_JAPANESE;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_HUNGARIAN) {
                    this.language = LANGUAGE.LANGUAGE_HUNGARIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_PORTUGUESE) {
                    this.language = LANGUAGE.LANGUAGE_PORTUGUESE;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_ARABIC) {
                    this.language = LANGUAGE.LANGUAGE_ARABIC;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_NORWEGIAN) {
                    this.language = LANGUAGE.LANGUAGE_NORWEGIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_POLISH) {
                    this.language = LANGUAGE.LANGUAGE_POLISH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_TURKISH) {
                    this.language = LANGUAGE.LANGUAGE_TURKISH;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_UKRAINIAN) {
                    this.language = LANGUAGE.LANGUAGE_UKRAINIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_ROMANIAN) {
                    this.language = LANGUAGE.LANGUAGE_ROMANIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_BULGARIAN) {
                    this.language = LANGUAGE.LANGUAGE_BULGARIAN;
                }
                else if (cc.sys.languageCode == cc.sys.LANGUAGE_UNKNOWN) {
                    this.language = LANGUAGE.LANGUAGE_UNKNOWN;
                }
            }
            return this.language;
        }
        static getOS() {
            if (!this.os) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    this.os = OS.OS_IOS;
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    this.os = OS.OS_ANDROID;
                }
                else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                    this.os = OS.OS_WINDOWS;
                }
                else if (cc.sys.os == cc.sys.OS_MARMALADE) {
                    this.os = OS.OS_MARMALADE;
                }
                else if (cc.sys.os == cc.sys.OS_LINUX) {
                    this.os = OS.OS_LINUX;
                }
                else if (cc.sys.os == cc.sys.OS_BADA) {
                    this.os = OS.OS_BADA;
                }
                else if (cc.sys.os == cc.sys.OS_BLACKBERRY) {
                    this.os = OS.OS_BLACKBERRY;
                }
                else if (cc.sys.os == cc.sys.OS_OSX) {
                    this.os = OS.OS_OSX;
                }
                else if (cc.sys.os == cc.sys.OS_WP8) {
                    this.os = OS.OS_WP8;
                }
                else if (cc.sys.os == cc.sys.OS_WINRT) {
                    this.os = OS.OS_WINRT;
                }
                else if (cc.sys.os == cc.sys.OS_UNKNOWN) {
                    this.os = OS.OS_UNKNOWN;
                }
            }
            return this.os;
        }
        static getPlatform() {
            if (!this.platform) {
                if (cc.sys.platform == cc.sys.WIN32) {
                    this.platform = PLATFORM.WIN32;
                }
                else if (cc.sys.platform == cc.sys.LINUX) {
                    this.platform = PLATFORM.LINUX;
                }
                else if (cc.sys.platform == cc.sys.MACOS) {
                    this.platform = PLATFORM.MACOS;
                }
                else if (cc.sys.platform == cc.sys.ANDROID) {
                    this.platform = PLATFORM.ANDROID;
                }
                else if (cc.sys.platform == cc.sys.IPHONE) {
                    this.platform = PLATFORM.IPHONE;
                }
                else if (cc.sys.platform == cc.sys.IPAD) {
                    this.platform = PLATFORM.IPAD;
                }
                else if (cc.sys.platform == cc.sys.BLACKBERRY) {
                    this.platform = PLATFORM.BLACKBERRY;
                }
                else if (cc.sys.platform == cc.sys.NACL) {
                    this.platform = PLATFORM.NACL;
                }
                else if (cc.sys.platform == cc.sys.EMSCRIPTEN) {
                    this.platform = PLATFORM.EMSCRIPTEN;
                }
                else if (cc.sys.platform == cc.sys.TIZEN) {
                    this.platform = PLATFORM.TIZEN;
                }
                else if (cc.sys.platform == cc.sys.WINRT) {
                    this.platform = PLATFORM.WINRT;
                }
                else if (cc.sys.platform == cc.sys.WP8) {
                    this.platform = PLATFORM.WP8;
                }
                else if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
                    this.platform = PLATFORM.MOBILE_BROWSER;
                }
                else if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
                    this.platform = PLATFORM.DESKTOP_BROWSER;
                }
                else if (cc.sys.platform == cc.sys.EDITOR_PAGE) {
                    this.platform = PLATFORM.EDITOR_PAGE;
                }
                else if (cc.sys.platform == cc.sys.EDITOR_CORE) {
                    this.platform = PLATFORM.EDITOR_CORE;
                }
                else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    this.platform = PLATFORM.WECHAT_GAME;
                }
                else if (cc.sys.platform == cc.sys.QQ_PLAY) {
                    this.platform = PLATFORM.QQ_PLAY;
                }
                else if (cc.sys.platform == cc.sys.FB_PLAYABLE_ADS) {
                    this.platform = PLATFORM.FB_PLAYABLE_ADS;
                }
                else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
                    this.platform = PLATFORM.BAIDU_GAME;
                }
                else if (cc.sys.platform == cc.sys.VIVO_GAME) {
                    this.platform = PLATFORM.VIVO_GAME;
                }
                else if (cc.sys.platform == cc.sys.OPPO_GAME) {
                    this.platform = PLATFORM.OPPO_GAME;
                }
                else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
                    this.platform = PLATFORM.HUAWEI_GAME;
                }
                else if (cc.sys.platform == cc.sys.XIAOMI_GAME) {
                    this.platform = PLATFORM.XIAOMI_GAME;
                }
                else if (cc.sys.platform == cc.sys.JKW_GAME) {
                    this.platform = PLATFORM.JKW_GAME;
                }
                else if (cc.sys.platform == cc.sys.ALIPAY_GAME) {
                    this.platform = PLATFORM.ALIPAY_GAME;
                }
                else if (cc.sys.platform == cc.sys.WECHAT_GAME_SUB) {
                    this.platform = PLATFORM.WECHAT_GAME_SUB;
                }
                else if (cc.sys.platform == cc.sys.BAIDU_GAME_SUB) {
                    this.platform = PLATFORM.BAIDU_GAME_SUB;
                }
                else if (cc.sys.platform == cc.sys.QTT_GAME) {
                    this.platform = PLATFORM.QTT_GAME;
                }
                else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
                    this.platform = PLATFORM.BYTEDANCE_GAME;
                }
                else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME_SUB) {
                    this.platform = PLATFORM.BYTEDANCE_GAME_SUB;
                }
                else if (cc.sys.platform == cc.sys.LINKSURE) {
                    this.platform = PLATFORM.LINKSURE;
                }
                else if (cc.sys.platform == cc.sys.UNKNOWN) {
                    this.platform = PLATFORM.UNKNOWN;
                }
                return this.platform;
            }
            return this.platform;
        }
        static getBrowerType() {
            if (!this.browserType) {
                if (cc.sys.browserType = cc.sys.BROWSER_TYPE_WECHAT) {
                    this.browserType = BROWSER.BROWSER_TYPE_WECHAT;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_ANDROID) {
                    this.browserType = BROWSER.BROWSER_TYPE_ANDROID;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_IE) {
                    this.browserType = BROWSER.BROWSER_TYPE_IE;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_EDGE) {
                    this.browserType = BROWSER.BROWSER_TYPE_EDGE;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_QQ) {
                    this.browserType = BROWSER.BROWSER_TYPE_QQ;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MOBILE_QQ) {
                    this.browserType = BROWSER.BROWSER_TYPE_MOBILE_QQ;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UC) {
                    this.browserType = BROWSER.BROWSER_TYPE_UC;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UCBS) {
                    this.browserType = BROWSER.BROWSER_TYPE_UCBS;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_360) {
                    this.browserType = BROWSER.BROWSER_TYPE_360;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_BAIDU_APP) {
                    this.browserType = BROWSER.BROWSER_TYPE_BAIDU_APP;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_BAIDU) {
                    this.browserType = BROWSER.BROWSER_TYPE_BAIDU;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MAXTHON) {
                    this.browserType = BROWSER.BROWSER_TYPE_MAXTHON;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_OPERA) {
                    this.browserType = BROWSER.BROWSER_TYPE_OPERA;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_OUPENG) {
                    this.browserType = BROWSER.BROWSER_TYPE_OUPENG;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MIUI) {
                    this.browserType = BROWSER.BROWSER_TYPE_MIUI;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_FIREFOX) {
                    this.browserType = BROWSER.BROWSER_TYPE_FIREFOX;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_SAFARI) {
                    this.browserType = BROWSER.BROWSER_TYPE_SAFARI;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_CHROME) {
                    this.browserType = BROWSER.BROWSER_TYPE_CHROME;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_LIEBAO) {
                    this.browserType = BROWSER.BROWSER_TYPE_LIEBAO;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_QZONE) {
                    this.browserType = BROWSER.BROWSER_TYPE_QZONE;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_SOUGOU) {
                    this.browserType = BROWSER.BROWSER_TYPE_SOUGOU;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_HUAWEI) {
                    this.browserType = BROWSER.BROWSER_TYPE_HUAWEI;
                }
                else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UNKNOWN) {
                    this.browserType = BROWSER.BROWSER_TYPE_UNKNOWN;
                }
            }
            return this.browserType;
        }
        static getNetwork() {
            if (!this.networkType) {
                this.networkType = cc.sys.getNetworkType();
            }
            return this.networkType;
        }
        static isBrowser() {
            return cc.sys.isBrowser;
        }
        static isMobile() {
            return cc.sys.isMobile;
        }
        static isNative() {
            return cc.sys.isNative;
        }
        static getOsInfo() {
            let osInfo = {
                type: this.getOS(),
                version: cc.sys.osVersion,
                mainVersion: cc.sys.osMainVersion,
            };
            return osInfo;
        }
        ;
        static getBrowserInfo() {
            let browserInfo = {
                type: this.getBrowerType(),
                version: cc.sys.browserVersion,
            };
            return browserInfo;
        }
    }
    Platform.language = undefined;
    Platform.os = undefined;
    Platform.platform = undefined;
    Platform.browserType = undefined;
    Platform.networkType = undefined;
    exports.Platform = Platform;
});
define("utils/Pool", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pool {
        constructor(prefab, component, initNum) {
            this.prefab = null;
            this.component = null;
            this.initNum = 1;
            this.pool = null;
            this.prefab = prefab;
            this.component = component;
            this.initNum = initNum;
            this.pool = new cc.NodePool();
            this.init();
        }
        init() {
            for (let i = 0; i < this.initNum; i++) {
                let node = this.createNode();
                this.pool.put(node);
            }
        }
        createNode() {
            let node = cc.instantiate(this.prefab);
            let component = node.getComponent(this.component);
            if (component && typeof component.reuse == "function") {
                component.reuse();
            }
            return node;
        }
        clear() {
            this.pool.clear();
        }
        get() {
            let node = this.pool.get() || null;
            if (!node) {
                node = this.createNode();
            }
            return node;
        }
        put(node) {
            this.pool.put(node);
        }
    }
    exports.Pool = Pool;
    ;
});
define("utils/PopUp", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.U_POP_UP_TYPE = cc.Enum({
        NONE: 0,
        SCALE: 1,
        SCALE_X: 2,
        SCALE_Y: 3,
    });
    const { ccclass, property } = cc._decorator;
    let UPopUp = class UPopUp extends cc.Component {
        constructor() {
            super(...arguments);
            this.target = this.node;
            this.popUpType = exports.U_POP_UP_TYPE.NONE;
        }
        reset() {
            switch (this.popUpType) {
                case exports.U_POP_UP_TYPE.NONE: {
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE: {
                    this.target.scale = 0;
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE_Y: {
                    this.target.scaleY = 0;
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE: {
                    this.target.scale = 0;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        ;
        action() {
            let sequnce = null;
            switch (this.popUpType) {
                case exports.U_POP_UP_TYPE.NONE: {
                    console.warn("there is nothing to do.", this.target && this.target.name);
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE: {
                    sequnce = cc.sequence(cc.scaleTo(0.3, 1.1), cc.scaleTo(0.1, 1.0));
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE_Y: {
                    sequnce = cc.sequence(cc.scaleTo(0.3, 1.0, 1.1), cc.scaleTo(0.1, 1.0, 1.0));
                    break;
                }
                case exports.U_POP_UP_TYPE.SCALE: {
                    sequnce = cc.sequence(cc.scaleTo(0.3, 1.1), cc.scaleTo(0.1, 1.0));
                    break;
                }
                default: {
                    console.error("not find ", this.popUpType);
                    break;
                }
            }
            if (sequnce) {
                this.target.runAction(sequnce);
            }
        }
        onLoad() {
            this.reset();
        }
        onEnable() {
            this.action();
        }
    };
    __decorate([
        property({ type: cc.Node })
    ], UPopUp.prototype, "target", void 0);
    __decorate([
        property({ type: exports.U_POP_UP_TYPE })
    ], UPopUp.prototype, "popUpType", void 0);
    UPopUp = __decorate([
        ccclass
    ], UPopUp);
    exports.default = UPopUp;
    ;
});
define("utils/Register", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UTouchRegister {
        static register(target, touchBegin, touchMove, touchEnded, touchCancel) {
            if (!target || !target.node) {
                console.error("UTouchRegister - register - invlid target.");
                return;
            }
            target.touchBeginCallback = (event) => {
                let pos = event.getLocation();
                if (typeof touchBegin == "function") {
                    touchBegin(pos);
                }
            };
            target.touchMoveCallback = (event) => {
                let pos = event.getLocation();
                let delta = event.getDelta();
                if (typeof touchMove == "function") {
                    touchMove(pos, delta);
                }
            };
            target.touchEnededCallback = (event) => {
                let pos = event.getLocation();
                if (typeof touchEnded == "function") {
                    touchEnded(pos);
                }
            };
            target.touchCancelCallback = (event) => {
                let pos = event.getLocation();
                if (typeof touchCancel == "function") {
                    touchCancel(pos);
                }
            };
            target.node.on(cc.Node.EventType.TOUCH_START, target.touchBeginCallback, target);
            target.node.on(cc.Node.EventType.TOUCH_MOVE, target.touchMoveCallback, target);
            target.node.on(cc.Node.EventType.TOUCH_END, target.touchEnededCallback, target);
            target.node.on(cc.Node.EventType.TOUCH_CANCEL, target.touchCancelCallback, target);
        }
        static unregister(target) {
            if (!target || !target.node) {
                console.error("UTouchRegister - unregister - invlid target.");
                return;
            }
            if (typeof target.touchBeginCallback == "function") {
                target.node.off(cc.Node.EventType.TOUCH_START, target.touchBeginCallback, target);
                target.touchBeginCallback = null;
            }
            if (typeof target.touchMoveCallback == "function") {
                target.node.off(cc.Node.EventType.TOUCH_MOVE, target.touchMoveCallback, target);
                target.touchMoveCallback = null;
            }
            if (typeof target.touchEnededCallback == "function") {
                target.node.off(cc.Node.EventType.TOUCH_END, target.touchEnededCallback, target);
                target.touchEnededCallback = null;
            }
            if (typeof target.touchCancelCallback == "function") {
                target.node.off(cc.Node.EventType.TOUCH_CANCEL, target.touchCancelCallback, target);
                target.touchCancelCallback = null;
            }
        }
        ;
    }
    exports.UTouchRegister = UTouchRegister;
    ;
    class UMouseRegister {
        constructor() {
            this.unregister = function (target) {
                if (!target || !target.node) {
                    console.error("UMouseRegister - unregister - invlid node.");
                    return;
                }
                if (typeof target.mouseDown == "function") {
                    target.node.off(cc.Node.EventType.MOUSE_DOWN, target.mouseDown, target);
                    target.mouseDown = null;
                }
                if (typeof target.mouseUp == "function") {
                    target.node.off(cc.Node.EventType.MOUSE_UP, target.mouseUp, target);
                    target.mouseUp = null;
                }
                if (typeof target.mouseMove == "function") {
                    target.node.off(cc.Node.EventType.MOUSE_MOVE, target.mouseMove, target);
                    target.mouseMove = null;
                }
                if (typeof target.mouseWheel == "function") {
                    target.node.off(cc.Node.EventType.MOUSE_WHEEL, target.mouseWheel, target);
                    target.mouseWheel = null;
                }
            };
        }
        static register(target, leftDown, leftUp, midDown, midUp, rightDown, rigthUp, mouseMove, wheelScroll) {
            if (!target || !target.node) {
                console.error("UMouseRegister - register - invlid node.");
                return;
            }
            target.mouseDown = (event) => {
                let mouseBtnType = event.getButton();
                let pos = event.getLocation();
                if (mouseBtnType == cc.Event.EventMouse.BUTTON_LEFT) {
                    if (typeof leftDown == "function") {
                        leftDown(pos);
                    }
                }
                else if (mouseBtnType == cc.Event.EventMouse.BUTTON_RIGHT) {
                    if (typeof rightDown == "function") {
                        rightDown(pos);
                    }
                }
                else if (mouseBtnType == cc.Event.EventMouse.BUTTON_MIDDLE) {
                    if (typeof midDown == "function") {
                        midDown(pos);
                    }
                }
                else {
                    console.error("mouseDown:", mouseBtnType);
                }
            };
            target.mouseUp = (event) => {
                let mouseBtnType = event.getButton();
                let pos = event.getLocation();
                if (mouseBtnType == cc.Event.EventMouse.BUTTON_LEFT) {
                    if (typeof leftUp == "function") {
                        leftUp(pos);
                    }
                }
                else if (mouseBtnType == cc.Event.EventMouse.BUTTON_RIGHT) {
                    if (typeof rigthUp == "function") {
                        rigthUp(pos);
                    }
                }
                else if (mouseBtnType == cc.Event.EventMouse.BUTTON_MIDDLE) {
                    if (typeof midUp == "function") {
                        midUp(pos);
                    }
                }
                else {
                    console.error("mouseUp:", mouseBtnType);
                }
            };
            target.mouseMove = (event) => {
                let pos = event.getLocation();
                let delta = event.getDelta();
                if (typeof mouseMove == "function") {
                    mouseMove(pos, delta);
                }
            };
            target.mouseWheel = (event) => {
                let scrollY = event.getScrollY();
                if (typeof wheelScroll == "function") {
                    wheelScroll(scrollY);
                }
            };
            target.node.on(cc.Node.EventType.MOUSE_DOWN, target.mouseDown, target);
            target.node.on(cc.Node.EventType.MOUSE_UP, target.mouseUp, target);
            target.node.on(cc.Node.EventType.MOUSE_MOVE, target.mouseMove, target);
            target.node.on(cc.Node.EventType.MOUSE_WHEEL, target.mouseWheel, target);
        }
    }
    exports.UMouseRegister = UMouseRegister;
    ;
    class UBackgroundRegister {
        static register(target, hide, show) {
            if (!target || !target.node) {
                console.error("UBackgroundRegister - register - invlid node.");
                return;
            }
            target.hideCallback = () => {
                if (typeof hide == "function") {
                    hide();
                }
            };
            target.showCallback = () => {
                if (typeof show == "function") {
                    show();
                }
            };
            cc.game.on(cc.game.EVENT_HIDE, target.hideCallback, target);
            cc.game.on(cc.game.EVENT_SHOW, target.showCallback, target);
        }
        static unregister(target) {
            if (!target || !target.node) {
                console.error("UBackgroundRegister - unregister - invlid node.");
                return;
            }
            if (typeof target.hideCallback == "function") {
                cc.game.off(cc.game.EVENT_HIDE, target.hideCallback, target);
                target.hideCallback = null;
            }
            if (typeof target.showCallback == "function") {
                cc.game.off(cc.game.EVENT_SHOW, target.showCallback, target);
                target.showCallback = null;
            }
        }
    }
    exports.UBackgroundRegister = UBackgroundRegister;
    ;
    class UAndroidRegister {
        static register(backCallback, homeCallback, menuCallback) {
            let node = cc.Canvas.instance.node;
            node.keyUp = (event) => {
                if (event.keyCode == cc.macro.KEY.back) {
                    if (typeof backCallback == "function") {
                        backCallback();
                    }
                }
                else if (event.keyCode == cc.macro.KEY.home) {
                    if (typeof homeCallback == "function") {
                        homeCallback();
                    }
                }
                else if (event.keyCode == cc.macro.KEY.menu) {
                    if (typeof menuCallback == "function") {
                        menuCallback();
                    }
                }
                else {
                    console.error("UtilEvent - keyCode:", event.keyCode);
                }
            };
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, node.keyUp, cc.Canvas.instance);
        }
        static unregister() {
            let node = cc.Canvas.instance.node;
            if (typeof node.keyUp == "function") {
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, node.keyUp, cc.Canvas.instance);
            }
        }
    }
    exports.UAndroidRegister = UAndroidRegister;
    ;
});
define("utils/Sign", ["require", "exports", "utils/Storage", "type/Objects"], function (require, exports, Storage_2, Objects_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _SIGN_KEY = "cu.sign.object";
    let _SIGN_LIFECYCLE = 7;
    let _IS_NEED_CONTINUOUS = true;
    class USigned {
        constructor() {
            this.signObj = {
                _inited: false,
                lastDay: 0,
                continuous: 0,
            };
        }
        getSignObj() {
            if (!this.signObj._inited) {
                let str = Storage_2.Storage.get(_SIGN_KEY);
                if (!str) {
                    this.signObj._inited = true;
                    this.saveSignObj(this.signObj);
                }
                else {
                    let signObj = JSON.parse(str);
                    Objects_6.Objects.merge(this.signObj, signObj);
                    this.signObj._inited = true;
                }
            }
            return this.signObj;
        }
        saveSignObj(obj) {
            setTimeout(() => {
                let str = JSON.stringify(obj);
                Storage_2.Storage.set(_SIGN_KEY, str);
            }, 1);
        }
        ;
        getLastDay() {
            this.signObj = this.getSignObj();
            return this.signObj.lastDay;
        }
        setLastDay(day) {
            this.signObj = this.getSignObj();
            this.signObj.lastDay = day;
            this.saveSignObj(this.signObj);
        }
        getContinuous() {
            this.signObj = this.getSignObj();
            return this.signObj.continuous;
        }
        setContinuous(continuous) {
            this.signObj = this.getSignObj();
            this.signObj.continuous = continuous;
            this.saveSignObj(this.signObj);
        }
        isNeedSign() {
            let day = new Date().getDate();
            let lastDay = this.getLastDay();
            let isNeedSign = day != lastDay;
            if (isNeedSign) {
                let isReset = false;
                let continuous = this.getContinuous();
                if (continuous >= _SIGN_LIFECYCLE) {
                    isReset = true;
                }
                if (_IS_NEED_CONTINUOUS) {
                    let offset = day - lastDay;
                    if (offset > 1) {
                        isReset = true;
                    }
                }
                if (isReset) {
                    this.setContinuous(0);
                }
            }
            return isNeedSign;
        }
        getSignDays() {
            let continuous = this.getContinuous();
            return continuous;
        }
        sign() {
            let day = new Date().getDate();
            this.setLastDay(day);
            let continuous = this.getContinuous();
            continuous += 1;
            this.setContinuous(continuous);
        }
    }
    exports.USigned = USigned;
    ;
});
define("utils/Statistics", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _REPORT_URL = "https://www.baidu.com";
    class UTrack {
        constructor(msg = "") {
            this.track = {
                time: 0,
                msg: "",
            };
            this.track.time = new Date().getTime();
            this.track.msg = msg;
        }
        toString() {
            let str = JSON.stringify(this.track);
            return str;
        }
    }
    exports.UTrack = UTrack;
    class UStatistics {
        constructor() {
            this.statisticsObj = {
                _inited: false,
                time: 0,
                tracks: [],
            };
        }
        static getStatisticsObj() {
        }
        static setStatisticsObj() {
        }
        static record(track) {
        }
        static report() {
        }
    }
    exports.UStatistics = UStatistics;
    ;
});
define("utils/Toast", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let nodeToast = null;
    class UToast {
        static show(message, parent) {
            parent = parent instanceof cc.Node ? parent : cc.Canvas.instance.node;
            let nodeSp = new cc.Node();
            nodeSp.parent = parent;
            nodeSp.active = true;
            nodeToast = nodeSp;
            let sp = nodeSp.addComponent(cc.Sprite);
            sp.type = cc.Sprite.Type.SLICED;
            sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.loader.loadRes("lobby/common/lobby_toastBg", cc.SpriteFrame, (err, res) => {
                if (err) {
                    console.error(err);
                }
                else {
                    sp.spriteFrame = res;
                    let nodeLab = new cc.Node();
                    nodeLab.parent = nodeSp;
                    nodeLab.active = true;
                    let label = nodeLab.addComponent(cc.Label);
                    label.string = message;
                    label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                    label.verticalAlign = cc.Label.VerticalAlign.CENTER;
                    label.fontSize = 40;
                    label.lineHeight = 50;
                    label.fontFamily = 'Arial';
                    label._forceUpdateRenderData(true);
                    nodeSp.width = label.node.width + 100;
                    nodeSp.height = label.node.height + 60;
                    nodeSp.setPosition(0, 0);
                    nodeSp.parent = parent;
                    setTimeout(() => {
                        nodeSp.removeFromParent(true);
                        nodeToast = null;
                    }, 1500);
                }
            });
        }
    }
    exports.UToast = UToast;
    ;
});
define("utils/Tool", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tool {
        static debounce(func, duration = 300) {
            let timeout = null;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, arguments);
                }, duration);
            };
        }
        static throttle(func, duration = 300) {
            let timeout = null;
            return function () {
                if (timeout)
                    return;
                timeout = setTimeout(() => {
                    func.apply(this, arguments);
                    timeout = null;
                }, duration);
            };
        }
    }
    exports.Tool = Tool;
    ;
});
define("utils/ULZW", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Binary(initData, p, l, bl) {
        let data = initData && initData.constructor == Array ? initData.slice() : [];
        p = p | 0;
        l = l | 0;
        bl = Math.max((bl || 8) | 0, 1);
        let mask = m(bl);
        let _m = 0xFFFFFFFF;
        this.data = function (index, value) {
            if (!isNaN(value))
                data[index] = (value | 0) || 0;
            if (!isNaN(index))
                return data[index];
            else
                return data.slice();
        };
        this.read = function () {
            var re;
            if (p >= l)
                return 0;
            if (32 - (p % 32) < bl) {
                re = (((data[p >> 5] & m(32 - (p % 32))) << ((p + bl) % 32)) | (data[(p >> 5) + 1] >>> (32 - ((p + bl) % 32)))) & mask;
            }
            else {
                re = (data[p >> 5] >>> (32 - (p + bl) % 32)) & mask;
            }
            p += bl;
            return re;
        };
        this.write = function (i) {
            var i, hi, li;
            i &= mask;
            if (32 - (l % 32) < bl) {
                data[l >> 5] |= i >>> (bl - (32 - (l % 32)));
                data[(l >> 5) + 1] |= (i << (32 - ((l + bl) % 32))) & _m;
            }
            else {
                data[l >> 5] |= (i << (32 - ((l + bl) % 32))) & _m;
            }
            l += bl;
        };
        this.eof = function () {
            return p >= l;
        };
        this.reset = function () {
            p = 0;
            mask = m(bl);
        };
        this.resetAll = function () {
            data = [];
            p = 0;
            l = 0;
            bl = 8;
            mask = m(bl);
            _m = 0xFFFFFFFF;
        };
        this.setBitLength = function (len) {
            bl = Math.max(len | 0, 1);
            mask = m(bl);
        };
        this.toHexString = function () {
            var re = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i] < 0) {
                    re.push(pad((data[i] >>> 16).toString(16), 4) + pad((data[i] & 0xFFFF).toString(16), 4));
                }
                else {
                    re.push(pad(data[i].toString(16), 8));
                }
            }
            return re.join("");
        };
        this.toBinaryString = function () {
            var re = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i] < 0) {
                    re.push(pad((data[i] >>> 1).toString(2), 31) + (data[i] & 1));
                }
                else {
                    re.push(pad(data[i].toString(2), 32));
                }
            }
            return re.join("").substring(0, l);
        };
        this.toCString = function () {
            var _p = p, _bl = bl, re = [];
            this.setBitLength(13);
            this.reset();
            while (p < l)
                re.push(C(this.read()));
            this.setBitLength(_bl);
            p = _p;
            return C(l >>> 13) + C(l & m(13)) + re.join("");
        };
        this.fromCString = function (str) {
            this.resetAll();
            this.setBitLength(13);
            for (var i = 2; i < str.length; i++)
                this.write(D(str, i));
            l = (D(str, 0) << 13) | (D(str, 1) & m(13));
            return this;
        };
        this.clone = function () {
            return new Binary(data, p, l, bl);
        };
        function m(len) {
            return (1 << len) - 1;
        }
        function pad(s, len) {
            return (new Array(len + 1)).join("0").substring(s.length) + s;
        }
        function C(i) {
            return String.fromCharCode(i + 0x4e00);
        }
        function D(s, i) {
            return s.charCodeAt(i) - 0x4e00;
        }
    }
    class ULZW {
        static compress(str) {
            var b = new Binary(), code_index = -1, char_len = 8;
            var str = str.replace(/[\u0100-\uFFFF]/g, function (s) {
                return "\&\#u" + pad(s.charCodeAt(0).toString(16), 4) + ";";
            });
            var dic = {}, cp = [], cpi, bl = 8;
            b.setBitLength(bl);
            for (var i = 0; i < (1 << char_len) + 2; i++)
                dic[i] = ++code_index;
            cp[0] = str.charCodeAt(0);
            for (var i = 1; i < str.length; i++) {
                cp[1] = str.charCodeAt(i);
                cpi = (cp[0] << 16) | cp[1];
                if (dic[cpi] == undefined) {
                    dic[cpi] = (++code_index);
                    if (cp[0] > m(bl)) {
                        b.write(0x80);
                        b.setBitLength(++bl);
                    }
                    b.write(cp[0]);
                    cp[0] = cp[1];
                }
                else {
                    cp[0] = dic[cpi];
                }
            }
            b.write(cp[0]);
            function pad(s, len) {
                return (new Array(len + 1)).join("0").substring(s.length) + s;
            }
            function m(len) {
                return (1 << len) - 1;
            }
            return b.toCString();
        }
        static decompress(s) {
            var b = new function () {
                var d = [], p = 0, l = 0, L = 13, k = m(L), _m = 0xFFFFFFFF;
                this.r = function () {
                    var r;
                    if (32 - (p % 32) < L)
                        r = (((d[p >> 5] & m(32 - (p % 32))) << ((p + L) % 32)) | (d[(p >> 5) + 1] >>> (32 - ((p + L) % 32)))) & k;
                    else
                        r = (d[p >> 5] >>> (32 - (p + L) % 32)) & k;
                    p += L;
                    return r;
                };
                this.w = function (i) {
                    i &= k;
                    if (32 - (l % 32) < L) {
                        d[l >> 5] |= i >>> (L - (32 - (l % 32)));
                        d[(l >> 5) + 1] |= (i << (32 - ((l + L) % 32))) & _m;
                    }
                    else
                        d[l >> 5] |= (i << (32 - ((l + L) % 32))) & _m;
                    l += L;
                };
                this.e = function () {
                    return p >= l;
                };
                this.l = function (len) {
                    L = Math.max(len | 0, 1);
                    k = m(L);
                };
                function m(len) {
                    return (1 << len) - 1;
                }
                function pad(s, l) {
                    return (new Array(l + 1)).join("0").substring(s.length) + s;
                }
                for (var i = 2; i < s.length; i++)
                    this.w(s.charCodeAt(i) - 0x4e00);
                l = ((s.charCodeAt(0) - 0x4e00) << 13) | ((s.charCodeAt(1) - 0x4e00) & m(13));
                p = 0;
            };
            var R = [], C = -1, D = {}, P = [], L = 8;
            for (let i = 0; i < (1 << L) + 2; i++)
                D[i] = String.fromCharCode(++C);
            b.l(L);
            P[0] = b.r();
            while (!b.e()) {
                P[1] = b.r();
                if (P[1] == 0x80) {
                    b.l(++L);
                    P[1] = b.r();
                }
                if (D[P[1]] == undefined)
                    D[++C] = D[P[0]] + D[P[0]].charAt(0);
                else
                    D[++C] = D[P[0]] + D[P[1]].charAt(0);
                R.push(D[P[0]]);
                P[0] = P[1];
            }
            R.push(D[P[0]]);
            return R.join("").replace(/\&\#u[0-9a-fA-F]{4};/g, function (w) {
                return String.fromCharCode(parseInt(w.substring(3, 7), 16));
            });
        }
    }
    exports.ULZW = ULZW;
    ;
});
define("utils/User", ["require", "exports", "utils/Storage", "type/Objects"], function (require, exports, Storage_3, Objects_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let _USER_KEY = "cu.user.object";
    var GENDER;
    (function (GENDER) {
        GENDER[GENDER["FEMALE"] = 0] = "FEMALE";
        GENDER[GENDER["MALE"] = 1] = "MALE";
        GENDER[GENDER["UNKNOWN"] = 2] = "UNKNOWN";
    })(GENDER = exports.GENDER || (exports.GENDER = {}));
    class User {
        constructor() {
            this.userObj = {
                _inited: false,
                name: "",
                avaterUrl: "",
                age: 0,
                gender: GENDER.UNKNOWN,
                motto: "",
            };
        }
        getUserObj() {
            if (!this.userObj._inited) {
                let str = Storage_3.Storage.get(_USER_KEY);
                if (str) {
                    this.userObj._inited = true;
                    this.saveUserObj(this.userObj);
                }
                else {
                    let userObj = Storage_3.Storage.get(_USER_KEY);
                    Objects_7.Objects.merge(this.userObj, userObj);
                    this.userObj._inited = true;
                }
            }
            return this.userObj;
        }
        saveUserObj(obj) {
            let str = JSON.stringify(obj);
            Storage_3.Storage.set(_USER_KEY, str);
        }
        getName() {
            this.userObj = this.getUserObj();
            return this.userObj.name;
        }
        setName(name) {
            this.userObj = this.getUserObj();
            if (this.userObj.name != name) {
                this.userObj.name = name;
                this.saveUserObj(this.userObj);
            }
        }
        getAvatarUrl() {
            this.userObj = this.getUserObj();
            return this.userObj.avaterUrl;
        }
        setAvatarUrl(avatarUrl) {
            this.userObj = this.getUserObj();
            if (this.userObj.avaterUrl != avatarUrl) {
                this.userObj.avaterUrl = avatarUrl;
                this.saveUserObj(this.userObj);
            }
        }
        getAge() {
            this.userObj = this.getUserObj();
            return this.userObj.age;
        }
        setAge(age) {
            this.userObj = this.getUserObj();
            if (this.userObj.age != age) {
                this.userObj.age = age;
                this.saveUserObj(this.userObj);
            }
        }
        getGender() {
            this.userObj = this.getUserObj();
            return this.userObj.gender;
        }
        setGender(gender) {
            this.userObj = this.getUserObj();
            if (this.userObj.gender != gender) {
                this.userObj.gender = gender;
                this.saveUserObj(this.userObj);
            }
        }
        getMotto() {
            this.userObj = this.getUserObj();
            return this.userObj.motto;
        }
        setMotto(motto) {
            this.userObj = this.getUserObj();
            if (this.userObj.motto != motto) {
                this.userObj.motto = motto;
                this.saveUserObj(this.userObj);
            }
        }
    }
    exports.User = User;
    ;
});
define("utils/Xml", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let DOMNodeTypes = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
    };
    class UXml {
        constructor(config) {
            this.VERSION = "1.2.0";
            this.config = {
                escapeMode: undefined,
                attributePrefix: undefined,
                arrayAccessForm: undefined,
                emptyNodeForm: undefined,
                enableToStringFunc: undefined,
                arrayAccessFormPaths: undefined,
                skipEmptyTextNodesForObj: undefined,
                stripWhitespaces: undefined,
                datetimeAccessFormPaths: undefined,
                useDoubleQuotes: undefined,
                xmlElementsFilter: undefined,
                jsonPropertiesFilter: undefined,
                keepCData: undefined,
            };
            this.config = config || {};
            this.initConfigDefaults();
            this.initRequiredPolyfills();
        }
        initConfigDefaults() {
            if (this.config.escapeMode === undefined) {
                this.config.escapeMode = true;
            }
            this.config.attributePrefix = this.config.attributePrefix || "_";
            this.config.arrayAccessForm = this.config.arrayAccessForm || "none";
            this.config.emptyNodeForm = this.config.emptyNodeForm || "text";
            if (this.config.enableToStringFunc === undefined) {
                this.config.enableToStringFunc = true;
            }
            this.config.arrayAccessFormPaths = this.config.arrayAccessFormPaths || [];
            if (this.config.skipEmptyTextNodesForObj === undefined) {
                this.config.skipEmptyTextNodesForObj = true;
            }
            if (this.config.stripWhitespaces === undefined) {
                this.config.stripWhitespaces = true;
            }
            this.config.datetimeAccessFormPaths = this.config.datetimeAccessFormPaths || [];
            if (this.config.useDoubleQuotes === undefined) {
                this.config.useDoubleQuotes = false;
            }
            this.config.xmlElementsFilter = this.config.xmlElementsFilter || [];
            this.config.jsonPropertiesFilter = this.config.jsonPropertiesFilter || [];
            if (this.config.keepCData === undefined) {
                this.config.keepCData = false;
            }
        }
        initRequiredPolyfills() {
        }
        getNodeLocalName(node) {
            let nodeLocalName = node.localName;
            if (nodeLocalName == null)
                nodeLocalName = node.baseName;
            if (nodeLocalName == null || nodeLocalName == "")
                nodeLocalName = node.nodeName;
            return nodeLocalName;
        }
        getNodePrefix(node) {
            return node.prefix;
        }
        escapeXmlChars(str) {
            if (typeof (str) == "string")
                return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
            else
                return str;
        }
        unescapeXmlChars(str) {
            return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
        }
        checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
            let idx = 0;
            for (; idx < stdFiltersArrayForm.length; idx++) {
                let filterPath = stdFiltersArrayForm[idx];
                if (typeof filterPath === "string") {
                    if (filterPath == path)
                        break;
                }
                else if (filterPath instanceof RegExp) {
                    if (filterPath.test(path))
                        break;
                }
                else if (typeof filterPath === "function") {
                    if (filterPath(obj, name, path))
                        break;
                }
            }
            return idx != stdFiltersArrayForm.length;
        }
        toArrayAccessForm(obj, childName, path) {
            switch (this.config.arrayAccessForm) {
                case "property":
                    if (!(obj[childName] instanceof Array))
                        obj[childName + "_asArray"] = [obj[childName]];
                    else
                        obj[childName + "_asArray"] = obj[childName];
                    break;
            }
            if (!(obj[childName] instanceof Array) && this.config.arrayAccessFormPaths.length > 0) {
                if (this.checkInStdFiltersArrayForm(this.config.arrayAccessFormPaths, obj, childName, path)) {
                    obj[childName] = [obj[childName]];
                }
            }
        }
        fromXmlDateTime(prop) {
            var bits = prop.split(/[-T:+Z]/g);
            var d = new Date(bits[0], bits[1] - 1, bits[2]);
            var secondBits = bits[5].split("\.");
            d.setHours(bits[3], bits[4], secondBits[0]);
            if (secondBits.length > 1)
                d.setMilliseconds(secondBits[1]);
            if (bits[6] && bits[7]) {
                var offsetMinutes = bits[6] * 60 + Number(bits[7]);
                var sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';
                offsetMinutes = 0 + (sign == '-' ? -1 * offsetMinutes : offsetMinutes);
                d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset());
            }
            else if (prop.indexOf("Z", prop.length - 1) !== -1) {
                d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
            }
            return d;
        }
        checkFromXmlDateTimePaths(value, childName, fullPath) {
            if (this.config.datetimeAccessFormPaths.length > 0) {
                var path = fullPath.split("\.#")[0];
                if (this.checkInStdFiltersArrayForm(this.config.datetimeAccessFormPaths, value, childName, path)) {
                    return this.fromXmlDateTime(value);
                }
                else
                    return value;
            }
            else
                return value;
        }
        checkXmlElementsFilter(obj, childType, childName, childPath) {
            if (childType == DOMNodeTypes.ELEMENT_NODE && this.config.xmlElementsFilter.length > 0) {
                return this.checkInStdFiltersArrayForm(this.config.xmlElementsFilter, obj, childName, childPath);
            }
            else
                return true;
        }
        parseDOMChildren(node, path) {
            if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
                var result = new Object;
                var nodeChildren = node.childNodes;
                for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                    var child = nodeChildren.item(cidx);
                    if (child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                        var childName = this.getNodeLocalName(child);
                        result[childName] = this.parseDOMChildren(child, childName);
                    }
                }
                return result;
            }
            else if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                let result = {};
                result.__cnt = 0;
                var nodeChildren = node.childNodes;
                for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                    var child = nodeChildren.item(cidx);
                    var childName = this.getNodeLocalName(child);
                    if (child.nodeType != DOMNodeTypes.COMMENT_NODE) {
                        var childPath = path + "." + childName;
                        if (this.checkXmlElementsFilter(result, child.nodeType, childName, childPath)) {
                            result.__cnt++;
                            if (result[childName] == null) {
                                result[childName] = this.parseDOMChildren(child, childPath);
                                this.toArrayAccessForm(result, childName, childPath);
                            }
                            else {
                                if (result[childName] != null) {
                                    if (!(result[childName] instanceof Array)) {
                                        result[childName] = [result[childName]];
                                        this.toArrayAccessForm(result, childName, childPath);
                                    }
                                }
                                (result[childName])[result[childName].length] = this.parseDOMChildren(child, childPath);
                            }
                        }
                    }
                }
                for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                    var attr = node.attributes.item(aidx);
                    result.__cnt++;
                    result[this.config.attributePrefix + attr.name] = attr.value;
                }
                var nodePrefix = this.getNodePrefix(node);
                if (nodePrefix != null && nodePrefix != "") {
                    result.__cnt++;
                    result.__prefix = nodePrefix;
                }
                if (result["#text"] != null) {
                    result.__text = result["#text"];
                    if (result.__text instanceof Array) {
                        result.__text = result.__text.join("\n");
                    }
                    if (this.config.stripWhitespaces)
                        result.__text = result.__text.trim();
                    delete result["#text"];
                    if (this.config.arrayAccessForm == "property")
                        delete result["#text_asArray"];
                    result.__text = this.checkFromXmlDateTimePaths(result.__text, childName, path + "." + childName);
                }
                if (result["#cdata-section"] != null) {
                    result.__cdata = result["#cdata-section"];
                    delete result["#cdata-section"];
                    if (this.config.arrayAccessForm == "property")
                        delete result["#cdata-section_asArray"];
                }
                if (result.__cnt == 0 && this.config.emptyNodeForm == "text") {
                    result = '';
                }
                else if (result.__cnt == 1 && result.__text != null) {
                    result = result.__text;
                }
                else if (result.__cnt == 1 && result.__cdata != null && !this.config.keepCData) {
                    result = result.__cdata;
                }
                else if (result.__cnt > 1 && result.__text != null && this.config.skipEmptyTextNodesForObj) {
                    if ((this.config.stripWhitespaces && result.__text == "") || (result.__text.trim() == "")) {
                        delete result.__text;
                    }
                }
                delete result.__cnt;
                if (this.config.enableToStringFunc && (result.__text != null || result.__cdata != null)) {
                    result.toString = function () {
                        return (this.__text != null ? this.__text : '') + (this.__cdata != null ? this.__cdata : '');
                    };
                }
                return result;
            }
            else if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
                return node.nodeValue;
            }
        }
        startTag(jsonObj, element, attrList, closed) {
            var resultStr = "<" + ((jsonObj != null && jsonObj.__prefix != null) ? (jsonObj.__prefix + ":") : "") + element;
            if (attrList != null) {
                for (var aidx = 0; aidx < attrList.length; aidx++) {
                    var attrName = attrList[aidx];
                    var attrVal = jsonObj[attrName];
                    if (this.config.escapeMode)
                        attrVal = this.escapeXmlChars(attrVal);
                    resultStr += " " + attrName.substr(this.config.attributePrefix.length) + "=";
                    if (this.config.useDoubleQuotes)
                        resultStr += '"' + attrVal + '"';
                    else
                        resultStr += "'" + attrVal + "'";
                }
            }
            if (!closed)
                resultStr += ">";
            else
                resultStr += "/>";
            return resultStr;
        }
        endTag(jsonObj, elementName) {
            return "</" + (jsonObj.__prefix != null ? (jsonObj.__prefix + ":") : "") + elementName + ">";
        }
        endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        jsonXmlSpecialElem(jsonObj, jsonObjField) {
            if ((this.config.arrayAccessForm == "property" && this.endsWith(jsonObjField.toString(), ("_asArray")))
                || jsonObjField.toString().indexOf(this.config.attributePrefix) == 0
                || jsonObjField.toString().indexOf("__") == 0
                || (jsonObj[jsonObjField] instanceof Function))
                return true;
            else
                return false;
        }
        jsonXmlElemCount(jsonObj) {
            var elementsCnt = 0;
            if (jsonObj instanceof Object) {
                for (var it in jsonObj) {
                    if (this.jsonXmlSpecialElem(jsonObj, it))
                        continue;
                    elementsCnt++;
                }
            }
            return elementsCnt;
        }
        checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
            return this.config.jsonPropertiesFilter.length == 0
                || jsonObjPath == ""
                || this.checkInStdFiltersArrayForm(this.config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);
        }
        parseJSONAttributes(jsonObj) {
            var attrList = [];
            if (jsonObj instanceof Object) {
                for (var ait in jsonObj) {
                    if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf(this.config.attributePrefix) == 0) {
                        attrList.push(ait);
                    }
                }
            }
            return attrList;
        }
        parseJSONTextAttrs(jsonTxtObj) {
            var result = "";
            if (jsonTxtObj.__cdata != null) {
                result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
            }
            if (jsonTxtObj.__text != null) {
                if (this.config.escapeMode)
                    result += this.escapeXmlChars(jsonTxtObj.__text);
                else
                    result += jsonTxtObj.__text;
            }
            return result;
        }
        parseJSONTextObject(jsonTxtObj) {
            var result = "";
            if (jsonTxtObj instanceof Object) {
                result += this.parseJSONTextAttrs(jsonTxtObj);
            }
            else if (jsonTxtObj != null) {
                if (this.config.escapeMode)
                    result += this.escapeXmlChars(jsonTxtObj);
                else
                    result += jsonTxtObj;
            }
            return result;
        }
        getJsonPropertyPath(jsonObjPath, jsonPropName) {
            if (jsonObjPath === "") {
                return jsonPropName;
            }
            else
                return jsonObjPath + "." + jsonPropName;
        }
        parseJSONArray(jsonArrRoot, jsonArrObj, attrList, jsonObjPath) {
            var result = "";
            if (jsonArrRoot.length == 0) {
                result += this.startTag(jsonArrRoot, jsonArrObj, attrList, true);
            }
            else {
                for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                    result += this.startTag(jsonArrRoot[arIdx], jsonArrObj, this.parseJSONAttributes(jsonArrRoot[arIdx]), false);
                    result += this.parseJSONObject(jsonArrRoot[arIdx], this.getJsonPropertyPath(jsonObjPath, jsonArrObj));
                    result += this.endTag(jsonArrRoot[arIdx], jsonArrObj);
                }
            }
            return result;
        }
        parseJSONObject(jsonObj, jsonObjPath) {
            var result = "";
            var elementsCnt = this.jsonXmlElemCount(jsonObj);
            if (elementsCnt > 0) {
                for (var it in jsonObj) {
                    if (this.jsonXmlSpecialElem(jsonObj, it) || (jsonObjPath != "" && !this.checkJsonObjPropertiesFilter(jsonObj, it, this.getJsonPropertyPath(jsonObjPath, it))))
                        continue;
                    var subObj = jsonObj[it];
                    var attrList = this.parseJSONAttributes(subObj);
                    if (subObj == null || subObj == undefined) {
                        result += this.startTag(subObj, it, attrList, true);
                    }
                    else if (subObj instanceof Object) {
                        if (subObj instanceof Array) {
                            result += this.parseJSONArray(subObj, it, attrList, jsonObjPath);
                        }
                        else if (subObj instanceof Date) {
                            result += this.startTag(subObj, it, attrList, false);
                            result += subObj.toISOString();
                            result += this.endTag(subObj, it);
                        }
                        else {
                            var subObjElementsCnt = this.jsonXmlElemCount(subObj);
                            if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
                                result += this.startTag(subObj, it, attrList, false);
                                result += this.parseJSONObject(subObj, this.getJsonPropertyPath(jsonObjPath, it));
                                result += this.endTag(subObj, it);
                            }
                            else {
                                result += this.startTag(subObj, it, attrList, true);
                            }
                        }
                    }
                    else {
                        result += this.startTag(subObj, it, attrList, false);
                        result += this.parseJSONTextObject(subObj);
                        result += this.endTag(subObj, it);
                    }
                }
            }
            result += this.parseJSONTextObject(jsonObj);
            return result;
        }
        parseXmlString(xmlDocStr) {
            var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
            if (xmlDocStr === undefined) {
                return null;
            }
            var xmlDoc;
            if (window.DOMParser) {
                var parser = new window.DOMParser();
                var parsererrorNS = null;
                if (!isIEParser) {
                    try {
                        parsererrorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
                    }
                    catch (err) {
                        parsererrorNS = null;
                    }
                }
                try {
                    xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
                    if (parsererrorNS != null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
                        xmlDoc = null;
                    }
                }
                catch (err) {
                    xmlDoc = null;
                }
            }
            else {
                if (xmlDocStr.indexOf("<?") == 0) {
                    xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
                }
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(xmlDocStr);
            }
            return xmlDoc;
        }
        ;
        asArray(prop) {
            if (prop === undefined || prop == null)
                return [];
            else if (prop instanceof Array)
                return prop;
            else
                return [prop];
        }
        ;
        toXmlDateTime(dt) {
            if (dt instanceof Date)
                return dt.toISOString();
            else if (typeof (dt) === 'number')
                return new Date(dt).toISOString();
            else
                return null;
        }
        ;
        asDateTime(prop) {
            if (typeof (prop) == "string") {
                return this.fromXmlDateTime(prop);
            }
            else
                return prop;
        }
        ;
        xml2json(xmlDoc) {
            return this.parseDOMChildren(xmlDoc);
        }
        ;
        xml_str2json(xmlDocStr) {
            var xmlDoc = this.parseXmlString(xmlDocStr);
            if (xmlDoc != null)
                return this.xml2json(xmlDoc);
            else
                return null;
        }
        ;
        json2xml_str(jsonObj) {
            return this.parseJSONObject(jsonObj, "");
        }
        ;
        json2xml(jsonObj) {
            var xmlDocStr = this.json2xml_str(jsonObj);
            return this.parseXmlString(xmlDocStr);
        }
        getVersion() {
            return this.VERSION;
        }
    }
    exports.UXml = UXml;
});
define("utils/Zip", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UZip {
        static loadZip(zipPath, fileName, callback) {
            cc.resources.load(zipPath, (err, assets) => {
                if (err) {
                    console.error(err.message);
                }
                else {
                    JSZip.loadAsync(assets._buffer).then((zip) => {
                        zip.file(fileName).async("text").then((data) => {
                            if (typeof callback == "function") {
                                callback(data);
                            }
                        });
                    });
                }
            });
        }
    }
    exports.UZip = UZip;
    ;
});
