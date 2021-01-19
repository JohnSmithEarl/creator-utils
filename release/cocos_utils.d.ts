declare module "base/coding/cu.UTF8" {
    export class cu_UTF8 {
        static encode(str: string): string;
        static decode(utftext: string): string;
    }
}
declare module "base/coding/cu.Base64" {
    export class cu_Base64 {
        private static keyStr;
        static encode(input: string): string;
        static decode(input: string): string;
    }
}
declare module "base/coding/cu.Bencode" {
    export class cu_Bencode {
    }
}
declare module "base/coding/test" { }
declare module "base/graphics/cu.Graphics" {
    export class cu_Graphics {
        constructor();
    }
}
declare module "base/net/cu.Net" {
    export class NetBase {
        quest(options: any, callback: Function): void;
        parse: (httpResponse: any) => any;
        get(url: string, cookie: any, callback: Function): void;
        post(url: string, data: any, cookie: any, callback: Function): void;
        getQueryString: (urlParams: any, name: string) => string;
        getQueryInt: (urlParams: any, name: string) => any;
    }
    export class Net {
        cookie: any;
        netBase: NetBase;
        constructor();
        get(url: string, callback: Function): void;
        post(url: string, data: any, callback: Function): void;
    }
}
declare module "base/storage/cu.Storage" {
    export class cu_Storage {
        static collectGarbage(): void;
        static clear(): void;
        static set: (key: string, value: any) => void;
        static get(key: string): any;
        static remove(key: string): void;
        static multiSet: (keysOrPairs?: any[], values?: any[]) => void;
        static multiGet(keys?: any[]): Array<any>;
        static mutilRemove: (keys?: any[]) => void;
    }
}
declare module "base/type/cu.Object" {
    export class cu_Object extends Object {
        static isValid(obj: any): boolean;
        static clone(obj: any): any;
        static copy(toObj: any, fromObj: any, isCopyUnknow?: boolean): void;
    }
}
declare module "base/type/cu.Array" {
    export class Array1 {
        private data;
        /**
         * 构建一维数组
         * @param arr
         */
        constructor(arr_len?: Array<any> | number, initVal?: any);
        /**
         * 获取 一维数组 数据
         */
        getData(): any[];
        /**
         * 获取元素值
         * @param idx
         */
        get(idx: number): any;
        /**
         * 设置元素值
         * @param idx
         * @param val
         */
        set(idx: number, val: any): void;
        /**
         * 序列化
         */
        toString(): string;
        /**
         * 拷贝 一维数组
         */
        clone(): Array1;
        /**
         * 复制一维数组
         * @param arr1
         */
        copy(arr1: Array1): void;
        /**
         * 清空一维数组
         */
        clear(): void;
        /**
         * 反序列化 一维数组
         */
        reverse(): void;
        /**
         * 排序一维数组
         * @param sortFunc
         */
        sort(sortFunc?: (a: number, b: number) => number): void;
        /**
         * 连接一维数组
         * @param arr1
         */
        contact(arr1: Array1): void;
        /**
         * 一维数组 去重复
         * @param arr1
         */
        distinct(arr1?: Array1): any[];
        /**
         * 合并多维数组
         * @param arr
         */
        flatten(arr: Array<any>): any;
        /**
         * 一维数组求和
         * @param sunFunc
         */
        sum(sunFunc?: (a: number, b: number) => number): any;
        /**
         * 一维数组求积
         * @param mulFunc
         */
        mul(mulFunc?: (a: number, b: number) => number): any;
        /**
         * 获取 线性二维数组的 连线 坐标序号
         * @param row
         * @param col
         *
         * [
         *    1, 2, 3,
         *    4, 5, 6,
         *    7, 8, 9
         * ]
         * ==>
         * [
         *  [0, 1, 2]
         *  [3, 4, 5]
         *  [6, 7, 8]
         *  [0, 3, 6]
         *  [1, 4, 7]
         *  [2, 5, 8]
         *  [0, 4, 8]
         *  [2, 4, 6]
         * ]
         */
        linesIdx(row?: number, col?: number): any[];
        /**
         * 获取 线性二维数组的 连线 值
         * @param row
         * @param col
         *
         * [
         *    1, 2, 3,
         *    4, 5, 6,
         *    7, 8, 9
         * ]
         * ==>
         * [
         *  [1, 2, 3]
         *  [4, 5, 6]
         *  [7, 8, 9]
         *  [1, 4, 7]
         *  [2, 5, 8]
         *  [3, 6, 9]
         *  [1, 5, 9]
         *  [3, 5, 7]
         * ]
         */
        lines(row?: number, col?: number): any[];
    }
    export class Array2 {
        private data;
        /**
         * 创建二位数组
         * @param arr
         */
        constructor(arr_row?: Array<Array<any>> | number, col?: number, initVal?: any);
        /**
         * 获取二位数组原数据
         */
        getData(): Array<Array<any>>;
        /**
         * 获取行数
         */
        getRowCount(): number;
        /**
         * 获取列数
         */
        getColCount(): number;
        /**
         *  获取元素值
         * @param x_pos
         * @param y
         */
        get(x_pos: any | number, y?: number): any;
        /**
         * 设置元素值
         * @param x_pos
         * @param y_val
         * @param val
         */
        set(x_pos: any | number, y_val?: number, val?: any): void;
        /**
         * 序列化
         */
        toString(): string;
        /**
         * 克隆二维数组
         */
        clone(): Array2;
        /**
         * 拷贝二维数组数据
         * @param arr2
         */
        copy(arr2: Array2): void;
        /**
         * 清理二维数组
         */
        clear(): void;
        /**
          逆时针旋转 90 度
          [
             [1, 2, 3, 4],
             [4, 5, 6, 7],
             [7, 8, 9, 10]
          ]
          ==>
          [
             [4, 7, 10],
             [3, 6, 9],
             [2, 5, 8],
             [1, 4, 7],
          ]
         */
        rotate90(): Array2;
        /**
          逆时针旋转 180 度
          [
             [1, 2, 3, 4],
             [4, 5, 6, 7],
             [7, 8, 9, 10]
          ]
          ==>
          [
             [10, 9, 8, 7],
             [7, 6, 5, 4],
             [4, 3, 2, 1],
          ]
         */
        rotate180(): Array2;
        /**
          逆时针旋转 270 度
          [
            [1, 2, 3, 4],
            [4, 5, 6, 7],
            [7, 8, 9, 10]
          ]
          ==>
          [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3],
            [10, 7, 4],
          ]
         */
        rotate270(): Array2;
        /**
         水平翻转
          [
            [1, 2, 3, 4],
            [4, 5, 6, 7],
            [7, 8, 9, 10]
          ]
          ==>
          [
            [4, 3, 2, 1],
            [7, 6, 5, 4],
            [10, 9, 8, 7]
          ]
         */
        flipX(): Array2;
        /**
         垂直翻转
          [
            [1, 2, 3, 4],
            [4, 5, 6, 7],
            [7, 8, 9, 10]
          ]
          ==>
          [
            [7, 8, 9, 10],
            [4, 5, 6, 7],
            [1, 2, 3, 4]
          ]
         */
        flipY(): Array2;
        /**
          水平垂直翻转
          [
            [1, 2, 3, 4],
            [4, 5, 6, 7],
            [7, 8, 9, 10]
          ]
          ==>
          [
            [10, 9, 8, 7],
            [7, 6, 5, 4],
            [4, 3, 2, 1],
          ]
         */
        flipXY(): Array2;
        /**
          左上角-右下角 翻转
          [
             [1, 2, 3, 4],
             [4, 5, 6, 7],
             [7, 8, 9, 10]
          ]
          ==>
          [
             [1, 4, 7],
             [2, 5, 8],
             [3, 6, 9],
             [4, 7, 10]
          ]
        */
        flipBackslash(): Array2;
        /**
         左下角-右上角 翻转
         [
            [1, 2, 3, 4],
            [4, 5, 6, 7],
            [7, 8, 9, 10]
         ]
         ==>
         [
            [10, 7, 4],
            [9, 6, 3],
            [8, 5, 2],
            [7, 4, 1]
         ]
         */
        flipPositiveSlash(): Array2;
        /**
         * 获取 线性二维数组的 连线坐标序号
         * @param row
         * @param col
         *
         * [
         *    [1, 2, 3],
         *    [4, 5, 6],
         *    [7, 8, 9]
         * ]
         * ==>
         * [
         *  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
         *  [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
         *  [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
         *  [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
         *  [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
         *  [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
         *  [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
         *  [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}],
         * ]
         */
        linesIdx(): any[];
        /**
         * 获取 线性二维数组的 连线 值
         *
         * [
         *    [1, 2, 3],
         *    [4, 5, 6],
         *    [7, 8, 9]
         * ]
         * ==>
         * [
         *  [1, 2, 3]
         *  [4, 5, 6]
         *  [7, 8, 9]
         *  [1, 4, 7]
         *  [2, 5, 8]
         *  [3, 6, 9]
         *  [1, 5, 9]
         *  [3, 5, 7]
         * ]
         */
        lines(): any[];
    }
}
declare module "base/type/cu.Number" {
    export class cu_Number {
        static isOdd(num: number): boolean;
        static isEven(num: number): boolean;
    }
}
declare module "base/type/cu.String" {
    export class cu_String {
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
}
declare module "utils/cu.Adapter" {
    export class cu_Adapter {
        /**
         * 游戏屏幕适配
         */
        static adapterScreen(): void;
        /**
         * 是否为刘海屏幕
         */
        static isNotch(): boolean;
        /**
         * 调整刘海屏
         * @param nodes 待调整的节点
         * @param offsetY
         */
        static adapterNotch: (nodes?: cc.Node[], offsetY?: number) => void;
    }
}
declare module "utils/cu.Audio" {
    export class Audio {
        private audioObj;
        private getAudioObj;
        private saveAudioObj;
        init(): void;
        getMusicStatus(): boolean;
        setMusicStatus(musicStatus: boolean): void;
        getMusicVolume(): number;
        setMusicVolume(musicVolume: number): void;
        getEffectStatus(): boolean;
        setEffectStatus(effectStatus: boolean): void;
        getEffectVolume(): number;
        setEffectVolume(effectVolume: any): void;
        getVibrateStatus(): boolean;
        setVibrateStatus(vibrateStatus: boolean): void;
        stopAll(): void;
        pauseAll(): void;
        resumeAll(): void;
        isMusicPlaying(): boolean;
        playMusic(clip: cc.AudioClip, loop?: boolean): number;
        stopMusic(): void;
        pauseMusic(): void;
        resumeMusic(): void;
        playEffect(clip: cc.AudioClip, loop?: boolean): number;
        stopEffect(audioId: number): void;
        pauseEffect(audioId: number): void;
        resumeEffect(audioId: number): void;
        stopAllEffects(): void;
        pauseAllEffects(): void;
        resumeAllEffects(): void;
        startVibrate(duration: number): void;
        stopVibrate(): void;
    }
}
declare module "utils/cu.Convert" {
    export class cu_Convert {
        /**
        * 得到一个节点的世界坐标
        * node的原点在中心
        * @param {*} node
        */
        static localConvertWorldPointAR(node: cc.Node): cc.Vec2;
        /**
        * 得到一个节点的世界坐标
        * node的原点在左下边
        * @param {*} node
        */
        static localConvertWorldPoint(node: cc.Node): cc.Vec2;
        /**
         * 把一个世界坐标的点，转换到某个节点下的坐标
         * 原点在node中心
         * @param {*} node
         * @param {*} worldPos
         */
        static worldConvertLocalPointAR(node: cc.Node, worldPos: cc.Vec2): cc.Vec2;
        /**
         * 把一个世界坐标的点，转换到某个节点下的坐标
         * 原点在node左下角
         * @param {*} node
         * @param {*} worldPos
         */
        static worldConvertLocalPoint(node: cc.Node, worldPos: cc.Vec2): cc.Vec2;
        /**
         *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
         * @param {*} node
         * @param {*} targetNode
         */
        static convetOtherNodeSpace(node: cc.Node, targetNode: cc.Node): cc.Vec2;
        /**
         *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
         * @param {*} node
         * @param {*} targetNode
         */
        static convetOtherNodeSpaceAR(node: cc.Node, targetNode: cc.Node): cc.Vec2;
    }
}
declare module "utils/cu.Platform" {
    export enum cu_LANGUAGE {
        /** English language code */
        LANGUAGE_ENGLISH = 0,
        /** Chinese language code */
        LANGUAGE_CHINESE = 1,
        /** French language code */
        LANGUAGE_FRENCH = 2,
        /** Italian language code */
        LANGUAGE_ITALIAN = 3,
        /** German language code */
        LANGUAGE_GERMAN = 4,
        /** Spanish language code */
        LANGUAGE_SPANISH = 5,
        /** Spanish language code */
        LANGUAGE_DUTCH = 6,
        /** Russian language code */
        LANGUAGE_RUSSIAN = 7,
        /** Korean language code */
        LANGUAGE_KOREAN = 8,
        /** Japanese language code */
        LANGUAGE_JAPANESE = 9,
        /** Hungarian language code */
        LANGUAGE_HUNGARIAN = 10,
        /** Portuguese language code */
        LANGUAGE_PORTUGUESE = 11,
        /** Arabic language code */
        LANGUAGE_ARABIC = 12,
        /** Norwegian language code */
        LANGUAGE_NORWEGIAN = 13,
        /** Polish language code */
        LANGUAGE_POLISH = 14,
        /** Turkish language code */
        LANGUAGE_TURKISH = 15,
        /** Ukrainian language code */
        LANGUAGE_UKRAINIAN = 16,
        /** Romanian language code */
        LANGUAGE_ROMANIAN = 17,
        /** Bulgarian language code */
        LANGUAGE_BULGARIAN = 18,
        LANGUAGE_UNKNOWN = 19
    }
    export enum cu_OS {
        OS_IOS = 10001,
        OS_ANDROID = 10002,
        OS_WINDOWS = 10003,
        OS_MARMALADE = 10004,
        OS_LINUX = 10005,
        OS_BADA = 10006,
        OS_BLACKBERRY = 10007,
        OS_OSX = 10008,
        OS_WP8 = 10009,
        OS_WINRT = 10010,
        OS_UNKNOWN = 10011
    }
    export enum cu_PLATFORM {
        UNKNOWN = 20001,
        WIN32 = 20002,
        LINUX = 20003,
        MACOS = 20004,
        ANDROID = 20005,
        IPHONE = 20006,
        IPAD = 20007,
        BLACKBERRY = 20008,
        NACL = 20009,
        EMSCRIPTEN = 20010,
        TIZEN = 20011,
        WINRT = 20012,
        WP8 = 20013,
        MOBILE_BROWSER = 20014,
        DESKTOP_BROWSER = 20015,
        EDITOR_PAGE = 20016,
        EDITOR_CORE = 20017,
        WECHAT_GAME = 20018,
        QQ_PLAY = 20019,
        FB_PLAYABLE_ADS = 20020,
        BAIDU_GAME = 20021,
        VIVO_GAME = 20022,
        OPPO_GAME = 20023,
        HUAWEI_GAME = 20024,
        XIAOMI_GAME = 20025,
        JKW_GAME = 20026,
        ALIPAY_GAME = 20027,
        WECHAT_GAME_SUB = 20029,
        BAIDU_GAME_SUB = 20030,
        QTT_GAME = 20031,
        BYTEDANCE_GAME = 200032,
        BYTEDANCE_GAME_SUB = 20033,
        LINKSURE = 20034
    }
    export enum cu_BROWSER {
        BROWSER_TYPE_WECHAT = 30035,
        BROWSER_TYPE_ANDROID = 30036,
        BROWSER_TYPE_IE = 30037,
        BROWSER_TYPE_EDGE = 30038,
        BROWSER_TYPE_QQ = 30039,
        BROWSER_TYPE_MOBILE_QQ = 30040,
        BROWSER_TYPE_UC = 30041,
        BROWSER_TYPE_UCBS = 30042,
        BROWSER_TYPE_360 = 30043,
        BROWSER_TYPE_BAIDU_APP = 30044,
        BROWSER_TYPE_BAIDU = 30045,
        BROWSER_TYPE_MAXTHON = 30046,
        BROWSER_TYPE_OPERA = 30047,
        BROWSER_TYPE_OUPENG = 30048,
        BROWSER_TYPE_MIUI = 30049,
        BROWSER_TYPE_FIREFOX = 30050,
        BROWSER_TYPE_SAFARI = 30051,
        BROWSER_TYPE_CHROME = 30052,
        BROWSER_TYPE_LIEBAO = 30053,
        BROWSER_TYPE_QZONE = 30054,
        BROWSER_TYPE_SOUGOU = 30055,
        BROWSER_TYPE_HUAWEI = 30056,
        BROWSER_TYPE_UNKNOWN = 30057
    }
    export enum cu_NETWORK {
        NONE = 40001,
        LAN = 40002,
        WWAN = 40003
    }
    export class cu_Platform {
        private static language;
        private static os;
        private static platform;
        private static browserType;
        private static networkType;
        static getLanguage(): cu_LANGUAGE;
        static getOS(): cu_OS;
        static getPlatform(): cu_PLATFORM;
        static getBrowerType(): cu_BROWSER;
        static getNetwork(): cu_NETWORK;
        static isBrowser(): boolean;
        static isMobile(): boolean;
        static isNative(): boolean;
        static getOsInfo(): any;
        static getBrowserInfo(): {
            type: cu_BROWSER;
            version: string | void;
        };
    }
}
declare module "utils/cu.Pool" {
    export class cu_Pool {
        prefab: cc.Prefab;
        component: any;
        initNum: number;
        pool: any;
        constructor(prefab: cc.Prefab, component: any, initNum: number);
        private init;
        private createNode;
        clear(): void;
        get(): cc.Node;
        put(node: cc.Node): void;
    }
}
declare module "utils/cu.PopUp" {
    export let POP_UP_TYPE: {
        NONE: number;
        SCALE: number;
        SCALE_X: number;
        SCALE_Y: number;
    };
    export default class cu_PopUp extends cc.Component {
        target: cc.Node;
        popUpType: number;
        private reset;
        private action;
        onLoad(): void;
        onEnable(): void;
    }
}
declare module "utils/cu.Register" {
    export class cu_TouchRegister {
        static register(node: any, touchBegin?: (pos: cc.Vec2) => {}, touchMove?: (pos: cc.Vec2, delta: cc.Vec2) => {}, touchEnded?: (pos: cc.Vec2) => {}, touchCancel?: (pos: cc.Vec2) => {}): void;
        static unregister(node: any): void;
    }
    export class cu_MouseRegister {
        static register(node: any, leftDown?: (pos: cc.Vec2) => {}, leftUp?: (pos: cc.Vec2) => {}, midDown?: (pos: cc.Vec2) => {}, midUp?: (pos: cc.Vec2) => {}, rightDown?: (pos: cc.Vec2) => {}, rigthUp?: (pos: cc.Vec2) => {}, mouseMove?: (pos: cc.Vec2, delta: cc.Vec2) => {}, wheelScroll?: (scrollY: number) => {}): void;
        unregister: (node: any) => void;
    }
    export class cu_BackgroundRegister {
        static register(node: any, hide?: Function, show?: Function): void;
        static unregister(node: any): void;
    }
    export class cu_AndroidRegister {
        static register(backCallback?: Function, homeCallback?: Function, menuCallback?: Function): void;
        static unregister(): void;
    }
}
declare module "utils/cu.Sign" {
    export class cu_Sign {
        private signObj;
        private getSignObj;
        private saveSignObj;
        private getLastDay;
        private setLastDay;
        private getContinuous;
        private setContinuous;
        isNeedSign(): boolean;
        getSignDays(): number;
        sign(): void;
    }
}
declare module "utils/cu.Statistics" {
    export class cu_Track {
        private track;
        constructor(msg?: string);
        toString(): string;
    }
    export class cu_Statistics {
        statisticsObj: any;
        private static getStatisticsObj;
        private static setStatisticsObj;
        static record(track: cu_Track): void;
        static report(): void;
    }
}
declare module "utils/cu.Toast" {
    export class cu_Toast {
        static show(message: any, parent?: cc.Node): void;
    }
}
declare module "utils/cu.User" {
    export enum cu_GENDER {
        FEMALE = 0,
        MALE = 1,
        UNKNOWN = 2
    }
    export class cu_User {
        private userObj;
        private getUserObj;
        private saveUserObj;
        getName(): string;
        setName(name: string): void;
        getAvatarUrl(): string;
        setAvatarUrl(avatarUrl: string): void;
        getAge(): number;
        setAge(age: number): void;
        getGender(): cu_GENDER;
        setGender(gender: cu_GENDER): void;
        getMotto(): string;
        setMotto(motto: string): void;
    }
}
