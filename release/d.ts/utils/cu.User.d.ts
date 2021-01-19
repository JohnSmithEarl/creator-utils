export declare enum cu_GENDER {
    FEMALE = 0,
    MALE = 1,
    UNKNOWN = 2
}
export declare class cu_User {
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
