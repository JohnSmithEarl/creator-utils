let Queue = {};

Queue.create = function () {
    let _data = [];

    function queue(t_data, t_compare) { };

    queue.prototype.enqueue = function (element) {
        _data.push(element);
    }

    queue.prototype.dequeue = function () {
        if (this.empty()) {
            return null;
        } else {
            return _data.shift();
        }
    }

    queue.prototype.front = function () {
        if (this.empty()) {
            return null;
        } else {
            return _data[0];
        }
    }

    queue.prototype.back = function () {
        if (this.empty()) {
            return null;
        } else {
            return _data[_data.length - 1];
        }
    }

    queue.prototype.empty = function () {
        if (_data.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    queue.prototype.toString = function (delimit = "\n") {
        let str = _data.join(delimit);
        return str;
    }

    queue.prototype.size = function () {
        return _data.length;
    }

    queue.prototype.clear = function () {
        _data = [];
    }

    return new queue(data, compare);
}
module.exports = Queue;