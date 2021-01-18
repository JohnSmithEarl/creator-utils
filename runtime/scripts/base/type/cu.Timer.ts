// let Timer = {};

// Timer.create = function () {
//     let target = 0;
//     let base = 0;
//     let last = 0;
//     let pausedAt = 0;

//     let timer = function () { };
//     timer.prototype.init = function (b) {
//         last = base = this.time();
//         target = b || 0;
//     };
//     timer.prototype.time = function () {
//         let time = Date.now();
//         return time;
//     }
//     timer.prototype.set = function (b) {
//         target = b || 0;
//         base = this.time();
//         pausedAt = 0;
//     };
//     timer.prototype.reset = function () {
//         base = this.time();
//         pausedAt = 0;
//     };
//     timer.prototype.tick = function () {
//         var b = this.time() - last;
//         last = this.time();
//         return pausedAt ? 0 : b;
//     };
//     timer.prototype.delta = function () {
//         let delta = (pausedAt || this.time()) - base - target;
//         return delta;
//     };
//     timer.prototype.pause = function () {
//         pausedAt || (pausedAt = this.time());
//     };
//     timer.prototype.unpause = function () {
//         pausedAt && (base += this.time() - pausedAt, pausedAt = 0);
//     };

//     return new timer();
// };

// module.exports = Timer;