export class USearch {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////       顺序查找     //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 顺序查找
     * @param arr
     * @param data
     */
    static sequentialSearch(arr: Array<any>, data: any) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == data) {
                return i;
            }
        }
        return -1;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////       二分查找     //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 二分查找
     * @param arr
     * @param data
     */
    static binarySearch(arr: Array<any>, data: any) {
        var low = 0;
        var high = arr.length - 1
        while (low <= high) {
            var middle = Math.floor((low + high) / 2)
            if (arr[middle] < data) {
                low = middle + 1
            } else if (arr[middle] > data) {
                high = middle - 1
            } else {
                return middle
            }
        }
        return -1;
    }
};

export let test = function () {
    let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    console.log("\n\n 顺序查找");
    console.log(USearch.sequentialSearch(arr, 15));

    console.log("\n\n 二分查找");
    console.log(USearch.binarySearch(arr, 15));
};