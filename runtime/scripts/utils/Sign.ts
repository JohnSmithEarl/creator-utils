import { Storage } from "../base/storage/Storage";
import { Objects } from "../base/type/Objects";

let _SIGN_KEY = "cu.sign.object";

let _SIGN_LIFECYCLE = 7; //签到的周期
let _IS_NEED_CONTINUOUS = true; // 签到是否需要连续

export class USigned {
    private signObj = {
        _inited: false,
        lastDay: 0,
        continuous: 0,
    };

    private getSignObj(): any {
        if (!this.signObj._inited) {
            let str = Storage.get(_SIGN_KEY);
            if (!str) {
                this.signObj._inited = true;
                this.saveSignObj(this.signObj);
            } else {
                let signObj = JSON.parse(str);
                Objects.merge(this.signObj, signObj);
                this.signObj._inited = true;
            }
        }
        return this.signObj;
    }

    private saveSignObj(obj: any): void {
        setTimeout(() => {
            let str = JSON.stringify(obj);
            Storage.set(_SIGN_KEY, str);
        }, 1);
    };

    private getLastDay(): number {
        this.signObj = this.getSignObj();
        return this.signObj.lastDay;
    }

    private setLastDay(day: number) {
        this.signObj = this.getSignObj();
        this.signObj.lastDay = day;
        this.saveSignObj(this.signObj);
    }

    private getContinuous() {
        this.signObj = this.getSignObj();
        return this.signObj.continuous;
    }

    private setContinuous(continuous: number) {
        this.signObj = this.getSignObj();
        this.signObj.continuous = continuous;
        this.saveSignObj(this.signObj);
    }

    isNeedSign(): boolean {
        let day = new Date().getDate();
        let lastDay = this.getLastDay();
        let isNeedSign = day != lastDay;

        if (isNeedSign) {
            let isReset = false;
            let continuous = this.getContinuous();
            if (continuous >= _SIGN_LIFECYCLE) {
                isReset = true;
            }
            if (_IS_NEED_CONTINUOUS) {
                let offset = day - lastDay;
                if (offset > 1) {
                    isReset = true;
                }
            }
            if (isReset) {
                this.setContinuous(0);
            }
        }

        return isNeedSign;
    }

    getSignDays(): number {
        let continuous = this.getContinuous();
        return continuous;
    }

    sign(): void {
        let day = new Date().getDate();
        this.setLastDay(day);

        let continuous = this.getContinuous();
        continuous += 1;
        this.setContinuous(continuous);
    }
};