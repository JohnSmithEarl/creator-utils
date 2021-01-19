export declare class cu_Storage {
    static collectGarbage(): void;
    static clear(): void;
    static set: (key: string, value: any) => void;
    static get(key: string): any;
    static remove(key: string): void;
    static multiSet: (keysOrPairs?: any[], values?: any[]) => void;
    static multiGet(keys?: any[]): Array<any>;
    static mutilRemove: (keys?: any[]) => void;
}
