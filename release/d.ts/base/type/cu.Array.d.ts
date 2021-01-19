export declare class Array1 {
    private data;
    /**
     * 构建一维数组
     * @param arr
     */
    constructor(arr_len?: Array<any> | number, initVal?: any);
    /**
     * 获取 一维数组 数据
     */
    getData(): any[];
    /**
     * 获取元素值
     * @param idx
     */
    get(idx: number): any;
    /**
     * 设置元素值
     * @param idx
     * @param val
     */
    set(idx: number, val: any): void;
    /**
     * 序列化
     */
    toString(): string;
    /**
     * 拷贝 一维数组
     */
    clone(): Array1;
    /**
     * 复制一维数组
     * @param arr1
     */
    copy(arr1: Array1): void;
    /**
     * 清空一维数组
     */
    clear(): void;
    /**
     * 反序列化 一维数组
     */
    reverse(): void;
    /**
     * 排序一维数组
     * @param sortFunc
     */
    sort(sortFunc?: (a: number, b: number) => number): void;
    /**
     * 连接一维数组
     * @param arr1
     */
    contact(arr1: Array1): void;
    /**
     * 一维数组 去重复
     * @param arr1
     */
    distinct(arr1?: Array1): any[];
    /**
     * 合并多维数组
     * @param arr
     */
    flatten(arr: Array<any>): any;
    /**
     * 一维数组求和
     * @param sunFunc
     */
    sum(sunFunc?: (a: number, b: number) => number): any;
    /**
     * 一维数组求积
     * @param mulFunc
     */
    mul(mulFunc?: (a: number, b: number) => number): any;
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
    linesIdx(row?: number, col?: number): any[];
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
    lines(row?: number, col?: number): any[];
}
export declare class Array2 {
    private data;
    /**
     * 创建二位数组
     * @param arr
     */
    constructor(arr_row?: Array<Array<any>> | number, col?: number, initVal?: any);
    /**
     * 获取二位数组原数据
     */
    getData(): Array<Array<any>>;
    /**
     * 获取行数
     */
    getRowCount(): number;
    /**
     * 获取列数
     */
    getColCount(): number;
    /**
     *  获取元素值
     * @param x_pos
     * @param y
     */
    get(x_pos: any | number, y?: number): any;
    /**
     * 设置元素值
     * @param x_pos
     * @param y_val
     * @param val
     */
    set(x_pos: any | number, y_val?: number, val?: any): void;
    /**
     * 序列化
     */
    toString(): string;
    /**
     * 克隆二维数组
     */
    clone(): Array2;
    /**
     * 拷贝二维数组数据
     * @param arr2
     */
    copy(arr2: Array2): void;
    /**
     * 清理二维数组
     */
    clear(): void;
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
    rotate90(): Array2;
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
    rotate180(): Array2;
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
    rotate270(): Array2;
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
    flipX(): Array2;
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
    flipY(): Array2;
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
    flipXY(): Array2;
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
    flipBackslash(): Array2;
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
    flipPositiveSlash(): Array2;
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
    linesIdx(): any[];
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
    lines(): any[];
}
