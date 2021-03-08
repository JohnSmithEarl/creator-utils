export class Strings {
    //生成指定个数的字符
    static repeat(ch = "a", repeatTimes: number = 0) {
        let result = "";
        for (let i = 0; i < repeatTimes; i++) {
            result += ch;
        }
        return result;
    }

    /*检测密码强度*/
    static checkPwd(str: string): number {
        let Lv = 0
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
    static format(message: string, arr: Array<any>) {
        return message.replace(/{(\d+)}/g, function (matchStr, group1) {
            return arr[group1];
        });
    }

    /*过滤html代码(把<>转换)*/
    static filterTag(str) {
        str = str.replace(/&/ig, "&amp;")
        str = str.replace(/</ig, "&lt;")
        str = str.replace(/>/ig, "&gt;")
        str = str.replace(" ", "&nbsp;")
        return str
    };

    /**
     * 用逗号 格式化 钱数字
     * @param str
     * @returns
     */
    static formatMoney(num: number) {
        let str = "" + num;
        let newStr = "";
        let count = 0;
        if (str.indexOf(".") == -1) { // 当数字是整数
            for (let i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            // str = newStr + ".00"; //自动补小数点后两位
            str = newStr;
            return str;
        } else { // 当数字带有小数
            for (let i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str;
        }
    }

    isEmpty(input: string): boolean {
        return input == null || input == "";
    }

    isNotEmpty(input: string): boolean {
        return !this.isEmpty(input);
    }

    isBlank(input: string): boolean {
        return input == null || /^\s*$/.test(input);
    }

    isNotBlank(input: string): boolean {
        return !this.isBlank(input);
    }

    trim(input: string): string {
        // return input.replace(/^\s+|\s+$/, '');
        return input.trim();
    }

    startsWith(input: string, prefix: string) {
        return input.indexOf(prefix) === 0;
    }

    endsWith(input: string, suffix: string): boolean {
        return input.lastIndexOf(suffix) === 0;
    }

    contains(input: string, searchSeq: string): boolean {
        return input.indexOf(searchSeq) >= 0;
    }

    equals(input: string, str: string): boolean {
        return input == str;
    }

    equalsIgnoreCase(input: string, str: string): boolean {
        return input.toLocaleLowerCase() == str.toLocaleLowerCase();
    }

    containsWhitespace(input: string) {
        return this.contains(input, " ");
    }

    deleteWhitespace(input: string) {
        return input.replace(/\s+/g, '');
    }

    rightPad(input: string, size: number, padStr: string) {
        return input + Strings.repeat(padStr, size);
    }

    leftPad(input: string, size: number, padStr: string) {
        return Strings.repeat(padStr, size) + input;
    }

    //首小写字母转大写
    capitalize(input: string) {
        if (input == null || input.length == 0) {
            return input;
        }
        return input.replace(/^[a-z]/, function (matchStr) {
            return matchStr.toLocaleUpperCase();
        });
    }

    //首大写字母转小写
    uncapitalize(input: string) {
        if (input == null || input.length == 0) {
            return input;
        }
        return input.replace(/^[A-Z]/, function (matchStr) {
            return matchStr.toLocaleLowerCase();
        });
    }

    //大写转小写，小写转大写
    swapCase(input: string) {
        return input.replace(/[a-z]/ig, function (matchStr) {
            if (matchStr >= 'A' && matchStr <= 'Z') {
                return matchStr.toLocaleLowerCase();
            } else if (matchStr >= 'a' && matchStr <= 'z') {
                return matchStr.toLocaleUpperCase();
            }
        });
    }

    //统计含有的子字符串的个数
    countMatches(input: string, sub: string) {
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

    //只包含字母
    isAlpha(input: string) {
        return /^[a-z]+$/i.test(input);
    }

    //只包含字母、空格
    isAlphaSpace(input: string) {
        return /^[a-z\s]*$/i.test(input);
    }

    //只包含字母、数字
    isAlphanumeric(input: string) {
        return /^[a-z0-9]+$/i.test(input);
    }

    //只包含字母、数字和空格
    isAlphanumericSpace(input: string) {
        return /^[a-z0-9\s]*$/i.test(input);
    }

    //数字
    isNumeric(input: string) {
        return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
    }

    //小数
    isDecimal(input: string) {
        return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
    }

    //负小数
    isNegativeDecimal(input: string) {
        return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
    }

    //正小数
    isPositiveDecimal(input: string) {
        return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
    }

    //整数
    isInteger(input: string) {
        return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
    }

    //正整数
    isPositiveInteger(input: string) {
        return /^\+?(?:0|[1-9]\d*)$/.test(input);
    }

    //负整数
    isNegativeInteger(input: string) {
        return /^\-?(?:0|[1-9]\d*)$/.test(input);
    }


    //只包含数字和空格
    isNumericSpace(input: string) {
        return /^[\d\s]*$/.test(input);
    }

    isWhitespace(input: string) {
        return /^\s*$/.test(input);
    }

    isAllLowerCase(input: string) {
        return /^[a-z]+$/.test(input);
    }

    isAllUpperCase(input: string) {
        return /^[A-Z]+$/.test(input);
    }

    //字符串反转
    reverse(input: string) {
        if (this.isBlank(input)) {
            return input;
        }
        return input.split("").reverse().join("");
    }

    //删掉特殊字符(英文状态下)
    removeSpecialCharacter(input: string) {
        return input.replace(/[!-/:-@\[-`{-~]/g, "");
    }

    //只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
    isSpecialCharacterAlphanumeric(input: string) {
        return /^[!-~]+$/.test(input);
    }

    /**
     * @param {String} message
     * @param {Array} arr
     * 消息格式化
     */
    format(message: string, arr: Array<any>) {
        return message.replace(/{(\d+)}/g, function (matchStr, group1) {
            return arr[group1];
        });
    }

    /**
     * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd
     * @param {UString} input
     * @param {Boolean} ignoreCase : true or false
     */
    compressRepeatedStr(input: string, ignoreCase: boolean = false) {
        let pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
        return input.replace(pattern, function (matchStr, group1) {
            return matchStr.length + group1;
        });
    }

    //中文校验
    isChinese(input: string): boolean {
        return /^[\u4E00-\u9FA5]+$/.test(input);
    }

    //去掉中文字符
    removeChinese(input: string) {
        return input.replace(/[\u4E00-\u9FA5]+/gm, "");
    }

    //转义元字符
    escapeMetacharacter(input: string) {
        var metacharacter = "^$()*+.[]|\\-?{}|";
        if (metacharacter.indexOf(input) >= 0) {
            input = "\\" + input;
        }
        return input;
    }

    //转义字符串中的元字符
    escapeMetacharacterOfStr(input: string) {
        return input.replace(/[\^\$\(\)\*\+\.\[\]\|\\\-\?\{\}\|]/gm, "\\$&");
    }

    /* 校验时排除某些字符串，即不能包含某些字符串
    * @param {Object} conditions:里面有多个属性，如下：
    *
    * @param {UString} matcherFlag 匹配标识
    * 0:数字；
    * 1：字母；
    * 2：小写字母；
    * 3:大写字母；
    * 4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
    * 6:数字和字母；
    * 7：数字和小写字母；
    * 8：数字和大写字母；
    * 9：数字、字母和特殊字符；
    * 10：数字和中文；
    * 11：小写字母和特殊字符；
    * 12：大写字母和特殊字符；
    * 13：字母和特殊字符；
    * 14：小写字母和中文；
    * 15：大写字母和中文；
    * 16：字母和中文；
    * 17：特殊字符、和中文；
    * 18：特殊字符、字母和中文；
    * 19：特殊字符、小写字母和中文；
    * 20：特殊字符、大写字母和中文；
    * 100：所有字符;
    * @param {Array} excludeStrArr 排除的字符串，数组格式
    * @param {UString} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
    * @param {Boolean} ignoreCase 是否忽略大小写
    * conditions={matcherFlag:"0",excludeStrArr:[],length:"",ignoreCase:true}
    */
    isPatternMustExcludeSomeStr(input, conditions) {
        //参数
        let matcherFlag = conditions.matcherFlag;
        let excludeStrArr = conditions.excludeStrArr;
        let length = conditions.length;
        let ignoreCase = conditions.ignoreCase;
        //拼正则
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

    formatUnit(str: string) {
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
    };
};