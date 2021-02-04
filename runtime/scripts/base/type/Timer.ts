/**
 * @description 计时器
 * @class Timer
 */

export class Timer {
    startTime: number = 0;
    endTime: number = 0;
    passTime: number = 0;
    pauseTime: Array<number> = [];
    resumeTime: Array<number> = [];

    constructor() {

    }

    /**
     * @description 定时器 开始计时
     */
    start(): void {
        this.startTime = new Date().getTime();
        this.endTime = 0;
        this.passTime = 0;
        this.pauseTime.splice(0, this.pauseTime.length);
        this.resumeTime.splice(0, this.resumeTime.length);
    }

    /**
     * @description 获取定时器 当前已计时时长(毫秒)
     * @return {Number}
     */
    passed(endTime: number = 0): number {
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

    /**
     * @description 暂停 定时器计时
     */
    pause(): void {
        if (this.endTime) {
            return;
        }
        if (this.pauseTime.length == this.resumeTime.length) {
            let time = new Date().getTime()
            this.pauseTime.push(time);
        }
    }

    /**
     * @description 恢复 定时器计时
     */
    resume() {
        if (this.endTime) {
            return;
        }
        if (this.pauseTime.length == this.resumeTime.length + 1) {
            let time = new Date().getTime()
            this.resumeTime.push(time);
        }
    }

    /**
     * @description 停止 计时器计时
     * @return {Number} 定时器 计时时长(毫秒)
     */
    stop(): number {
        this.resume();

        this.endTime = new Date().getTime();
        this.passTime = this.passed(this.endTime);
        return this.passTime;
    }

    /**
     * @description 获取 定时器计时详情
     * @return {any} infos = {
     *      startTime: 100,     // 定时器 开始时间戳(毫秒)
     *      endTime: 300,       // 定时器 结束时间戳(毫秒)
     *      passTime: 200,      // 定时器 计时时长(毫秒)
     *      pauseTime: [1, 30],     // 定时器 暂停时间戳(毫秒)
     *      resumeTime: [10, 34],   // 定时器 恢复时间戳(毫秒)
     *
     * }
     */
    detail(): any {
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
        }
        if (this.endTime) {
            infos.endTime = this.endTime;
            infos.passTime = this.passTime;
        } else {
            infos.passTime = this.passed();
        }
        return infos;
    }
};
