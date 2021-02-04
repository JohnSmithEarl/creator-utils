let _REPORT_URL = "https://www.baidu.com";

export class UTrack {
    private track = {
        time: 0,
        msg: "",
    };

    constructor(msg: string = "") {
        this.track.time = new Date().getTime();
        this.track.msg = msg;
    }

    toString() {
        let str = JSON.stringify(this.track);
        return str;
    }
}

export class UStatistics {
    statisticsObj: any = {
        _inited: false,
        time: 0,
        tracks: [],
    }

    private static getStatisticsObj() {

    }

    private static setStatisticsObj() {

    }

    static record(track: UTrack) {

    }

    static report() {

    }
};