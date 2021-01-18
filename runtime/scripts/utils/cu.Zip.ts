// export class UtilZip {
//     private static _instance;

//     public static getInstance() {
//         if (!this._instance) {
//             this._instance = new UtilZip();
//         }
//         return this._instance;
//     }

//     public loadZip(zipName = "gameGo/config/goConfig", filePath = "goConfig/goJsonNet.json", contentType = "string", callback = (fileContent) => { }) {
//         cc.loader.loadRes(zipName, async (err, res) => {
//             if (err) {
//                 console.log("UtilZip - loadZip - err:", err)
//                 console.log('加载失败！')
//             } else {
//                 console.log('加载成功！')
//                 console.log(res)
//                 console.log(res._nativeAsset);

//                 let jsZip = new JSZip();
//                 // console.log(jsZip)
//                 let zip = await jsZip.loadAsync(res._nativeAsset)
//                 if (zip) {
//                     let fileContent = await zip.file(filePath).async(contentType);
//                     console.log("UtilZip - loadZip - fileContent - ", fileContent);
//                     if (typeof callback == "function") {
//                         callback(fileContent);
//                     }

//                 }
//                 // let file6 = await zip.file('dou.png').async('uint8array')
//                 // console.log(file6.byteLength)
//                 // let image = new Image()
//                 // image.src = file6;
//                 // image.onload = () => {
//                 //     let tex = new cc.Texture2D()
//                 //     tex.initWithElement(image)
//                 //     let spf = new cc.SpriteFrame(tex)
//                 //     let node = new cc.Node()
//                 //     let sp = node.addComponent(cc.Sprite)
//                 //     sp.spriteFrame = spf
//                 //     this.node.addChild(node, -2)
//                 // }
//             }
//         });
//     }
// }