let Stack = {};

Stack.create = function () {
    let _data = [];

    function stack() { };

    stack.prototype.push = function (element) {
        _data.push(element);
    }

    stack.prototype.pop = function () {
        return _data.pop();
    }

    stack.prototype.peek = function () {
        return _data[_data.length - 1];
    }

    stack.prototype.size = function () {
        return _data.length;
    }

    stack.prototype.clear = function () {
        _data = [];
    }

    stack.prototype.toString = function (delimit = "\n") {
        let str = _data.join(delimit);
        return str;
    }

    stack.prototype.empty = function () {
        if (_data.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    return new stack();
}

module.exports = Stack;