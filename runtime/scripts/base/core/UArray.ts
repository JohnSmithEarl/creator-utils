import { UObject } from "./UObject";

export class UArray extends Array { };

export class UArray1 {
  private data: Array<any> = undefined;

  /**
   * 构建一维数组
   * @param arr
   */
  constructor(arr_len?: Array<any> | number, initVal: any = 0) {
    if (arr_len instanceof Array) {
      this.data = arr_len;
    } else {
      let len = arr_len > 0 ? arr_len : 0;
      let arr = new Array<any>(len);
      for (let i = 0; i < arr.length; i++) {
        this.data[i] = initVal;
      }
      this.data = arr;
    }
  }

  /**
   * 获取 一维数组 数据
   */
  getData(): any[] {
    return this.data;
  }

  /**
   * 获取元素值
   * @param idx
   */
  get(idx: number): any {
    let item = this.data[idx] || 0;
    return item;
  }

  /**
   * 设置元素值
   * @param idx
   * @param val
   */
  set(idx: number, val: any): void {
    if (this.data[idx]) {
      this.data[idx] = val;
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
   * 拷贝 一维数组
   */
  clone(): UArray1 {
    let arr1: any = new UArray1();
    arr1.copy(this);
    return arr1;
  }

  /**
   * 复制一维数组
   * @param arr1
   */
  copy(arr1: UArray1) {
    let data = arr1.getData();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item) {
        let copyItem = UObject.deepCopy(item);
        this.data[i] = copyItem;
      }
    }
  }

  /**
   * 清空一维数组
   */
  clear(): void {
    this.data.splice(0, this.data.length);
  }

  /**
   * 反序列化 一维数组
   */
  reverse(): void {
    this.data.reverse();
  }

  /**
   * 排序一维数组
   * @param sortFunc
   */
  sort(sortFunc?: (a: number, b: number) => number): void {
    if (typeof sortFunc == "function") {
      this.data.sort(sortFunc);
    } else {
      this.data.sort();
    }
  }

  /**
   * 连接一维数组
   * @param arr1
   */
  contact(arr1: UArray1) {
    let data = arr1.getData();
    this.data = this.data.concat(data);
  }

  /**
   * 一维数组 去重复
   * @param arr1
   */
  distinct(arr1?: UArray1) {
    let newData = this.data;
    if (arr1) {
      let data = arr1.getData();
      newData = newData.concat(data);
    }
    let result = []
    let keyObj = {}
    for (let key in newData) {
      if (!keyObj[key]) {
        keyObj[key] = true;
        result.push(key);
      }
    }
    return result;
  }

  /**
   * 合并多维数组
   * @param arr
   */
  flatten(arr: Array<any>) {
    let newArr = arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), []);
    this.copy(newArr);
    return newArr;
  }

  /**
   * 一维数组求和
   * @param sunFunc
   */
  sum(sunFunc = (a: number, b: number): number => { return a + b; }) {
    let sum = this.data.reduce(sunFunc);
    return sum;
  }

  /**
   * 一维数组求积
   * @param mulFunc
   */
  mul(mulFunc = (a: number, b: number): number => { return a * b; }) {
    let mul = this.data.reduce(mulFunc);
    return mul;
  }

  /**
   * 获取 线性二维数组的 连线 坐标序号
   * @param row
   * @param col
   *
   * [
   *    1, 2, 3,
   *    4, 5, 6,
   *    7, 8, 9
   * ]
   * ==>
   * [
   *  [0, 1, 2]
   *  [3, 4, 5]
   *  [6, 7, 8]
   *  [0, 3, 6]
   *  [1, 4, 7]
   *  [2, 5, 8]
   *  [0, 4, 8]
   *  [2, 4, 6]
   * ]
   */
  linesIdx(row: number = 3, col: number = 3) {
    let lineIdxs = [];

    //horizontal
    for (let j = 0; j < row; j++) {
      let horizontal = [];
      for (let i = 0; i < col; i++) {
        let idx = j * col + i;
        horizontal[horizontal.length] = idx;
      }
      lineIdxs[lineIdxs.length] = horizontal;
    }

    //vertical
    for (let i = 0; i < row; i++) {
      let vertical = [];
      for (let j = 0; j < col; j++) {
        let idx = j * col + i;
        vertical[vertical.length] = idx;
      }
      lineIdxs[lineIdxs.length] = vertical;
    }

    if (row == col) {
      //diag left top to right bottom
      let diag_left_to_right = [];
      for (let k = 0, initVal = 0, interval = col + 1; k < row; k++) {
        let idx = initVal + k * interval;
        diag_left_to_right[diag_left_to_right.length] = idx;
      }
      lineIdxs[lineIdxs.length] = diag_left_to_right;

      //diag right top to left bottom
      let diag_right_to_left = [];
      for (let k = 0, initVal = col - 1, interval = initVal; k < row; k++) {
        let idx = initVal + k * interval;
        diag_right_to_left[diag_right_to_left.length] = idx;
      }
      lineIdxs[lineIdxs.length] = diag_right_to_left;
    }
    return lineIdxs;
  }

  /**
   * 获取 线性二维数组的 连线 值
   * @param row
   * @param col
   *
   * [
   *    1, 2, 3,
   *    4, 5, 6,
   *    7, 8, 9
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
  lines(row: number = 3, col: number = 3) {
    let lines = this.linesIdx(row, col);
    for (let j = 0; j < lines.length; j++) {
      if (lines[j]) {
        for (let i = 0; i < lines[j].length; i++) {
          let idx = lines[i];
          lines[i] = this.data[idx] || 0;
        }
      }
    };
    return lines;
  }
};

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
          let copyItem = UObject.deepCopy(item);
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