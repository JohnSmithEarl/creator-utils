export class USearch {
    /**
     * 顺序查找
     * @param arr
     * @param data
     */
    public static sequenceSearch(arr: Array<any>, data: any) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == data) {
                return i;
            }
        }
        return -1;
    }
    //   var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
    //   console.log(seqSearch(arr, 15))

    /**
     * 二分查找
     * @param arr
     * @param data
     */
    public static binSearch(arr: Array<any>, data: any) {
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
        return -1
    }
    // var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    // console.log(binSearch(arr, 15))
};