import { U_COMPARE } from "./UConst";

export class UDate extends Date {
    /**
     * 日期匹配的正则表达式
     * Y:年
     * M:月
     * D:日
     * h:小时
     * m:分钟
     * s:秒
     * i:毫秒
     * w:星期(小写的)
     * W:星期(大写的)
     */
    public static REG_DATE = /([YMDhmsiWw])(\1*)/g;

    public static STAMP_SECONDS = 1000;
    public static STAMP_MINUTES = 60 * UDate.STAMP_SECONDS;
    public static STAMP_HOUR = 60 * UDate.STAMP_MINUTES;
    public static STAMP_DATE = 24 * UDate.STAMP_HOUR;

    /**
     * 星期
     */
    public static WEEK = ["日", "一", "二", "三", "四", "五", "六"];

    /**
     * @description 判断 对象obj 是否为 UDate
     * @param obj
     *   例如:
     *      let obj = 1;
     *      UDate.isUDate(obj);  ==> false
     */
    public static isUDate(obj: any) {
        return Object.prototype.toString.call(obj) === "[object UDate]";
    };

    /**
     * @description 生成UDate对象
     * @param str 时间字符
     * @param pattern 时间字符格式 "YYYY-MM-DD hh:mm:ss:iii"
     */
    public static create(str: string = "1970-01-01 00:00:00:000", pattern: string = "YYYY-MM-DD hh:mm:ss:iii") {
        try {
            if (!pattern) {
                if (str.length === 10) {
                    pattern = "YYYY-MM-DD";
                } else if (str.length === 19) {
                    pattern = "YYYY-MM-DD hh:mm:ss";
                } else if (str.length === 23) {
                    pattern = "YYYY-MM-DD hh:mm:ss:iii";
                } else {
                    pattern = "MM-DD";
                }
            }
            pattern = (pattern || (str.length === 10 ? "YYYY-MM-DD" : (str.length === 19 ? "YYYY-MM-DD hh:mm:ss" : "YYYY-MM-DD hh:mm:ss:iii")));
            let matchs1 = pattern.match(UDate.REG_DATE);
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
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    /**
     * @description 格式化时间
     * @param {Date} value 目标时间
     * @param {String} pattern 匹配字符串
     */
    public static format(uDate: UDate, pattern: string) {
        if (!UDate.isUDate(uDate)) {
            return "";
        }
        function leftPad0(num: any = 0, len: number = 0): string {
            let newLen = len - (num + "").length;
            for (let i = 0; i < newLen; i++) {
                num = "0" + num;
            }
            return num;
        }
        function replacer(match: string): string {
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
                    return leftPad0(UDate.WEEK[uDate.getDay()], match.length);
                default:
                    return "";
            }
        }
        try {
            pattern = pattern || "YYYY-MM-DD hh:mm:ss:iii";
            let timeStr = pattern.replace(UDate.REG_DATE, replacer);
            return timeStr;
        } catch (err) {
            console.error(err);
        }
        return "";
    };

    public static clone(uDate: UDate) {
        let time = uDate.getTime();
        let newUDate = new UDate(time);
        return newUDate;
    }

    /**
     * 是否为同一天
     * @param timeStampA
     * @param timeStampB
     */
    public static isSameDate(timeStampA: number, timeStampB: number) {
        let dateA = new Date(timeStampA);
        dateA.setHours(0, 0, 0, 0);
        let dateB = new Date(timeStampB);
        dateB.setHours(0, 0, 0, 0)
        let timestamp1 = dateA.getTime();
        let timestame2 = dateB.getTime();
        let isSameDay = timestamp1 == timestame2;
        return isSameDay;
    }

    /**
     * 是否为同一周
     * @param timestamp1
     * @param timestamp2
     */
    public static isSameWeek(timestamp1: number, timestamp2: number): boolean {
        let old_count = Math.floor(timestamp1 / UDate.STAMP_DATE);
        let now_other = Math.floor(timestamp2 / UDate.STAMP_DATE);
        let isSameWeek = Math.floor((old_count + 4) / 7) == Math.floor((now_other + 4) / 7);
        return isSameWeek;
    };

    /**
     * @description 是否是闰年
     * @param year
     */
    public static isLeapYear(year: number = 1970) {
        if (year < 0) {
            year = year % 400 + 400;
        }
        let isLeapYear = (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
        return isLeapYear;
    }

    /**
     * 获取某一年有多少天
     * @param year
     */
    public static getYearDays(year: number) {
        let isLeapYear = UDate.isLeapYear(year);
        let yearDays = isLeapYear ? 366 : 365;
        return yearDays;
    }

    /**
     * @description 获取某月有多少天
     * @param {Number} month 对应的月份
     */
    public static getMonthDays(month: number) {
        if (month < 0) {
            month = month % 12 + 12;
        } else if (month > 12) {
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
                if (UDate.isLeapYear()) {
                    return 29;
                } else {
                    return 28;
                }
            default:
                console.error("err:", month);
                return 0;
        }
    }

    /**
     * @description 获取这周是这个月的第几周
     * @param timestamp
     */
    public static getWeekOfMonth(timestamp: number) {
        let date = new Date(timestamp);
        let dayOfMonth = date.getDate()
        let day = date.getDay()
        let weekIdx = Math.ceil((dayOfMonth + 6 - day) / 7);
        return weekIdx;
    }

    /**
     * @description 获取这周是这一年的第几周
     * @param timestamp
     */
    public static getWeekOfYear(timestamp: number) {
        let dateNow = new Date(timestamp);
        let dateFirst = new Date(dateNow.getFullYear(), 0, 1);
        let offsetDay = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / UDate.STAMP_DATE);
        let weekId = Math.ceil((offsetDay + ((dateFirst.getDay() + 1) - 1)) / 7);
        return weekId;
    }

    /**
     * 获取今天是今年的第几天
     * @param timestamp
     */
    public static getDayOfYear(timestamp?: number) {
        let start = null;
        if (timestamp > 0) {
            start = new Date(timestamp);
        } else {
            start = new Date();
        }
        start.setMonth(0);
        start.setDate(1);
        let now = new Date();
        let timeOffset = now.getTime() - start.getTime();
        let dayOffset = Math.ceil(timeOffset / UDate.STAMP_DATE);
        return dayOffset;
    }

    /**
     * @description 获取某天最小时间戳
     * @param {Number} timestamp
     */
    public static getDateTimeMin(timestamp: number) {
        let date = new Date(timestamp);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let time = date.getTime();
        return time;
    }

    /**
     * @description 获取某天的最大时间戳
     * @param {Number} timestamp
     */
    public static getDateTimeMax(timestamp: number): number {
        let date = new Date(timestamp);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        let time = date.getTime();
        return time;
    }

    constructor(...args: any) {
        super();
        this.init(args);
    }

    public init(...args: any): void {

    }

    public toString(): string {
        let str = UDate.format(this, "YYYY-MM-DD hh:mm:ss:iii");
        return str;
    }

    //override
    public getMonth(): number {
        let month = super.getMonth() + 1;
        return month;
    }

    //override
    public setMonth(month: number): number {
        let newMonth = month - 1;
        super.setMonth(newMonth);
        return newMonth;
    }

    public addFullYear(offset: number): UDate {
        let year = this.getFullYear();
        let newYear = year + offset;
        if (newYear >= 1970) {
            this.setFullYear(newYear);
        } else {
            console.error("year < 1970.");
        }
        return this;
    }

    public addMonth(offset: number): UDate {
        let month = this.getMonth();
        let newMonth = month + offset;
        if (newMonth <= 0) {
            let year = Math.ceil(newMonth / 12) - 1;
            this.setFullYear(year);
            newMonth = newMonth % 12 + 12;
            this.setMonth(month);
        } else if (newMonth > 12) {
            let year = Math.floor(newMonth / 12);
            this.addFullYear(year);
            newMonth = newMonth % 12;
            this.setMonth(newMonth);
        } else {
            this.setMonth(newMonth);
        }
        return this;
    }

    public addDate(offset: number): UDate {
        let offsetTimestamp = offset * UDate.STAMP_DATE;
        this.addMilliseconds(offsetTimestamp);
        return this;
    }

    public addHour(offset: number): UDate {
        let offsetTimestamp = offset * UDate.STAMP_HOUR;
        this.addMilliseconds(offsetTimestamp);
        return this;
    }

    public addMinutes(offset: number): UDate {
        let offsetTimestamp = offset * UDate.STAMP_MINUTES;
        this.addMilliseconds(offsetTimestamp);
        return this;
    }

    public addMilliseconds(offset: number): UDate {
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

    /**
     * 获取当前时间是星期几
     */
    public getWhatDay(): number {
        let week = [7, 1, 2, 3, 4, 5, 6];
        let day = this.getDay();
        let whatDay = week[day];
        return whatDay;
    }

    public compare(udate: UDate): U_COMPARE {
        let selfTime = this.getTime();
        let otherTime = udate.getTime();
        if (selfTime > otherTime) {
            return U_COMPARE.GREATER;
        } else if (selfTime == otherTime) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareYear(udate: UDate): U_COMPARE {
        let selfYear = this.getFullYear();
        let otherYear = udate.getFullYear();
        if (selfYear > otherYear) {
            return U_COMPARE.GREATER;
        } else if (selfYear == otherYear) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareMonth(udate: UDate): U_COMPARE {
        let selfMonth = this.getMonth();
        let otherMonth = udate.getMonth();
        if (selfMonth > otherMonth) {
            return U_COMPARE.GREATER;
        } else if (selfMonth == otherMonth) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareDay(uDate: UDate): U_COMPARE {
        let selfDay = this.getDay();
        let otherDay = uDate.getDate();
        if (selfDay > otherDay) {
            return U_COMPARE.GREATER;
        } else if (selfDay == otherDay) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareHour(uDate: UDate): U_COMPARE {
        let selfHours = this.getHours();
        let otherHours = uDate.getHours();
        if (selfHours > otherHours) {
            return U_COMPARE.GREATER;
        } else if (selfHours == otherHours) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareMinutes(uDate: UDate): U_COMPARE {
        let selfMinutes = this.getMinutes();
        let otherMinutes = uDate.getMinutes();
        if (selfMinutes > otherMinutes) {
            return U_COMPARE.GREATER;
        } else if (selfMinutes == otherMinutes) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }

    public compareSecond(uDate: UDate): U_COMPARE {
        let selfSeconds = this.getHours();
        let otherSeconds = uDate.getHours();
        if (selfSeconds > otherSeconds) {
            return U_COMPARE.GREATER;
        } else if (selfSeconds == otherSeconds) {
            return U_COMPARE.EQUAL;
        } else {
            return U_COMPARE.LESS;
        }
    }
};