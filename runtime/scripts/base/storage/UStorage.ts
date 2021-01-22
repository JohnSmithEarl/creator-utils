export class UStorage {
    static collectGarbage(): void {
        cc.sys.garbageCollect();
    }

    static clear(): void {
        cc.sys.localStorage.clear();
    }

    static set = function (key: string, value: any) {
        try {
            if (!key) {
                throw new Error("key is empty.");
            }
            if (typeof value != "string") {
                value = value.toString();
            }
            setTimeout(() => {
                cc.sys.localStorage.setItem(key, value);
            }, 1);
        } catch (err) {
            console.error("set - err:", err && err.message)
        }
    };

    static get(key: string): any {
        try {
            if (!key) {
                throw new Error("key is empty.");
            }
            let value = cc.sys.localStorage.getItem(key);
            return value;
        } catch (err) {
            console.error("get - err:", err && err.message)
        }
    };

    static remove(key: string): void {
        try {
            if (!key) {
                throw new Error("key is empty.");
            }
            setTimeout(() => {
                cc.sys.localStorage.removeItem(key);
            }, 1);
        } catch (err) {
            console.error("remove - err:", err && err.message)
        }
    };

    static multiSet = function (keysOrPairs: Array<any> = [{
        key: "k",
        value: "v"
    }], values: Array<any> = []) {
        if (values && values.length === 0) {
            for (let i = 0; i < keysOrPairs.length; i++) {
                let pair = keysOrPairs[i];
                let key = pair.key;
                let value = pair.value;
                UStorage.set(key, value);
            }
        } else {
            let minLength = keysOrPairs.length < values.length ? keysOrPairs.length : values.length;
            for (let i = 0; i < minLength; i++) {
                let key = keysOrPairs[i];
                let value = values[i];
                UStorage.set(key, value);
            }
        }
    };

    static multiGet(keys = []): Array<any> {
        let values = [];
        if (keys && keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let value = UStorage.get(key);
                values.push(value);
            }
        }
        return values;
    };


    static mutilRemove = function (keys: Array<any> = []) {
        if (keys && keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                UStorage.remove(key);
            }
        }
    };
};