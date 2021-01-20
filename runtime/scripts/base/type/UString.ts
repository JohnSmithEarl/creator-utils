export class UString  {
    private str = "";

    constructor(str: string) {
        this.str = str;
    }

    //生成指定个数的字符
    public static repeat(ch = "a", repeatTimes: number = 0) {
        var result = "";
        for (var i = 0; i < repeatTimes; i++) {
            result += ch;
        }
        return result;
    }

    /*检测密码强度*/
    public static checkPwd(str: string): number {
        var Lv = 0
        if (str.length < 6) {
            return Lv
        }
        if (/[0-9]/.test(str)) {
            Lv++
        }
        if (/[a-z]/.test(str)) {
            Lv++
        }
        if (/[A-Z]/.test(str)) {
            Lv++
        }
        if (/[\.|-|_]/.test(str)) {
            Lv++
        }
        return Lv
    }

    /**
     * @param {string} message
     * @param {Array} arr
     * 消息格式化
     */
    public static format(message: string, arr: Array<any>) {
        return message.replace(/{(\d+)}/g, function (matchStr, group1) {
            return arr[group1];
        });
    }

    /*过滤html代码(把<>转换)*/
    public static filterTag(str) {
        str = str.replace(/&/ig, "&amp;")
        str = str.replace(/</ig, "&lt;")
        str = str.replace(/>/ig, "&gt;")
        str = str.replace(" ", "&nbsp;")
        return str
    };

    public toString(): string {
        return this.str;
    }

    public isEmpty(): boolean {
        return this.str == null || this.str == "";
    }

    public isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    public isBlank(): boolean {
        return this.str == null || /^\s*$/.test(this.str);
    }

    public isNotBlank(): boolean {
        return !this.isBlank();
    }

    public trim(): string {
        // return this.str.replace(/^\s+|\s+$/, '');
        return this.str.trim();
    }

    public startsWith(prefix: string) {
        return this.str.indexOf(prefix) === 0;
    }

    public endsWith(suffix: string): boolean {
        return this.str.lastIndexOf(suffix) === 0;
    }

    public contains(searchSeq: string): boolean {
        return this.str.indexOf(searchSeq) >= 0;
    }

    public equals(str: string): boolean {
        return this.str == str;
    }

    public equalsIgnoreCase(str: string): boolean {
        return this.str.toLocaleLowerCase() == str.toLocaleLowerCase();
    }

    public containsWhitespace() {
        return this.contains(" ");
    }

    public deleteWhitespace(input) {
        return input.replace(/\s+/g, '');
    }

    public rightPad(size: number, padStr: string) {
        return this.str + UString.repeat(padStr, size);
    }

    public leftPad(size: number, padStr: string) {
        return UString.repeat(padStr, size) + this.str;
    }

    //首小写字母转大写
    public capitalize() {
        if (this.str == null || this.str.length == 0) {
            return this.str;
        }
        return this.str.replace(/^[a-z]/, function (matchStr) {
            return matchStr.toLocaleUpperCase();
        });
    }

    //首大写字母转小写
    public uncapitalize() {
        if (this.str == null || this.str.length == 0) {
            return this.str;
        }
        return this.str.replace(/^[A-Z]/, function (matchStr) {
            return matchStr.toLocaleLowerCase();
        });
    }

    //大写转小写，小写转大写
    swapCase() {
        return this.str.replace(/[a-z]/ig, function (matchStr) {
            if (matchStr >= 'A' && matchStr <= 'Z') {
                return matchStr.toLocaleLowerCase();
            } else if (matchStr >= 'a' && matchStr <= 'z') {
                return matchStr.toLocaleUpperCase();
            }
        });
    }

    //统计含有的子字符串的个数
    countMatches(sub: string) {
        if (this.isEmpty()) {
            return 0;
        }
        let Str = new UString(sub);
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

    //只包含字母
    isAlpha() {
        return /^[a-z]+$/i.test(this.str);
    }

    //只包含字母、空格
    isAlphaSpace() {
        return /^[a-z\s]*$/i.test(this.str);
    }

    //只包含字母、数字
    isAlphanumeric() {
        return /^[a-z0-9]+$/i.test(this.str);
    }

    //只包含字母、数字和空格
    isAlphanumericSpace() {
        return /^[a-z0-9\s]*$/i.test(this.str);
    }

    //数字
    isNumeric() {
        return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(this.str);
    }

    //小数
    isDecimal() {
        return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
    }

    //负小数
    isNegativeDecimal() {
        return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
    }

    //正小数
    isPositiveDecimal() {
        return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(this.str);
    }

    //整数
    isInteger() {
        return /^[-+]?(?:0|[1-9]\d*)$/.test(this.str);
    }

    //正整数
    isPositiveInteger() {
        return /^\+?(?:0|[1-9]\d*)$/.test(this.str);
    }

    //负整数
    isNegativeInteger() {
        return /^\-?(?:0|[1-9]\d*)$/.test(this.str);
    }


    //只包含数字和空格
    isNumericSpace() {
        return /^[\d\s]*$/.test(this.str);
    }

    isWhitespace = function () {
        return /^\s*$/.test(this.str);
    }

    isAllLowerCase = function () {
        return /^[a-z]+$/.test(this.str);
    }

    isAllUpperCase = function () {
        return /^[A-Z]+$/.test(this.str);
    }

    //字符串反转
    reverse() {
        if (this.isBlank()) {
            return this.str;
        }
        return this.str.split("").reverse().join("");
    }

    //删掉特殊字符(英文状态下)
    removeSpecialCharacter() {
        return this.str.replace(/[!-/:-@\[-`{-~]/g, "");
    }

    //只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
    isSpecialCharacterAlphanumeric() {
        return /^[!-~]+$/.test(this.str);
    }

    /**
     * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd
     * @param {UString} input
     * @param {Boolean} ignoreCase : true or false
     */
    compressRepeatedStr(ignoreCase: boolean = false) {
        var pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
        return this.str.replace(pattern, function (matchStr, group1) {
            return matchStr.length + group1;
        });
    }

    //中文校验
    isChinese(): boolean {
        return /^[\u4E00-\u9FA5]+$/.test(this.str);
    }

    //去掉中文字符
    removeChinese() {
        return this.str.replace(/[\u4E00-\u9FA5]+/gm, "");
    }

    //转义元字符
    escapeMetacharacter() {
        var metacharacter = "^$()*+.[]|\\-?{}|";
        if (metacharacter.indexOf(this.str) >= 0) {
            this.str = "\\" + this.str;
        }
        return this.str;
    }

    //转义字符串中的元字符
    escapeMetacharacterOfStr() {
        return this.str.replace(/[\^\$\*\+\.\|\\\-\?\{\}\|]/gm, "\\$&");
    }
};

//  * 校验时排除某些字符串，即不能包含某些字符串
//  * @param {Object} conditions:里面有多个属性，如下：
//  *
//  * @param {UString} matcherFlag 匹配标识
//  * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
//  * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
//  * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
//  * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
//  * 100：所有字符;
//  * @param {Array} excludeStrArr 排除的字符串，数组格式
//  * @param {UString} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
//  * @param {Boolean} ignoreCase 是否忽略大小写
//  * conditions={matcherFlag:"0",excludeStrArr:[],length:"",ignoreCase:true}
//  */
// UtilString.isPatternMustExcludeSomeStr = function (input, conditions) {
//     //参数
//     var matcherFlag = conditions.matcherFlag;
//     var excludeStrArr = conditions.excludeStrArr;
//     var length = conditions.length;
//     var ignoreCase = conditions.ignoreCase;
//     //拼正则
//     var size = excludeStrArr.length;
//     var regex = (size == 0) ? "^" : "^(?!.*(?:{0}))";
//     var subPattern = "";
//     for (var i = 0; i < size; i++) {
//         excludeStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(excludeStrArr[i]);
//         subPattern += excludeStrArr[i];
//         if (i != size - 1) {
//             subPattern += "|";
//         }
//     }
//     regex = this.format(regex, [subPattern]);
//     switch (matcherFlag) {
//         case '0':
//             regex += "\\d";
//             break;
//         case '1':
//             regex += "[a-zA-Z]";
//             break;
//         case '2':
//             regex += "[a-z]";
//             break;
//         case '3':
//             regex += "[A-Z]";
//             break;
//         case '4':
//             regex += "[!-/:-@\[-`{-~]";
//             break;
//         case '5':
//             regex += "[\u4E00-\u9FA5]";
//             break;
//         case '6':
//             regex += "[a-zA-Z0-9]";
//             break;
//         case '7':
//             regex += "[a-z0-9]";
//             break;
//         case '8':
//             regex += "[A-Z0-9]";
//             break;
//         case '9':
//             regex += "[!-~]";
//             break;
//         case '10':
//             regex += "[0-9\u4E00-\u9FA5]";
//             break;
//         case '11':
//             regex += "[a-z!-/:-@\[-`{-~]";
//             break;
//         case '12':
//             regex += "[A-Z!-/:-@\[-`{-~]";
//             break;
//         case '13':
//             regex += "[a-zA-Z!-/:-@\[-`{-~]";
//             break;
//         case '14':
//             regex += "[a-z\u4E00-\u9FA5]";
//             break;
//         case '15':
//             regex += "[A-Z\u4E00-\u9FA5]";
//             break;
//         case '16':
//             regex += "[a-zA-Z\u4E00-\u9FA5]";
//             break;
//         case '17':
//             regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '18':
//             regex += "[\u4E00-\u9FA5!-~]";
//             break;
//         case '19':
//             regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '20':
//             regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '100':
//             regex += "[\s\S]";
//             break;
//         default:
//             alert(matcherFlag + ":This type is not supported!");
//     }
//     regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
//     regex += "$";
//     var pattern = new RegExp(regex, ignoreCase ? "i" : "");
//     return pattern.test(input);
// }

// /**
//  * 校验必须同时包含某些字符串
//  * @param {UString} input
//  * @param {Object} conditions:里面有多个属性，如下：
//  *
//  * @param {UString} matcherFlag 匹配标识
//  * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
//  * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
//  * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
//  * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
//  * 100：所有字符;
//  * @param {Array} excludeStrArr 排除的字符串，数组格式
//  * @param {UString} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
//  * @param {Boolean} ignoreCase 是否忽略大小写
//  * conditions={matcherFlag:"0",containStrArr:[],length:"",ignoreCase:true}
//  *
//  */
// UtilString.isPatternMustContainSomeStr = function (input, conditions) {
//     //参数
//     var matcherFlag = conditions.matcherFlag;
//     var containStrArr = conditions.containStrArr;
//     var length = conditions.length;
//     var ignoreCase = conditions.ignoreCase;
//     //创建正则
//     var size = containStrArr.length;
//     var regex = "^";
//     var subPattern = "";
//     for (var i = 0; i < size; i++) {
//         containStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(containStrArr[i]);
//         subPattern += "(?=.*" + containStrArr[i] + ")";
//     }
//     regex += subPattern;
//     switch (matcherFlag) {
//         case '0':
//             regex += "\\d";
//             break;
//         case '1':
//             regex += "[a-zA-Z]";
//             break;
//         case '2':
//             regex += "[a-z]";
//             break;
//         case '3':
//             regex += "[A-Z]";
//             break;
//         case '4':
//             regex += "[!-/:-@\[-`{-~]";
//             break;
//         case '5':
//             regex += "[\u4E00-\u9FA5]";
//             break;
//         case '6':
//             regex += "[a-zA-Z0-9]";
//             break;
//         case '7':
//             regex += "[a-z0-9]";
//             break;
//         case '8':
//             regex += "[A-Z0-9]";
//             break;
//         case '9':
//             regex += "[!-~]";
//             break;
//         case '10':
//             regex += "[0-9\u4E00-\u9FA5]";
//             break;
//         case '11':
//             regex += "[a-z!-/:-@\[-`{-~]";
//             break;
//         case '12':
//             regex += "[A-Z!-/:-@\[-`{-~]";
//             break;
//         case '13':
//             regex += "[a-zA-Z!-/:-@\[-`{-~]";
//             break;
//         case '14':
//             regex += "[a-z\u4E00-\u9FA5]";
//             break;
//         case '15':
//             regex += "[A-Z\u4E00-\u9FA5]";
//             break;
//         case '16':
//             regex += "[a-zA-Z\u4E00-\u9FA5]";
//             break;
//         case '17':
//             regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '18':
//             regex += "[\u4E00-\u9FA5!-~]";
//             break;
//         case '19':
//             regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '20':
//             regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
//             break;
//         case '100':
//             regex += "[\s\S]";
//             break;
//         default:
//             alert(matcherFlag + ":This type is not supported!");
//     }
//     regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
//     regex += "$";
//     var pattern = new RegExp(regex, ignoreCase ? "i" : "");
//     return pattern.test(input);
// }


// UtilString.formatNum = function (str) {
//     var newStr = "";
//     var count = 0;
//     // 当数字是整数
//     if (str.indexOf(".") == -1) {
//         for (var i = str.length - 1; i >= 0; i--) {
//             if (count % 3 == 0 && count != 0) {
//                 newStr = str.charAt(i) + "," + newStr;
//             } else {
//                 newStr = str.charAt(i) + newStr;
//             }
//             count++;
//         }
//         // str = newStr + ".00"; //自动补小数点后两位
//         str = newStr;
//         return str;
//     }
//     // 当数字带有小数
//     else {
//         for (var i = str.indexOf(".") - 1; i >= 0; i--) {
//             if (count % 3 == 0 && count != 0) {
//                 newStr = str.charAt(i) + "," + newStr;
//             } else {
//                 newStr = str.charAt(i) + newStr; //逐个字符相接起来
//             }
//             count++;
//         }
//         str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
//         return str;
//     }
// };

// UtilString.formatNumWithUnit = function (str) {
//     let unit = ["", "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极", "归", "僧", "那", "思", "猴", "格"];
//     let num = parseFloat(str);
//     let newStr = "";
//     if (typeof num == "number") {
//         let n = num;
//         let u = 0;
//         let p = num >= 10000 ? 2 : 0;
//         while (n >= 10000) {
//             n = n / 10000;
//             u++;
//         }
//         newStr = n.toFixed(p) + unit[u];
//     }
//     return newStr;
// };

// UtilString.isContainBadWords = function (str, callback) {
//     if (typeof callback == "function") {
//         callback(false);
//     }
// }


// module.exports = UtilString;