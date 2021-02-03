import { UStorage } from "../base/storage/UStorage";
import { UObject } from "../base/core/UObject";

let _USER_KEY = "cu.user.object";

export enum cu_GENDER {
    FEMALE = 0,
    MALE = 1,
    UNKNOWN = 2,
}

export class cu_User {
    private userObj = {
        _inited: false,
        name: "",
        avaterUrl: "",
        age: 0,
        gender: cu_GENDER.UNKNOWN,
        motto: "",
    }

    private getUserObj(): any {
        if (!this.userObj._inited) {
            let str = UStorage.get(_USER_KEY);
            if (str) {
                this.userObj._inited = true;
                this.saveUserObj(this.userObj);
            } else {
                let userObj = UStorage.get(_USER_KEY);
                UObject.mixIn(this.userObj, userObj);
                this.userObj._inited = true;
            }
        }
        return this.userObj;
    }

    private saveUserObj(obj: any): void {
        let str = JSON.stringify(obj);
        UStorage.set(_USER_KEY, str);
    }

    getName(): string {
        this.userObj = this.getUserObj();
        return this.userObj.name;
    }

    setName(name: string): void {
        this.userObj = this.getUserObj();
        if (this.userObj.name != name) {
            this.userObj.name = name;
            this.saveUserObj(this.userObj);
        }
    }

    getAvatarUrl(): string {
        this.userObj = this.getUserObj();
        return this.userObj.avaterUrl;
    }

    setAvatarUrl(avatarUrl: string): void {
        this.userObj = this.getUserObj();
        if (this.userObj.avaterUrl != avatarUrl) {
            this.userObj.avaterUrl = avatarUrl;
            this.saveUserObj(this.userObj);
        }
    }

    getAge(): number {
        this.userObj = this.getUserObj();
        return this.userObj.age;
    }

    setAge(age: number) {
        this.userObj = this.getUserObj();
        if (this.userObj.age != age) {
            this.userObj.age = age;
            this.saveUserObj(this.userObj);
        }
    }

    getGender(): cu_GENDER {
        this.userObj = this.getUserObj();
        return this.userObj.gender;
    }

    setGender(gender: cu_GENDER) {
        this.userObj = this.getUserObj();
        if (this.userObj.gender != gender) {
            this.userObj.gender = gender;
            this.saveUserObj(this.userObj);
        }
    }

    getMotto(): string {
        this.userObj = this.getUserObj();
        return this.userObj.motto;
    }

    setMotto(motto: string) {
        this.userObj = this.getUserObj();
        if (this.userObj.motto != motto) {
            this.userObj.motto = motto;
            this.saveUserObj(this.userObj);
        }
    }
};