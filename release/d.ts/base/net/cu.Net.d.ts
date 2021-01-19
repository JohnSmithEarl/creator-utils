export declare class NetBase {
    quest(options: any, callback: Function): void;
    parse: (httpResponse: any) => any;
    get(url: string, cookie: any, callback: Function): void;
    post(url: string, data: any, cookie: any, callback: Function): void;
    getQueryString: (urlParams: any, name: string) => string;
    getQueryInt: (urlParams: any, name: string) => any;
}
export declare class Net {
    cookie: any;
    netBase: NetBase;
    constructor();
    get(url: string, callback: Function): void;
    post(url: string, data: any, callback: Function): void;
}
