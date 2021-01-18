// let UtilRes = {};

// UtilRes._preloadAnys = new Map();

// /**
//  * @param resources = [
//  *      {key: "audioEffect", type: cc.AudioClip, path: "game/ll/ss/button"},
//  *      ...
//  * ];
//  */
// UtilRes.preload = function (resources = [], resLoadedCallback) {
//     let loadedNum = 0;
//     if (resources.length <= 0) {
//         console.error("UtilRes - preload - err: lenght <= 0");
//         return;
//     }

//     let loadFunc = function (resKey, resType, resPath) {
//         if (UtilRes.hasRes(resKey)) {
//             loadedNum++;
//             if (loadedNum >= resources.length) {
//                 if (typeof resLoadedCallback === "function") {
//                     resLoadedCallback();
//                 }
//             }
//         } else {
//             cc.loader.loadRes(resPath, resType, function (err, loadedRes) {
//                 if (err) {
//                     console.error("UtilRes - preload - err:", err);
//                 } else {
//                     UtilRes._preloadAnys.set(resKey, loadedRes);
//                     // cc.loader.releaseAsset(loadedRes);
//                 }
//                 loadedNum++;
//                 if (loadedNum >= resources.length) {
//                     if (typeof resLoadedCallback === "function") {
//                         resLoadedCallback();
//                     }
//                 }
//             });
//         }
//     };

//     for (let i = 0; i < resources.length; i++) {
//         let res = resources[i];
//         if (typeof res === "object") {
//             loadFunc(res.key, res.type, res.path);
//         }
//     }
// };

// UtilRes.hasRes = function (resKey) {
//     let hasRes = UtilRes._preloadAnys.has(resKey);
//     return hasRes;
// };

// UtilRes.getRes = function (resKey) {
//     if (UtilRes.hasRes(resKey)) {
//         let res = UtilRes._preloadAnys.get(resKey);
//         return res;
//     }

//     return null;
// };

// UtilRes.deleteRes = function (resKey) {
//     if (UtilRes.hasRes(resKey)) {
//         cc.loader.releaseAsset(UtilRes.getRes(resKey));
//         UtilRes._preloadAnys.delete(resKey);
//     }
// };

// UtilRes.clearAllRes = function () {
//     for (let it = UtilRes._preloadAnys.entries(), resItem = it.next(); !resItem.done; resItem = it.next()) {
//         // let resKey = resItem.value[0];
//         let resValue = resItem.value[1];
//         cc.loader.releaseAsset(resValue);
//     }
//     UtilRes._preloadAnys.clear();
// };

// module.exports = UtilRes;