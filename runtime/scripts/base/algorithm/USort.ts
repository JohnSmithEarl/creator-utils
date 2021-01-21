export class USort {
    /**
     * 冒泡排序
     * @param arr
     */
    public static bubbleSort(arr: Array<any>): Array<any> {
        var i = arr.length;
        while (i > 0) {
            var pos = 0
            for (var j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    pos = j
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
            i = pos
        }
        return arr
    }
    // var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
    // console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

    /**
     * 选择排序
     * @param arr
     */
    public static selectionSort(arr: Array<any>): Array<any> {
        var len = arr.length;
        var minIndex, temp;
        for (var i = 0; i < len - 1; i++) {
            minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j
                }
            }
            temp = arr[minIndex]
            arr[minIndex] = arr[i]
            arr[i] = temp
        }
        return arr
    }
    // var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
    // console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

    /**
     *
     * @param arr 插入排序
     */
    public static insertSort(arr: Array<any>): Array<any> {
        var len = arr.length
        for (let i = 1; i < len; i++) {
            var key = arr[i]
            var j = i - 1
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]
                j--;
            }
            arr[j + 1] = key
        }
        return arr
    }
    // var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    // console.log(insertSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

    /**
     * 希尔排序
     * @param arr
     */
    public static shellSort(arr: Array<any>): Array<any> {
        var len = arr.length;
        var temp, gap = 1;
        while (gap < len / 3) {
            gap = gap * 3 + 1
        }
        while (gap >= 1) {
            for (var i = gap; i < len; i++) {
                temp = arr[i]
                for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                    arr[j + gap] = arr[j]
                }
                arr[j + gap] = temp
            }
            gap = (gap - 1) / 3
        }
        return arr
    }
    // var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    // console.log(shellSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

    /**
     * 归并排序
     * @param arr
     */
    private static merge(left: Array<any>, right: Array<any>) {
        var result = []
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }
        while (left.length) {
            result.push(left.shift())
        }
        while (right.length) {
            result.push(right.shift())
        }
        return result
    }
    public static mergeSort(arr: Array<any>): Array<any> {
        var len = arr.length
        if (len < 2) {
            return arr
        }
        var middle = Math.floor(len / 2)
        var left = arr.slice(0, middle)
        var right = arr.slice(middle)
        return USort.merge(USort.mergeSort(left), USort.mergeSort(right));
    }
    // var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    // console.log(mergeSort(arr));

    /**
     * 快速排序
     * @param arr
     */
    public static quickSort(arr: Array<any>): Array<any> {
        if (arr.length == 0) {
            return []
        }
        var left = []
        var right = []
        var pivot = arr[0]
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return USort.quickSort(left).concat(pivot, USort.quickSort(right));
    }
    // var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
    // console.log(qSort(arr));
};