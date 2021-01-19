export declare class cu_String {
    private str;
    constructor(str: string);
    static repeat(ch?: string, repeatTimes?: number): string;
    static checkPwd(str: string): number;
    /**
     * @param {string} message
     * @param {Array} arr
     * 消息格式化
     */
    static format(message: string, arr: Array<any>): string;
    static filterTag(str: any): any;
    toString(): string;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    isBlank(): boolean;
    isNotBlank(): boolean;
    trim(): string;
    startsWith(prefix: string): boolean;
    endsWith(suffix: string): boolean;
    contains(searchSeq: string): boolean;
    equals(str: string): boolean;
    equalsIgnoreCase(str: string): boolean;
    containsWhitespace(): boolean;
    deleteWhitespace(input: any): any;
    rightPad(size: number, padStr: string): string;
    leftPad(size: number, padStr: string): string;
    capitalize(): string;
    uncapitalize(): string;
    swapCase(): string;
    countMatches(sub: string): number;
    isAlpha(): boolean;
    isAlphaSpace(): boolean;
    isAlphanumeric(): boolean;
    isAlphanumericSpace(): boolean;
    isNumeric(): boolean;
    isDecimal(): boolean;
    isNegativeDecimal(): boolean;
    isPositiveDecimal(): boolean;
    isInteger(): boolean;
    isPositiveInteger(): boolean;
    isNegativeInteger(): boolean;
    isNumericSpace(): boolean;
    isWhitespace: () => boolean;
    isAllLowerCase: () => boolean;
    isAllUpperCase: () => boolean;
    reverse(): string;
    removeSpecialCharacter(): string;
    isSpecialCharacterAlphanumeric(): boolean;
    /**
     * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd
     * @param {cu_String} input
     * @param {Boolean} ignoreCase : true or false
     */
    compressRepeatedStr(ignoreCase?: boolean): string;
    isChinese(): boolean;
    removeChinese(): string;
    escapeMetacharacter(): string;
    escapeMetacharacterOfStr(): string;
}
