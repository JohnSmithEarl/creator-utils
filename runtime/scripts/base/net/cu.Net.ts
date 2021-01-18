export class NetBase {
    quest(options: any, callback: Function) {
        let url = options.url;
        let method = options.method;
        let data = options.data;
        let timeout = options.timeout || 0;

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        let response: any = {};
        response.xhr = xhr;
        if (timeout > 0) {
            xhr.timeout = timeout;
        }
        let time_begin = new Date().getTime();

        if (cc.sys.platform == cc.sys.MACOS ||
            cc.sys.platform == cc.sys.IPHONE ||
            cc.sys.platform == cc.sys.IPAD) {
        } else {
            xhr.withCredentials = true;
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                response.status = xhr.status;
                response.status_message = xhr.statusText;
                if (xhr.status >= 200 && xhr.status < 400) {
                    response.body = xhr.responseText;
                }
                if (callback) {
                    let time_end = new Date().getTime();
                    response.duration = time_end - time_begin;
                    callback(response);
                    callback = null;
                }
            }
        };
        xhr.open(method, url, options.async);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (options.cookie && options.cookie.length > 0) {
            xhr.setRequestHeader('cookie', options.cookie);
        }
        if (typeof data === 'object') {
            try {
                data = JSON.stringify(data);
            } catch (err) {
                console.error(err);
            }
        }
        xhr.send(data);
        xhr.ontimeout = () => {
            response.status = xhr.status;
            response.status_message = xhr.statusText;
            if (callback) {
                let time_end = new Date().getTime();
                response.duration = time_end - time_begin;
                callback(response);
                callback = null;
            }
        };
    }

    parse = function (httpResponse: any) {
        let response: any = {};
        response.code = -1;
        response.http_status = httpResponse.status;
        response.http_status_message = httpResponse.status_message;
        response.duration = httpResponse.duration;
        try {
            let bodyObj = JSON.parse(httpResponse.body);
            response.code = bodyObj.code;
            response.data = bodyObj.data;
        } catch (err) {
            console.error(err);
        }
        return response;
    };

    get(url: string, cookie: any, callback: Function) {
        let options: any = {
            timeout: 10000,
            async: true,
        }
        if (typeof url === 'object') {
            Object.assign(options, url);
        } else if (typeof url === 'string') {
            options.url = url;
        }
        options.method = 'get';
        options.cookie = cookie;
        this.quest(options, callback);
    }

    post(url: string, data: any, cookie: any, callback: Function) {
        let options: any = {
            timeout: 10000,
            async: true,
        }
        if (typeof url === 'object') {
            Object.assign(options, url);
        } else if (typeof url === 'string') {
            options.url = url;
        }
        options.method = 'post';
        options.data = data;
        options.cookie = cookie;
        this.quest(options, callback);
    }

    getQueryString = function (urlParams: any, name: string) {
        try {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let res = urlParams.substr(1).match(reg);
            if (res) {
                return unescape(res[2]);
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    getQueryInt = function (urlParams: any, name: string) {
        try {
            let value = Number.parseInt(this.getQueryString(urlParams, name));
            if (isNaN(value)) {
                return null;
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }
};

export class Net {
    cookie: any = null;
    netBase: NetBase = null;

    constructor() {
        this.netBase = new NetBase();
        this.cookie = {};
    }

    get(url: string, callback: Function): void {
        this.netBase.get(url, this.cookie, (httpResponse: any) => {
            this.cookie = httpResponse.xhr.getResponseHeader('Set-Cookie');
            let data = this.netBase.parse(httpResponse);
            if (typeof callback == "function") {
                callback(data);
            }
        });
    }

    post(url: string, data: any, callback: Function) {
        this.netBase.post(url, data, this.cookie, (httpResponse: any) => {
            this.cookie = httpResponse.xhr.getResponseHeader('Set-Cookie');
            let data = this.netBase.parse(httpResponse);
            if (typeof callback == "function") {
                callback(data);
            }
        });
    }
};