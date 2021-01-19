export declare enum cu_LANGUAGE {
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
export declare enum cu_OS {
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
export declare enum cu_PLATFORM {
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
export declare enum cu_BROWSER {
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
export declare enum cu_NETWORK {
    NONE = 40001,
    LAN = 40002,
    WWAN = 40003
}
export declare class cu_Platform {
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
        version: any;
    };
}
