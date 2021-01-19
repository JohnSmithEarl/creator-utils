export declare class cu_Track {
    private track;
    constructor(msg?: string);
    toString(): string;
}
export declare class cu_Statistics {
    statisticsObj: any;
    private static getStatisticsObj;
    private static setStatisticsObj;
    static record(track: cu_Track): void;
    static report(): void;
}
