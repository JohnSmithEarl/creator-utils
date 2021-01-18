let Unordered_map = {};
Unordered_map.create = function () {
    let length = 0;
    let _data = new Object();

    function unordered_map() { };

    unordered_map.prototype.put = function (key, value) {
        let isSuccess = false;
        if (!this.isValidKey(key)) {
            console.error("unorder_map - put - invalid key");
        } else {
            if (!this.containsKey(key)) {
                length++;
                _data[key] = value;
                isSuccess = true;
            } else {
                console.error("The key(" + key + ") is exsit in HashMap, please use a new key");
            }
        }
        return isSuccess;
    }

    unordered_map.prototype.get = function (key) {
        if (this.containsKey(key)) {
            return _data[key];
        } else {
            return null;
        }
    }

    unordered_map.prototype.remove = function (key) {
        if (delete _data[key]) {
            length--;
        }
    }

    unordered_map.prototype.clear = function () {
        if (this.empty()) {
            return;
        }
        for (let prop in _data) {
            delete _data[prop];
        }
        length = 0;
    }

    unordered_map.prototype.values = function () {
        let values = new Array();
        for (let prop in _data) {
            values.push(_data[prop]);
        }
        return values;
    }

    unordered_map.prototype.keys = function () {
        let keys = new Array();
        for (let prop in _data) {
            keys.push(prop);
        }
        return keys;
    }

    unordered_map.prototype.size = function () {
        return length;
    }

    unordered_map.prototype.empty = function () {
        return length == 0;
    }

    unordered_map.prototype.serialize = function (delimit = "\n") {
        if (this.empty()) {
            return null;
        }

        let keys = this.keys();
        let str = "";
        for (let i in keys) {
            let key = keys[i];
            str = str + key + "=" + this.get(key) + delimit;
        }
        str = str.substring(0, str.length - 1).toString();
        return str;
    }

    unordered_map.prototype.equals = function (object) {
        return (_data == object);
    }

    unordered_map.prototype.clear = function () {
        length = 0;
        _data = new Object();
    }

    return new unordered_map();
}
module.exports = Unordered_map;