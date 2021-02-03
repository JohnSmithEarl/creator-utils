export class UZip {
    public static loadZip(zipPath: string, fileName: string, callback: (data: any) => {}) {
        cc.resources.load(zipPath, (err: Error, assets: any) => {
            if (err) {
                console.error(err.message);
            } else {
                JSZip.loadAsync(assets._buffer).then((zip) => {
                    zip.file(fileName).async("text").then((data) => {
                        if (typeof callback == "function") {
                            callback(data);
                        }
                    })
                });
            }
        })
    }
};