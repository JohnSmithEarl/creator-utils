import { cu_Base64 } from "./cu.Base64";
import { cu_UTF8 } from "./cu.UTF8";

(function () {
    console.log("\n\n===> test start.", "Base64");

    let str = "123456";
    let eStr = cu_Base64.encode(str);
    let str2 = cu_Base64.decode(eStr);

    console.log("str:", str);
    console.log("eStr:", eStr);
    console.log("str2:", str2);

    console.log("===> test ended.\n\n");
})();

(function () {
    console.log("\n\n===> test start.", "UTF8");

    let str = "你好, 世界!";
    let eStr = cu_UTF8.encode(str);
    let str2 = cu_UTF8.decode(eStr);

    console.log("str:", str);
    console.log("eStr:", eStr);
    console.log("str2:", str2);

    console.log("===> test ended.\n\n");
})();