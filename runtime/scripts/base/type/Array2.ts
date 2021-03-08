import { Objects } from "./Objects";

export class UArray2 {
    private data: Array<Array<any>> = undefined;

    /**
     * 创建二位数组
     * @param arr
     */
    constructor(arr_row?: Array<Array<any>> | number, col?: number, initVal: any = 0) {
        if (arr_row instanceof Array) {
            this.data = arr_row;
        } else {
            let row = arr_row > 0 ? arr_row : 0;
            col = col > 0 ? col : 0;
            let arr = new Array<Array<any>>();
            for (let j = 0; j < row; j++) {
                if (!arr[j]) {
                    arr[j] = [];
                }
                for (let i = 0; i < col; i++) {
                    arr[j][i] = initVal;
                }
            }
            this.data = arr;
        }
    }

    /**
     * 获取二位数组原数据
     */
    getData(): Array<Array<any>> {
        return this.data;
    }

    /**
     * 获取行数
     */
    getRowCount(): number {
        return this.data.length;
    }

    /**
     * 获取列数
     */
    getColCount(): number {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]) {
                return this.data[i].length;
            }
        }
        return 0;
    }

    /**
     *  获取元素值
     * @param x_pos
     * @param y
     */
    get(x_pos: any | number, y: number = 0) {
        let x = undefined;
        if (typeof x_pos == "object") {
            x = x_pos.x;
            y = x_pos.y;
        } else {
            x = x_pos || 0;
        }
        let val = this.data && this.data[y] && this.data[y][x] || 0;
        return val;
    }

    /**
     * 设置元素值
     * @param x_pos
     * @param y_val
     * @param val
     */
    set(x_pos: any | number, y_val: number = 0, val: any = 0) {
        let x = undefined;
        let y = undefined;
        let value = undefined;
        if (typeof x_pos == "object") {
            x = x_pos.x;
            y = x_pos.y;
            value = y_val;
        } else {
            x = x_pos || 0;
            y = y_val || 0;
            value = val;
        }
        if (this.data && this.data[y]) {
            this.data[y][x] = value;
        }
    }

    /**
     * 序列化
     */
    toString(): string {
        let str = JSON.stringify(this.data);
        return str;
    }

    /**
     * 克隆二维数组
     */
    clone(): UArray2 {
        let newArr2 = new UArray2();
        newArr2.copy(this);
        return newArr2;
    }

    /**
     * 拷贝二维数组数据
     * @param arr2
     */
    copy(arr2: UArray2) {
        let data = arr2.getData();
        for (let j = 0; j < data.length; j++) {
            let items = data[j];
            if (items) {
                if (!this.data[j]) {
                    this.data[j] = [];
                }
                for (let i = 0; i < items[j]; i++) {
                    let item = items[i];
                    let copyItem = Objects.deepCopy(item);
                    this.data[j][i] = copyItem;
                }
            }
        }
    }

    /**
     * 清理二维数组
     */
    clear(): void {
        if (this.data instanceof Array) {
            for (let j = 0; j < this.data.length; j++) {
                let items = this.data[j];
                if (items instanceof Array) {
                    items.splice(0, items.length);
                }
            }
            this.data.splice(0, this.data.length);
        }
    }

    /**
      逆时针旋转 90 度
      [
         [1, 2, 3, 4],
         [4, 5, 6, 7],
         [7, 8, 9, 10]
      ]
      ==>
      [
         [4, 7, 10],
         [3, 6, 9],
         [2, 5, 8],
         [1, 4, 7],
      ]
     */
    rotate90(): UArray2 {
        let row = this.getRowCount();
        let col = this.getColCount();
        let temp = new UArray2(col, row);
        for (let j = 0; j < col; j++) {
            let k = col - 1 - j;
            for (let i = 0; i < row; i++) {
                temp[j][i] = this.data[i][k];
            }
        }
        return temp;
    };

    /**
      逆时针旋转 180 度
      [
         [1, 2, 3, 4],
         [4, 5, 6, 7],
         [7, 8, 9, 10]
      ]
      ==>
      [
         [10, 9, 8, 7],
         [7, 6, 5, 4],
         [4, 3, 2, 1],
      ]
     */
    rotate180(): UArray2 {
        let row = this.getRowCount();
        let col = this.getColCount();
        let temp = new UArray2(row, col);
        for (let j = 0; j < row; j++) {
            for (let i = 0; i < col; i++) {
                temp[j][i] = this.data[row - 1 - j][col - 1 - i];
            }
        }
        return temp;
    };

    /**
      逆时针旋转 270 度
      [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10]
      ]
      ==>
      [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
        [10, 7, 4],
      ]
     */
    rotate270(): UArray2 {
        let row = this.getRowCount();
        let col = this.getColCount();
        let temp = new UArray2(col, row);
        for (let j = 0; j < col; j++) {
            for (let i = 0; i < row; i++) {
                temp[j][i] = this.data[row - 1 - i][j];
            }
        }
        return temp;
    };

    /**
     水平翻转
      [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10]
      ]
      ==>
      [
        [4, 3, 2, 1],
        [7, 6, 5, 4],
        [10, 9, 8, 7]
      ]
     */
    flipX() {
        let temp = this.clone();
        let data = temp.getData();
        for (let j = 0; j < data.length; j++) {
            let items = data[j];
            if (items) {
                items.reverse();
            }
        }

        // or
        //
        // let row = this.getRowCount();
        // let col = this.getColCount();
        // let temp = this.clone();
        // for (let i = 0; i < row; i++) {
        //   for (let j = 0, k = col - 1; j < k; j++, k--) {
        //     let t = temp[i][j];
        //     temp[i][j] = temp[i][k];
        //     temp[i][k] = t;
        //   }
        // }
        return temp;
    };

    /**
     垂直翻转
      [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10]
      ]
      ==>
      [
        [7, 8, 9, 10],
        [4, 5, 6, 7],
        [1, 2, 3, 4]
      ]
     */
    flipY() {
        let temp = this.clone();
        let data = temp.getData();
        data.reverse();

        // or
        //
        // let row = this.getRowCount();
        // let col = this.getRowCount();
        // let temp = this.clone();
        // for (let i = 0; i < col; i++) {
        //   for (let j = 0, k = row - 1; j < k; j++, k--) {
        //     let t = temp[j][i];
        //     temp[j][i] = temp[k][i];
        //     temp[k][i] = t;
        //   }
        // }

        return temp;
    };

    /**
      水平垂直翻转
      [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10]
      ]
      ==>
      [
        [10, 9, 8, 7],
        [7, 6, 5, 4],
        [4, 3, 2, 1],
      ]
     */

    flipXY() {
        let temp = this.clone();
        let data = this.getData();
        for (let j = 0; j < data.length; j++) {
            let items = data[j];
            if (items) {
                items.reverse();
            }
        }
        data.reverse();
        return temp;
    };

    /**
      左上角-右下角 翻转
      [
         [1, 2, 3, 4],
         [4, 5, 6, 7],
         [7, 8, 9, 10]
      ]
      ==>
      [
         [1, 4, 7],
         [2, 5, 8],
         [3, 6, 9],
         [4, 7, 10]
      ]
    */
    flipBackslash() {
        let row = this.getRowCount();
        let col = this.getColCount();
        let temp = new UArray2(col, row);
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                temp[i][j] = this.data[j][i];
            }
        }
        return temp;
    };

    /**
     左下角-右上角 翻转
     [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10]
     ]
     ==>
     [
        [10, 7, 4],
        [9, 6, 3],
        [8, 5, 2],
        [7, 4, 1]
     ]
     */
    flipPositiveSlash() {
        let row = this.getRowCount();
        let col = this.getColCount();
        let temp = new UArray2(col, row);
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                temp[i][j] = this.data[row - 1 - j][col - 1 - i];
            }
        }
        return temp;
    };

    /**
     * 获取 线性二维数组的 连线坐标序号
     * @param row
     * @param col
     *
     * [
     *    [1, 2, 3],
     *    [4, 5, 6],
     *    [7, 8, 9]
     * ]
     * ==>
     * [
     *  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
     *  [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
     *  [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
     *  [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
     *  [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
     *  [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
     *  [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
     *  [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}],
     * ]
     */
    linesIdx() {
        let row = this.getRowCount();
        let col = this.getColCount();

        let lineIdxs = [];

        //horizontal
        for (let j = 0; j < row; j++) {
            let horizontal = [];
            for (let i = 0; i < col; i++) {
                horizontal[horizontal.length] = { x: i, y: j };
            }
            lineIdxs[lineIdxs.length] = horizontal;
        }

        //vertical
        for (let i = 0; i < row; i++) {
            let vertical = [];
            for (let j = 0; j < col; j++) {
                vertical[vertical.length] = { x: i, y: j };
            }
            lineIdxs[lineIdxs.length] = vertical;
        }

        if (row == col) {
            //diag left top to right bottom
            let diag_left_to_right = [];
            for (let j = 0, initVal = 0, interval = col + 1; j < row; j++) {
                let i = (initVal + j * interval) % col;
                diag_left_to_right[diag_left_to_right.length] = { x: i, y: j };
            }
            lineIdxs[lineIdxs.length] = diag_left_to_right;

            //diag right top to left bottom
            let diag_right_to_left = [];
            for (let j = 0, initVal = col - 1, interval = initVal; j < row; j++) {
                let i = (initVal + j * interval);
                diag_right_to_left[diag_right_to_left.length] = { x: i, y: j };
            }
            lineIdxs[lineIdxs.length] = diag_right_to_left;
        }
        return lineIdxs;
    };

    /**
     * 获取 线性二维数组的 连线 值
     *
     * [
     *    [1, 2, 3],
     *    [4, 5, 6],
     *    [7, 8, 9]
     * ]
     * ==>
     * [
     *  [1, 2, 3]
     *  [4, 5, 6]
     *  [7, 8, 9]
     *  [1, 4, 7]
     *  [2, 5, 8]
     *  [3, 6, 9]
     *  [1, 5, 9]
     *  [3, 5, 7]
     * ]
     */
    lines() {
        let lines = this.linesIdx();
        for (let j = 0; j < lines.length; j++) {
            if (lines[j]) {
                for (let i = 0; i < lines[j].length; i++) {
                    let pos: any = lines[j][i];
                    lines[j][i] = this.data && this.data[pos.y] && this.data[pos.y][pos.x] || 0;
                }
            }
        }
        return lines;
    };
};