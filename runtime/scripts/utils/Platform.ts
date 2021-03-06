export enum LANGUAGE {
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
    LANGUAGE_UNKNOWN = 19,
};

export enum OS {
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
    OS_UNKNOWN = 10011,
};

export enum PLATFORM {
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
    LINKSURE = 20034,
}

export enum BROWSER {
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
    BROWSER_TYPE_UNKNOWN = 30057,
}

export enum NETWORK {
    NONE = 40001,
    LAN = 40002,
    WWAN = 40003,
};

export class Platform {
    private static language: any = undefined;
    private static os: any = undefined;
    private static platform: any = undefined;
    private static browserType: any = undefined;
    private static networkType: any = undefined;

    static getLanguage(): LANGUAGE {
        if (!this.language) {
            if (cc.sys.languageCode == cc.sys.LANGUAGE_ENGLISH) {
                this.language = LANGUAGE.LANGUAGE_ENGLISH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_CHINESE) {
                this.language = LANGUAGE.LANGUAGE_CHINESE;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_FRENCH) {
                this.language = LANGUAGE.LANGUAGE_FRENCH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_ITALIAN) {
                this.language = LANGUAGE.LANGUAGE_ITALIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_GERMAN) {
                this.language = LANGUAGE.LANGUAGE_GERMAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_SPANISH) {
                this.language = LANGUAGE.LANGUAGE_SPANISH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_DUTCH) {
                this.language = LANGUAGE.LANGUAGE_DUTCH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_RUSSIAN) {
                this.language = LANGUAGE.LANGUAGE_RUSSIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_KOREAN) {
                this.language = LANGUAGE.LANGUAGE_KOREAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_JAPANESE) {
                this.language = LANGUAGE.LANGUAGE_JAPANESE;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_HUNGARIAN) {
                this.language = LANGUAGE.LANGUAGE_HUNGARIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_PORTUGUESE) {
                this.language = LANGUAGE.LANGUAGE_PORTUGUESE;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_ARABIC) {
                this.language = LANGUAGE.LANGUAGE_ARABIC;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_NORWEGIAN) {
                this.language = LANGUAGE.LANGUAGE_NORWEGIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_POLISH) {
                this.language = LANGUAGE.LANGUAGE_POLISH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_TURKISH) {
                this.language = LANGUAGE.LANGUAGE_TURKISH;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_UKRAINIAN) {
                this.language = LANGUAGE.LANGUAGE_UKRAINIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_ROMANIAN) {
                this.language = LANGUAGE.LANGUAGE_ROMANIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_BULGARIAN) {
                this.language = LANGUAGE.LANGUAGE_BULGARIAN;
            } else if (cc.sys.languageCode == cc.sys.LANGUAGE_UNKNOWN) {
                this.language = LANGUAGE.LANGUAGE_UNKNOWN;
            }
        }
        return this.language;
    }
    static getOS(): OS {
        if (!this.os) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                this.os = OS.OS_IOS;
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.os = OS.OS_ANDROID;
            } else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                this.os = OS.OS_WINDOWS;
            } else if (cc.sys.os == cc.sys.OS_MARMALADE) {
                this.os = OS.OS_MARMALADE;
            } else if (cc.sys.os == cc.sys.OS_LINUX) {
                this.os = OS.OS_LINUX;
            } else if (cc.sys.os == cc.sys.OS_BADA) {
                this.os = OS.OS_BADA;
            } else if (cc.sys.os == cc.sys.OS_BLACKBERRY) {
                this.os = OS.OS_BLACKBERRY;
            } else if (cc.sys.os == cc.sys.OS_OSX) {
                this.os = OS.OS_OSX;
            } else if (cc.sys.os == cc.sys.OS_WP8) {
                this.os = OS.OS_WP8;
            } else if (cc.sys.os == cc.sys.OS_WINRT) {
                this.os = OS.OS_WINRT;
            } else if (cc.sys.os == cc.sys.OS_UNKNOWN) {
                this.os = OS.OS_UNKNOWN;
            }
        }
        return this.os;
    }
    static getPlatform(): PLATFORM {
        if (!this.platform) {
            if (cc.sys.platform == cc.sys.WIN32) {
                this.platform = PLATFORM.WIN32;
            } else if (cc.sys.platform == cc.sys.LINUX) {
                this.platform = PLATFORM.LINUX;
            } else if (cc.sys.platform == cc.sys.MACOS) {
                this.platform = PLATFORM.MACOS;
            } else if (cc.sys.platform == cc.sys.ANDROID) {
                this.platform = PLATFORM.ANDROID;
            } else if (cc.sys.platform == cc.sys.IPHONE) {
                this.platform = PLATFORM.IPHONE;
            } else if (cc.sys.platform == cc.sys.IPAD) {
                this.platform = PLATFORM.IPAD;
            } else if (cc.sys.platform == cc.sys.BLACKBERRY) {
                this.platform = PLATFORM.BLACKBERRY;
            } else if (cc.sys.platform == cc.sys.NACL) {
                this.platform = PLATFORM.NACL;
            } else if (cc.sys.platform == cc.sys.EMSCRIPTEN) {
                this.platform = PLATFORM.EMSCRIPTEN;
            } else if (cc.sys.platform == cc.sys.TIZEN) {
                this.platform = PLATFORM.TIZEN;
            } else if (cc.sys.platform == cc.sys.WINRT) {
                this.platform = PLATFORM.WINRT;
            } else if (cc.sys.platform == cc.sys.WP8) {
                this.platform = PLATFORM.WP8;
            } else if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
                this.platform = PLATFORM.MOBILE_BROWSER;
            } else if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
                this.platform = PLATFORM.DESKTOP_BROWSER;
            } else if (cc.sys.platform == cc.sys.EDITOR_PAGE) {
                this.platform = PLATFORM.EDITOR_PAGE;
            } else if (cc.sys.platform == cc.sys.EDITOR_CORE) {
                this.platform = PLATFORM.EDITOR_CORE;
            } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.platform = PLATFORM.WECHAT_GAME;
            } else if (cc.sys.platform == cc.sys.QQ_PLAY) {
                this.platform = PLATFORM.QQ_PLAY;
            } else if (cc.sys.platform == cc.sys.FB_PLAYABLE_ADS) {
                this.platform = PLATFORM.FB_PLAYABLE_ADS;
            } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
                this.platform = PLATFORM.BAIDU_GAME;
            } else if (cc.sys.platform == cc.sys.VIVO_GAME) {
                this.platform = PLATFORM.VIVO_GAME;
            } else if (cc.sys.platform == cc.sys.OPPO_GAME) {
                this.platform = PLATFORM.OPPO_GAME;
            } else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
                this.platform = PLATFORM.HUAWEI_GAME;
            } else if (cc.sys.platform == cc.sys.XIAOMI_GAME) {
                this.platform = PLATFORM.XIAOMI_GAME;
            } else if (cc.sys.platform == cc.sys.JKW_GAME) {
                this.platform = PLATFORM.JKW_GAME;
            } else if (cc.sys.platform == cc.sys.ALIPAY_GAME) {
                this.platform = PLATFORM.ALIPAY_GAME;
            } else if (cc.sys.platform == cc.sys.WECHAT_GAME_SUB) {
                this.platform = PLATFORM.WECHAT_GAME_SUB;
            } else if (cc.sys.platform == cc.sys.BAIDU_GAME_SUB) {
                this.platform = PLATFORM.BAIDU_GAME_SUB;
            } else if (cc.sys.platform == cc.sys.QTT_GAME) {
                this.platform = PLATFORM.QTT_GAME;
            } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
                this.platform = PLATFORM.BYTEDANCE_GAME;
            } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME_SUB) {
                this.platform = PLATFORM.BYTEDANCE_GAME_SUB;
            } else if (cc.sys.platform == cc.sys.LINKSURE) {
                this.platform = PLATFORM.LINKSURE;
            } else if (cc.sys.platform == cc.sys.UNKNOWN) {
                this.platform = PLATFORM.UNKNOWN;
            }
            return this.platform;
            // BROWSER_TYPE_WECHAT: string;
            // BROWSER_TYPE_ANDROID: string;
            // BROWSER_TYPE_IE: string;
            // BROWSER_TYPE_EDGE: string;
            // BROWSER_TYPE_QQ: string;
            // BROWSER_TYPE_MOBILE_QQ: string;
            // BROWSER_TYPE_UC: string;
            // BROWSER_TYPE_UCBS: string;
            // BROWSER_TYPE_360: string;
            // BROWSER_TYPE_BAIDU_APP: string;
            // BROWSER_TYPE_BAIDU: string;
            // BROWSER_TYPE_MAXTHON: string;
            // BROWSER_TYPE_OPERA: string;
            // BROWSER_TYPE_OUPENG: string;
            // BROWSER_TYPE_MIUI: string;
            // BROWSER_TYPE_FIREFOX: string;
            // BROWSER_TYPE_SAFARI: string;
            // BROWSER_TYPE_CHROME: string;
            // BROWSER_TYPE_LIEBAO: string;
            // BROWSER_TYPE_QZONE: string;
            // BROWSER_TYPE_SOUGOU: string;
            // BROWSER_TYPE_HUAWEI: string;
            // BROWSER_TYPE_UNKNOWN: string;

        }
        return this.platform;
    }
    static getBrowerType(): BROWSER {
        if (!this.browserType) {
            if (cc.sys.browserType = cc.sys.BROWSER_TYPE_WECHAT) {
                this.browserType = BROWSER.BROWSER_TYPE_WECHAT;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_ANDROID) {
                this.browserType = BROWSER.BROWSER_TYPE_ANDROID;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_IE) {
                this.browserType = BROWSER.BROWSER_TYPE_IE;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_EDGE) {
                this.browserType = BROWSER.BROWSER_TYPE_EDGE;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_QQ) {
                this.browserType = BROWSER.BROWSER_TYPE_QQ;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MOBILE_QQ) {
                this.browserType = BROWSER.BROWSER_TYPE_MOBILE_QQ;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UC) {
                this.browserType = BROWSER.BROWSER_TYPE_UC;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UCBS) {
                this.browserType = BROWSER.BROWSER_TYPE_UCBS;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_360) {
                this.browserType = BROWSER.BROWSER_TYPE_360;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_BAIDU_APP) {
                this.browserType = BROWSER.BROWSER_TYPE_BAIDU_APP;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_BAIDU) {
                this.browserType = BROWSER.BROWSER_TYPE_BAIDU;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MAXTHON) {
                this.browserType = BROWSER.BROWSER_TYPE_MAXTHON;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_OPERA) {
                this.browserType = BROWSER.BROWSER_TYPE_OPERA;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_OUPENG) {
                this.browserType = BROWSER.BROWSER_TYPE_OUPENG;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_MIUI) {
                this.browserType = BROWSER.BROWSER_TYPE_MIUI;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_FIREFOX) {
                this.browserType = BROWSER.BROWSER_TYPE_FIREFOX;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_SAFARI) {
                this.browserType = BROWSER.BROWSER_TYPE_SAFARI;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_CHROME) {
                this.browserType = BROWSER.BROWSER_TYPE_CHROME;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_LIEBAO) {
                this.browserType = BROWSER.BROWSER_TYPE_LIEBAO;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_QZONE) {
                this.browserType = BROWSER.BROWSER_TYPE_QZONE;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_SOUGOU) {
                this.browserType = BROWSER.BROWSER_TYPE_SOUGOU;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_HUAWEI) {
                this.browserType = BROWSER.BROWSER_TYPE_HUAWEI;
            } else if (cc.sys.browserType = cc.sys.BROWSER_TYPE_UNKNOWN) {
                this.browserType = BROWSER.BROWSER_TYPE_UNKNOWN;
            }
        }
        return this.browserType;
    }
    static getNetwork(): NETWORK {
        if (!this.networkType) {
            this.networkType = cc.sys.getNetworkType();
        }
        return this.networkType;
    }
    static isBrowser(): boolean {
        return cc.sys.isBrowser;
    }
    static isMobile(): boolean {
        return cc.sys.isMobile;
    }
    static isNative(): boolean {
        return cc.sys.isNative;
    }
    static getOsInfo(): any {
        let osInfo = {
            type: this.getOS(),
            version: cc.sys.osVersion,
            mainVersion: cc.sys.osMainVersion,
        };
        return osInfo;
    };
    static getBrowserInfo() {
        let browserInfo = {
            type: this.getBrowerType(),
            version: cc.sys.browserVersion,
        }
        return browserInfo;
    }
}
