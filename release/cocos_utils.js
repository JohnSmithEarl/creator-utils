var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("base/algo/AlgoAStar", ["require", "exports"], function (require, exports) {
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
define("base/algo/AlgoSearch", ["require", "exports"], function (require, exports) {
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
define("base/algo/AlgoSort", ["require", "exports"], function (require, exports) {
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
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        define([], factory);
    }
    else {
        root.CryptoJS = factory();
    }
}(this, function () {
    var CryptoJS = CryptoJS || (function (Math, undefined) {
        var crypto;
        if (typeof window !== 'undefined' && window.crypto) {
            crypto = window.crypto;
        }
        if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
            crypto = window.msCrypto;
        }
        if (!crypto && typeof global !== 'undefined' && global.crypto) {
            crypto = global.crypto;
        }
        if (!crypto && typeof require === 'function') {
            try {
                crypto = require('crypto');
            }
            catch (err) { }
        }
        var cryptoSecureRandomInt = function () {
            if (crypto) {
                if (typeof crypto.getRandomValues === 'function') {
                    try {
                        return crypto.getRandomValues(new Uint32Array(1))[0];
                    }
                    catch (err) { }
                }
                if (typeof crypto.randomBytes === 'function') {
                    try {
                        return crypto.randomBytes(4).readInt32LE();
                    }
                    catch (err) { }
                }
            }
            throw new Error('Native crypto module could not be used to get secure random number.');
        };
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
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = (function () {
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
                init: function () {
                },
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
        var WordArray = C_lib.WordArray = Base.extend({
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
                for (var i = 0; i < nBytes; i += 4) {
                    words.push(cryptoSecureRandomInt());
                }
                return new WordArray.init(words, nBytes);
            }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
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
        var Latin1 = C_enc.Latin1 = {
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
        var Utf8 = C_enc.Utf8 = {
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
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
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
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
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
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });
        var C_algo = C.algo = {};
        return C;
    }(Math));
    return CryptoJS;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
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
            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        };
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
    }());
    return CryptoJS.enc.Base64;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function () {
            for (var i = 0; i < 64; i++) {
                T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
            }
        }());
        var MD5 = C_algo.MD5 = Hasher.extend({
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
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
    }(Math));
    return CryptoJS.MD5;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
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
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    }());
    return CryptoJS.SHA1;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
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
    }());
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
                keySize: 128 / 32,
                hasher: MD5,
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
        C.EvpKDF = function (password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
        };
    }());
    return CryptoJS.EvpKDF;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./evpkdf"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./evpkdf"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.lib.Cipher || (function (undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
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
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function () {
                var finalProcessedBlocks = this._process(!!'flush');
                return finalProcessedBlocks;
            },
            blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
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
        var CBC = C_mode.CBC = (function () {
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
            return CBC;
        }());
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
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
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
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
        var CipherParams = C_lib.CipherParams = Base.extend({
            init: function (cipherParams) {
                this.mixIn(cipherParams);
            },
            toString: function (formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
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
                return CipherParams.create({ ciphertext: ciphertext, salt: salt });
            }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
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
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function (password, keySize, ivSize, salt) {
                if (!salt) {
                    salt = WordArray.random(64 / 8);
                }
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
                var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
                key.sigBytes = keySize * 4;
                return CipherParams.create({ key: key, iv: iv, salt: salt });
            }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
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
    }());
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
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
        var AES = C_algo.AES = BlockCipher.extend({
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
        C.AES = BlockCipher._createHelper(AES);
    }());
    return CryptoJS.AES;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.enc.Hex;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.enc.Latin1;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
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
        C_enc.Utf16LE = {
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
        function swapEndian(word) {
            return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
        }
    }());
    return CryptoJS.enc.Utf16;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.enc.Utf8;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
            stringify: function (cipherParams) {
                return cipherParams.ciphertext.toString(Hex);
            },
            parse: function (input) {
                var ciphertext = Hex.parse(input);
                return CipherParams.create({ ciphertext: ciphertext });
            }
        };
    }());
    return CryptoJS.format.Hex;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.format.OpenSSL;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./md5"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./md5", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacMD5;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
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
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
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
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
    }(Math));
    return CryptoJS.RIPEMD160;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./ripemd160"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./ripemd160", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacRIPEMD160;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA1;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
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
        var SHA256 = C_algo.SHA256 = Hasher.extend({
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
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    }(Math));
    return CryptoJS.SHA256;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha256"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function () {
                this._hash = new WordArray.init([
                    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
                    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
                ]);
            },
            _doFinalize: function () {
                var hash = SHA256._doFinalize.call(this);
                hash.sigBytes -= 4;
                return hash;
            }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
    }());
    return CryptoJS.SHA224;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha256"), require("./sha224"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256", "./sha224", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA224;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA256;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
            init: function (high, low) {
                this.high = high;
                this.low = low;
            }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
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
    }());
    return CryptoJS;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function (Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
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
        var SHA3 = C_algo.SHA3 = Hasher.extend({
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
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
    }(Math));
    return CryptoJS.SHA3;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha3"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha3", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA3;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
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
        var SHA512 = C_algo.SHA512 = Hasher.extend({
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
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
    }());
    return CryptoJS.SHA512;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function () {
                this._hash = new X64WordArray.init([
                    new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
                    new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
                    new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
                    new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
                ]);
            },
            _doFinalize: function () {
                var hash = SHA512._doFinalize.call(this);
                hash.sigBytes -= 16;
                return hash;
            }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
    }());
    return CryptoJS.SHA384;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"), require("./sha384"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512", "./sha384", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA384;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.HmacSHA512;
}));
;
(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        if (typeof ArrayBuffer != 'function') {
            return;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function (typedArray) {
            if (typedArray instanceof ArrayBuffer) {
                typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array ||
                (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
                typedArray instanceof Int16Array ||
                typedArray instanceof Uint16Array ||
                typedArray instanceof Int32Array ||
                typedArray instanceof Uint32Array ||
                typedArray instanceof Float32Array ||
                typedArray instanceof Float64Array) {
                typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
                var typedArrayByteLength = typedArray.byteLength;
                var words = [];
                for (var i = 0; i < typedArrayByteLength; i++) {
                    words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
                }
                superInit.call(this, words, typedArrayByteLength);
            }
            else {
                superInit.apply(this, arguments);
            }
        };
        subInit.prototype = WordArray;
    }());
    return CryptoJS.lib.WordArray;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.mode.CFB = (function () {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
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
        return CFB;
    }());
    return CryptoJS.mode.CFB;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.mode.CTRGladman = (function () {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
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
    return CryptoJS.mode.CTRGladman;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.mode.CTR = (function () {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
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
    return CryptoJS.mode.CTR;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.mode.ECB = (function () {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
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
    return CryptoJS.mode.ECB;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.mode.OFB = (function () {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
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
    return CryptoJS.mode.OFB;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.pad.AnsiX923 = {
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
    return CryptoJS.pad.Ansix923;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.pad.Iso10126 = {
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
    return CryptoJS.pad.Iso10126;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.pad.Iso97971 = {
        pad: function (data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function (data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
        }
    };
    return CryptoJS.pad.Iso97971;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.pad.NoPadding = {
        pad: function () {
        },
        unpad: function () {
        }
    };
    return CryptoJS.pad.NoPadding;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    return CryptoJS.pad.Pkcs7;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    CryptoJS.pad.ZeroPadding = {
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
    return CryptoJS.pad.ZeroPadding;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA1 = C_algo.SHA1;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
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
        C.PBKDF2 = function (password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
        };
    }());
    return CryptoJS.PBKDF2;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
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
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
    }());
    return CryptoJS.RabbitLegacy;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
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
        C.Rabbit = StreamCipher._createHelper(Rabbit);
    }());
    return CryptoJS.Rabbit;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
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
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
            cfg: RC4.cfg.extend({
                drop: 192
            }),
            _doReset: function () {
                RC4._doReset.call(this);
                for (var i = this.cfg.drop; i > 0; i--) {
                    generateKeystreamWord.call(this);
                }
            }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
    }());
    return CryptoJS.RC4;
}));
;
(function (root, factory, undef) {
    if (typeof exports === "object") {
        module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
    }
    else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    }
    else {
        factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
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
        var SBOX_P = [
            {
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
        var DES = C_algo.DES = BlockCipher.extend({
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
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function () {
                var key = this._key;
                var keyWords = key.words;
                if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                    throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
                }
                var key1 = keyWords.slice(0, 2);
                var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
                var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
                this._des1 = DES.createEncryptor(WordArray.create(key1));
                this._des2 = DES.createEncryptor(WordArray.create(key2));
                this._des3 = DES.createEncryptor(WordArray.create(key3));
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
        C.TripleDES = BlockCipher._createHelper(TripleDES);
    }());
    return CryptoJS.TripleDES;
}));
define("base/graphics/Graphics", ["require", "exports"], function (require, exports) {
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
define("base/net/Net", ["require", "exports"], function (require, exports) {
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
define("base/parser/ULZW", ["require", "exports"], function (require, exports) {
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
define("base/parser/Xml", ["require", "exports"], function (require, exports) {
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
define("base/parser/Zip", ["require", "exports"], function (require, exports) {
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
define("base/storage/Storage", ["require", "exports"], function (require, exports) {
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
define("base/struct/BinarySearchTree", ["require", "exports"], function (require, exports) {
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
define("base/struct/AVLTree", ["require", "exports", "base/struct/BinarySearchTree"], function (require, exports, BinarySearchTree_1) {
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
define("base/struct/CircularLinkedList", ["require", "exports"], function (require, exports) {
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
define("base/type/Objects", ["require", "exports"], function (require, exports) {
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
define("base/struct/Dictionary", ["require", "exports", "base/type/Objects"], function (require, exports, Objects_1) {
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
define("base/struct/DoubleLinkedList", ["require", "exports"], function (require, exports) {
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
define("base/struct/Queue", ["require", "exports"], function (require, exports) {
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
define("base/struct/Graph", ["require", "exports", "base/struct/Dictionary", "base/struct/Queue"], function (require, exports, Dictionary_1, Queue_1) {
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
define("base/struct/HashTable", ["require", "exports"], function (require, exports) {
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
define("base/struct/HashTableLinearProbing", ["require", "exports", "base/struct/HashTable"], function (require, exports, HashTable_1) {
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
define("base/struct/LinkedList", ["require", "exports"], function (require, exports) {
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
define("base/struct/HashTableSeparateChaining", ["require", "exports", "base/struct/HashTable", "base/struct/LinkedList"], function (require, exports, HashTable_2, LinkedList_1) {
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
define("base/struct/RBush", ["require", "exports"], function (require, exports) {
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
define("base/struct/Set", ["require", "exports", "base/type/Objects"], function (require, exports, Objects_2) {
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
define("base/struct/Stack", ["require", "exports"], function (require, exports) {
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
define("base/type/Array1", ["require", "exports", "base/type/Objects"], function (require, exports, Objects_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UArray1 {
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
            let arr1 = new UArray1();
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
    exports.UArray1 = UArray1;
    ;
});
define("base/type/Array2", ["require", "exports", "base/type/Objects"], function (require, exports, Objects_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UArray2 {
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
            let newArr2 = new UArray2();
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
            let temp = new UArray2(col, row);
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
            let temp = new UArray2(row, col);
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
            let temp = new UArray2(col, row);
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
            let temp = new UArray2(col, row);
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
            let temp = new UArray2(col, row);
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
    exports.UArray2 = UArray2;
    ;
});
define("base/type/Number", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Number {
        constructor() {
        }
        static isOdd(num) {
            let isOdd = num % 2 == 1;
            return isOdd;
        }
        static isEven(num) {
            let isEven = (num % 2) == 0;
            return isEven;
        }
    }
    exports.Number = Number;
    ;
});
define("base/type/Strings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class String {
        constructor(str) {
            this.str = "";
            this.isWhitespace = function () {
                return /^\s*$/.test(this.str);
            };
            this.isAllLowerCase = function () {
                return /^[a-z]+$/.test(this.str);
            };
            this.isAllUpperCase = function () {
                return /^[A-Z]+$/.test(this.str);
            };
            this.str = str;
        }
        static repeat(ch = "a", repeatTimes = 0) {
            var result = "";
            for (var i = 0; i < repeatTimes; i++) {
                result += ch;
            }
            return result;
        }
        static checkPwd(str) {
            var Lv = 0;
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
        static format(message, arr) {
            return message.replace(/{(\d+)}/g, function (matchStr, group1) {
                return arr[group1];
            });
        }
        static filterTag(str) {
            str = str.replace(/&/ig, "&amp;");
            str = str.replace(/</ig, "&lt;");
            str = str.replace(/>/ig, "&gt;");
            str = str.replace(" ", "&nbsp;");
            return str;
        }
        ;
        toString() {
            return this.str;
        }
        isEmpty() {
            return this.str == null || this.str == "";
        }
        isNotEmpty() {
            return !this.isEmpty();
        }
        isBlank() {
            return this.str == null || /^\s*$/.test(this.str);
        }
        isNotBlank() {
            return !this.isBlank();
        }
        trim() {
            return this.str.trim();
        }
        startsWith(prefix) {
            return this.str.indexOf(prefix) === 0;
        }
        endsWith(suffix) {
            return this.str.lastIndexOf(suffix) === 0;
        }
        contains(searchSeq) {
            return this.str.indexOf(searchSeq) >= 0;
        }
        equals(str) {
            return this.str == str;
        }
        equalsIgnoreCase(str) {
            return this.str.toLocaleLowerCase() == str.toLocaleLowerCase();
        }
        containsWhitespace() {
            return this.contains(" ");
        }
        deleteWhitespace(input) {
            return input.replace(/\s+/g, '');
        }
        rightPad(size, padStr) {
            return this.str + String.repeat(padStr, size);
        }
        leftPad(size, padStr) {
            return String.repeat(padStr, size) + this.str;
        }
        capitalize() {
            if (this.str == null || this.str.length == 0) {
                return this.str;
            }
            return this.str.replace(/^[a-z]/, function (matchStr) {
                return matchStr.toLocaleUpperCase();
            });
        }
        uncapitalize() {
            if (this.str == null || this.str.length == 0) {
                return this.str;
            }
            return this.str.replace(/^[A-Z]/, function (matchStr) {
                return matchStr.toLocaleLowerCase();
            });
        }
        swapCase() {
            return this.str.replace(/[a-z]/ig, function (matchStr) {
                if (matchStr >= 'A' && matchStr <= 'Z') {
                    return matchStr.toLocaleLowerCase();
                }
                else if (matchStr >= 'a' && matchStr <= 'z') {
                    return matchStr.toLocaleUpperCase();
                }
            });
        }
        countMatches(sub) {
            if (this.isEmpty()) {
                return 0;
            }
            let Str = new String(sub);
            if (Str.isEmpty()) {
                return 0;
            }
            var count = 0;
            var index = 0;
            while ((index = this.str.indexOf(sub, index)) != -1) {
                index += sub.length;
                count++;
            }
            return count;
        }
        isAlpha() {
            return /^[a-z]+$/i.test(this.str);
        }
        isAlphaSpace() {
            return /^[a-z\s]*$/i.test(this.str);
        }
        isAlphanumeric() {
            return /^[a-z0-9]+$/i.test(this.str);
        }
        isAlphanumericSpace() {
            return /^[a-z0-9\s]*$/i.test(this.str);
        }
        isNumeric() {
            return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(this.str);
        }
        isDecimal() {
            return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
        }
        isNegativeDecimal() {
            return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
        }
        isPositiveDecimal() {
            return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
        }
        isInteger() {
            return /^[-+]?(?:0|[1-9]\d*)$/.test(this.str);
        }
        isPositiveInteger() {
            return /^\+?(?:0|[1-9]\d*)$/.test(this.str);
        }
        isNegativeInteger() {
            return /^\-?(?:0|[1-9]\d*)$/.test(this.str);
        }
        isNumericSpace() {
            return /^[\d\s]*$/.test(this.str);
        }
        reverse() {
            if (this.isBlank()) {
                return this.str;
            }
            return this.str.split("").reverse().join("");
        }
        removeSpecialCharacter() {
            return this.str.replace(/[!-/:-@\[-`{-~]/g, "");
        }
        isSpecialCharacterAlphanumeric() {
            return /^[!-~]+$/.test(this.str);
        }
        compressRepeatedStr(ignoreCase = false) {
            var pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
            return this.str.replace(pattern, function (matchStr, group1) {
                return matchStr.length + group1;
            });
        }
        isChinese() {
            return /^[\u4E00-\u9FA5]+$/.test(this.str);
        }
        removeChinese() {
            return this.str.replace(/[\u4E00-\u9FA5]+/gm, "");
        }
        escapeMetacharacter() {
            var metacharacter = "^$()*+.[]|\\-?{}|";
            if (metacharacter.indexOf(this.str) >= 0) {
                this.str = "\\" + this.str;
            }
            return this.str;
        }
        escapeMetacharacterOfStr() {
            return this.str.replace(/[\^\$\*\+\.\|\\\-\?\{\}\|]/gm, "\\$&");
        }
    }
    exports.String = String;
    ;
});
define("base/type/Time", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Time extends Date {
        constructor(...args) {
            super();
            this.init(args);
        }
        static isUDate(obj) {
            return Object.prototype.toString.call(obj) === "[object Time]";
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
                let matchs1 = pattern.match(Time.REG_DATE);
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
        static format(uDate, pattern) {
            if (!Time.isUDate(uDate)) {
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
                        return leftPad0(uDate.getFullYear(), match.length);
                    case "M":
                        return leftPad0(uDate.getMonth() + 1, match.length);
                    case "D":
                        return leftPad0(uDate.getDate(), match.length);
                    case "h":
                        return leftPad0(uDate.getHours(), match.length);
                    case "m":
                        return leftPad0(uDate.getMinutes(), match.length);
                    case "s":
                        return leftPad0(uDate.getSeconds(), match.length);
                    case "i":
                        return leftPad0(uDate.getMilliseconds(), match.length);
                    case "w":
                        return "" + uDate.getDay();
                    case "W":
                        return leftPad0(Time.WEEK[uDate.getDay()], match.length);
                    default:
                        return "";
                }
            }
            try {
                pattern = pattern || "YYYY-MM-DD hh:mm:ss:iii";
                let timeStr = pattern.replace(Time.REG_DATE, replacer);
                return timeStr;
            }
            catch (err) {
                console.error(err);
            }
            return "";
        }
        ;
        static clone(uDate) {
            let time = uDate.getTime();
            let newUDate = new Time(time);
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
            let old_count = Math.floor(timestamp1 / Time.STAMP_DATE);
            let now_other = Math.floor(timestamp2 / Time.STAMP_DATE);
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
            let isLeapYear = Time.isLeapYear(year);
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
                    if (Time.isLeapYear()) {
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
            let offsetDay = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / Time.STAMP_DATE);
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
            let dayOffset = Math.ceil(timeOffset / Time.STAMP_DATE);
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
            let str = Time.format(this, "YYYY-MM-DD hh:mm:ss:iii");
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
            let offsetTimestamp = offset * Time.STAMP_DATE;
            this.addMilliseconds(offsetTimestamp);
            return this;
        }
        addHour(offset) {
            let offsetTimestamp = offset * Time.STAMP_HOUR;
            this.addMilliseconds(offsetTimestamp);
            return this;
        }
        addMinutes(offset) {
            let offsetTimestamp = offset * Time.STAMP_MINUTES;
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
        compareDay(uDate) {
            let selfDay = this.getDay();
            let otherDay = uDate.getDate();
            return selfDay - otherDay;
        }
        compareHour(uDate) {
            let selfHours = this.getHours();
            let otherHours = uDate.getHours();
            return selfHours - otherHours;
        }
        compareMinutes(uDate) {
            let selfMinutes = this.getMinutes();
            let otherMinutes = uDate.getMinutes();
            return selfMinutes - otherMinutes;
        }
        compareSecond(uDate) {
            let selfSeconds = this.getHours();
            let otherSeconds = uDate.getHours();
            return selfSeconds - otherSeconds;
        }
    }
    Time.REG_DATE = /([YMDhmsiWw])(\1*)/g;
    Time.STAMP_SECONDS = 1000;
    Time.STAMP_MINUTES = 60 * Time.STAMP_SECONDS;
    Time.STAMP_HOUR = 60 * Time.STAMP_MINUTES;
    Time.STAMP_DATE = 24 * Time.STAMP_HOUR;
    Time.WEEK = ["日", "一", "二", "三", "四", "五", "六"];
    exports.Time = Time;
    ;
});
define("base/type/Timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Timer {
        constructor() {
            this.startTime = 0;
            this.endTime = 0;
            this.passTime = 0;
            this.pauseTime = [];
            this.resumeTime = [];
        }
        start() {
            this.startTime = new Date().getTime();
            this.endTime = 0;
            this.passTime = 0;
            this.pauseTime.splice(0, this.pauseTime.length);
            this.resumeTime.splice(0, this.resumeTime.length);
        }
        passed(endTime = 0) {
            let now = endTime || new Date().getTime();
            let totalOffset = now - this.startTime;
            let passOffset = 0;
            for (let i = 0; i <= this.resumeTime.length; i++) {
                let pauseTime = this.pauseTime[i];
                let resumeTime = this.resumeTime[i];
                let offsetTime = resumeTime - pauseTime;
                passOffset += offsetTime;
            }
            let passTime = totalOffset - passOffset;
            return passTime;
        }
        pause() {
            if (this.endTime) {
                return;
            }
            if (this.pauseTime.length == this.resumeTime.length) {
                let time = new Date().getTime();
                this.pauseTime.push(time);
            }
        }
        resume() {
            if (this.endTime) {
                return;
            }
            if (this.pauseTime.length == this.resumeTime.length + 1) {
                let time = new Date().getTime();
                this.resumeTime.push(time);
            }
        }
        stop() {
            this.resume();
            this.endTime = new Date().getTime();
            this.passTime = this.passed(this.endTime);
            return this.passTime;
        }
        detail() {
            let minLen = Math.min(this.pauseTime.length, this.resumeTime.length);
            let pauseTime = [];
            let resumeTime = [];
            for (let i = 0; i < minLen; i++) {
                pauseTime[pauseTime.length] = this.pauseTime[i];
                resumeTime[resumeTime.length] = this.resumeTime[i];
            }
            let infos = {
                startTime: this.startTime,
                endTime: -1,
                passTime: 0,
                pauseTime: pauseTime,
                resumeTime: resumeTime,
            };
            if (this.endTime) {
                infos.endTime = this.endTime;
                infos.passTime = this.passTime;
            }
            else {
                infos.passTime = this.passed();
            }
            return infos;
        }
    }
    exports.Timer = Timer;
    ;
});
define("base/type/UBencode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UBencode {
    }
    exports.UBencode = UBencode;
    ;
});
define("base/type/URandom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class URandom {
    }
    exports.URandom = URandom;
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
define("utils/Audio", ["require", "exports", "base/storage/Storage", "base/type/Objects"], function (require, exports, Storage_1, Objects_5) {
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
define("utils/Maths", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Maths {
        static randomPop(arr = []) {
            let idx = Math.random() * arr.length | 0;
            return arr.splice(idx, 1)[0];
        }
    }
    exports.Maths = Maths;
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
define("utils/Sign", ["require", "exports", "base/storage/Storage", "base/type/Objects"], function (require, exports, Storage_2, Objects_6) {
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
define("utils/User", ["require", "exports", "base/storage/Storage", "base/type/Objects"], function (require, exports, Storage_3, Objects_7) {
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
