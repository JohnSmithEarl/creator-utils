import { Objects } from "./Objects";

export class Array1 {
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
  clone(): Array1 {
    let arr1: any = new Array1();
    arr1.copy(this);
    return arr1;
  }

  /**
   * 复制一维数组
   * @param arr1
   */
  copy(arr1: Array1) {
    let data = arr1.getData();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item) {
        let copyItem = Objects.deepCopy(item);
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
  contact(arr1: Array1) {
    let data = arr1.getData();
    this.data = this.data.concat(data);
  }

  /**
   * 一维数组 去重复
   * @param arr1
   */
  distinct(arr1?: Array1) {
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
