// let UtilTime = {};

// UtilTime.getDate = function () {
//     let date = new Date();
//     return date;
// };

// UtilTime.getYYMMDD = function (timestamp) {
//     if (!timestamp) {
//         timestamp = this.getMillisecond();
//     }
//     let yymmdd = this.timestamp_2_yymmdd(timestamp);
//     return yymmdd;
// };

// UtilTime.getIntervalDay = function (timestamp1, timestamp2) {
//     let time1 = this.getEarlyMorningTimpstamp(timestamp1);
//     let time2 = this.getEarlyMorningTimpstamp(timestamp2);
//     let days = (time2 - time1) / (1000 * 60 * 60 * 24);
//     return days;
// };

// UtilTime.getEarlyMorningTimpstamp = function (timestamp) {
//     let date = new Date(timestamp);
//     let year = date.getFullYear();
//     let month = date.getMonth();
//     let day = date.getDate();
//     let hour = 0;
//     let min = 0;
//     let sec = 0;

//     // console.log("UtilTime - getEarlyMorningTimpstamp - year:", year, " month:", month, " day:", day);
//     let newDate = new Date(year, month, day, hour, min, sec);
//     let newTimestamp = newDate.getTime();
//     // console.log("UtilTime - getEarlyMorningTimpstamp - ", date.toLocaleDateString(), newDate.toLocaleDateString());
//     return newTimestamp;
// };

// UtilTime.timestamp_2_yymmdd = function (timestamp) {
//     let date = new Date(time);
//     let currentDate = "";

//     let year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();

//     currentDate += year;
//     if (month >= 10) {
//         currentDate += month;
//     } else {
//         currentDate += "0" + month;
//     }
//     if (day >= 10) {
//         currentDate += day;
//     } else {
//         currentDate += "0" + day;
//     }
//     return parseInt(currentDate);
// };

// UtilTime.yymmdd_2_timestamp = function (yymmdd) { // 20190501
//     let str_yymmdd = "" + yymmdd;
//     let year = parseInt(str_yymmdd.substring(0, 4));
//     let month = parseInt(str_yymmdd.substring(4, 6));
//     let day = parseInt(str_yymmdd.substring(6, 8));
//     let hour = 0;
//     let min = 0;
//     let sec = 0;
//     let newDate = new Date(year, month, day, hour, min, sec);
//     let newTimestamp = newDate.getTime();
//     return newTimestamp;
// };

// UtilTime.formatDate = function (date, value = "yyyy-MM-dd hh:mm:ss") {
//     let dFormat = (i) => {
//         return i < 10 ? "0" + i.toString() : i;
//     }

//     if (!(date instanceof Date)) {
//         date = new Date(date);
//     }

//     if (value == "yyyy-MM-dd hh:mm:ss") {
//         var ar_date = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
//         for (var i = 0; i < ar_date.length; i++) {
//             ar_date[i] = dFormat(ar_date[i]);
//         }
//         return ar_date.slice(0, 3).join('-') + ' ' + ar_date.slice(3).join(':');

//     } else if (value == "yyyy-MM-dd") {
//         var ar_date = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
//         for (var i = 0; i < ar_date.length; i++) {
//             ar_date[i] = dFormat(ar_date[i]);
//         }
//         return ar_date.join('-');

//     }
// };

// UtilTime.formatTime = function (secs) {
//     let hour = Math.floor(secs / 3600);
//     let leftSecs = secs - hour * 3600;
//     let min = Math.floor(leftSecs / 60);
//     let sec = leftSecs % 60;

//     let timeStr = "";

//     if (hour > 9) {
//         timeStr += hour;
//     } else if (hour > 0) {
//         timeStr += "0" + hour;
//     } else {
//         timeStr += "00";
//     }

//     timeStr += " : ";

//     if (min > 9) {
//         timeStr += min;
//     } else if (min > 0) {
//         timeStr += "0" + min;
//     } else {
//         timeStr += "00";
//     }

//     timeStr += " : ";

//     if (sec > 9) {
//         timeStr += sec;
//     } else if (sec > 0) {
//         timeStr += "0" + sec;
//     } else {
//         timeStr += "00";
//     }

//     return timeStr;
// };

// UtilTime.formatTime2 = function (secs) {
//     let min = Math.floor(secs / 60);
//     let sec = secs % 60;

//     let timeStr = "";

//     if (min > 9) {
//         timeStr += min;
//     } else if (min > 0) {
//         timeStr += "0" + min;
//     } else {
//         timeStr += "00";
//     }

//     timeStr += " : ";

//     if (sec > 9) {
//         timeStr += sec;
//     } else if (sec > 0) {
//         timeStr += "0" + sec;
//     } else {
//         timeStr += "00";
//     }

//     return timeStr;
// };

// UtilTime.getDateNum = function () {
//     let date = new Date();
//     let year = 0;
//     let month = 0;
//     let day = 0;
//     let currentDate = "";
//     year = date.getFullYear();
//     month = date.getMonth() + 1;
//     day = date.getDate();
//     currentDate += year;
//     if (month >= 10) {
//         currentDate += month;
//     }
//     else {
//         currentDate += "0" + month;
//     }
//     if (day >= 10) {
//         currentDate += day;
//     }
//     else {
//         currentDate += "0" + day;
//     }
//     return parseInt(currentDate);
// };

// UtilTime.isSameDay = function (timeStampA, timeStampB) {
//     let dateA = new Date(timeStampA);
//     dateA.setHours(0, 0, 0, 0);
//     let dateB = new Date(timeStampB);
//     dateB.setHours(0, 0, 0, 0)
//     let timestamp1 = dateA.getTime();
//     let timestame2 = dateB.getTime();
//     let isSameDay = timestamp1 == timestame2;
//     // console.log("UtilTime - isSameDay - ", timeStampA, timeStampB, dateA, dateB, timestamp1, timestame2, isSameDay);
//     return isSameDay;
// };

// UtilTime.isSameWeek = function (timestamp1, timestamp2) {
//     let oneDayTime = 1000 * 60 * 60 * 24;
//     let old_count = parseInt(timestamp1 / oneDayTime);
//     let now_other = parseInt(timestamp2 / oneDayTime);
//     let isSameWeek = parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
//     return isSameWeek;
// };

// UtilTime.getWhatDay = function (timestamp) { // 星期
//     let week = [7, 1, 2, 3, 4, 5, 6];
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let day = date.getDay();
//     let whatDay = week[day];
//     return whatDay;
// };

// UtilTime.getYear = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let year = date.getFullYear();
//     return year;
// };

// UtilTime.getMonth = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let month = date.getMonth() + 1;
//     return month;
// };

// UtilTime.getDay = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let day = date.getDate();
//     return day;
// };

// UtilTime.getHours = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let hours = date.getHours();
//     return hours;
// };

// UtilTime.getMinutes = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let minutes = date.getMinutes();
//     return minutes;
// };

// UtilTime.getSeconds = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let seconds = date.getSeconds();
//     return seconds;
// };

// UtilTime.getMilliseconds = function (timestamp) {
//     let date = timestamp ? new Date(timestamp) : new Date();
//     let milliseconds = date.getMilliseconds();
//     return milliseconds;
// };

// UtilTime.getPassedTime = function (lastTimestamp = 0, curTimestamp = 0) {
//     let offsetTimestamp = curTimestamp - lastTimestamp;
//     if (offsetTimestamp <= 0 || (offsetTimestamp > 0 && offsetTimestamp <= 60000)) {
//         return "刚刚";
//     } else if (offsetTimestamp < 3600000) {
//         let minus = parseInt(offsetTimestamp / 60000);
//         return minus + "分钟前";
//     } else if (offsetTimestamp < 86400000) {
//         let hours = parseInt(offsetTimestamp / 3600000);
//         return hours + "小时前";
//     } else if (offsetTimestamp < 2592000000) {
//         let days = parseInt(offsetTimestamp / 86400000);
//         return days + "天前";
//     } else if (offsetTimestamp < 31104000000) {
//         let months = parseInt(offsetTimestamp / 2592000000);
//         return months + "月前";
//     } else {
//         let years = parseInt(offsetTimestamp / 31104000000);
//         return years + "年前";
//     }
// };

// module.exports = UtilTime;