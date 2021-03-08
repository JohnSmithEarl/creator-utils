class Sopt {
    x = 0;
    y = 0;
    f = 0;
    g = 0
    h = 0;
    parent = null;
    wall = false;
    neighbors = [];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = undefined;
        this.wall = false;
        this.neighbors = [];
    }

    addNeighbors(grid: Array<Array<any>>, cols: number, rows: number) {
        let x = this.x;
        let y = this.y;
        if (y - 1 >= 0) {
            this.neighbors.push(grid[x][y - 1]);
        }
        if (x - 1 >= 0) {
            this.neighbors.push(grid[x - 1][y]);
        }
        if (x + 1 < cols) {
            this.neighbors.push(grid[x + 1][y]);
        }
        if (y + 1 < rows) {
            this.neighbors.push(grid[x][y + 1]);
        }

        // if (x - 1 >= 0 && y - 1 >= 0) {
        //     this.neighbors.push(grid[x - 1][y - 1]);
        // }
        // if (x + 1 < cols && y - 1 >= 0) {
        //     this.neighbors.push(grid[x + 1][y - 1]);
        // }
        // if (x - 1 >= 0 && y + 1 < rows) {
        //     this.neighbors.push(grid[x - 1][y + 1]);
        // }
        // if (x + 1 < cols && y + 1 < rows) {
        //     this.neighbors.push(grid[x + 1][y + 1]);
        // }
    }
};

export class AlgoAStar {
    protected startPos: cc.Vec2 = null;
    protected endPos: cc.Vec2 = null;
    protected rows: number = 0;
    protected cols: number = 0;
    protected map: Array<Array<any>> = [];
    protected grid: Array<any> = [];
    protected openList: Array<any> = [];

    protected closedList: Array<any> = [];
    protected startSopt: Sopt = null;
    protected endSopt: Sopt = null;
    protected pathList: Array<any> = [];

    constructor(mapData: Array<Array<any>>, startPos: cc.Vec2, endPos: cc.Vec2, passTag: any) {
        this.startPos = startPos;
        this.endPos = endPos;
        this.rows = mapData.length;
        this.cols = mapData[0].length;
        this.map = mapData;
        this.grid = [];
        this.openList = [];
        this.closedList = [];
        this.startSopt = null;
        this.endSopt = null;
        this.pathList = [];

        for (let i = 0; i < this.cols; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = new Sopt(i, j);
                if (this.map[j][i] != passTag) {
                    this.grid[i][j]['wall'] = true;
                }
            }
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j].addNeighbors(this.grid, this.rows, this.cols);
            }
        }

        this.startSopt = this.grid[startPos.x][startPos.y];
        this.endSopt = this.grid[endPos.x][endPos.y];
        this.startSopt.wall = this.endSopt.wall = false;

        this.startSopt.g = 0;
        this.startSopt.h = Math.abs(this.endSopt.x - this.startSopt.x) + Math.abs(this.endSopt.y - this.startSopt.y);
        this.startSopt.f = this.startSopt.g + this.startSopt.h;
        this.openList.push(this.startSopt);
    }

    getPath() {
        if (this.openList.length > 0) {
            let currIndex = 0;
            let curr = null;

            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].f < this.openList[currIndex].f) {
                    currIndex = i;
                }
            }

            curr = this.openList[currIndex];

            if (curr === this.endSopt) {
                let pathList = this._getPath(curr);
                return pathList;
            } else {
                this.removeFromArray(this.openList, curr);
                this.closedList.push(curr);

                for (let i = 0; i < curr.neighbors.length; i++) {
                    let neighbor = curr.neighbors[i];
                    if (!this.closedList.includes(neighbor) && !neighbor.wall) {
                        let tmpF = curr.g + this.getG(curr, neighbor) + this.getH(neighbor);
                        let newPath = false; // 是否是更好的路线
                        if (this.openList.includes(neighbor)) {
                            if (tmpF <= neighbor.f) {
                                neighbor.f = tmpF;
                                newPath = true;
                            }
                        } else {
                            neighbor.g = curr.g + this.getG(curr, neighbor);
                            neighbor.h = this.getH(neighbor);
                            neighbor.f = neighbor.g + neighbor.h;
                            newPath = true;
                            this.openList.push(neighbor);
                        }
                        if (newPath) {
                            neighbor.parent = curr;
                        }
                    }
                }
                this.getPath();
                return this.pathList;
            }
        } else {
            return this.pathList;
        }
    }

    private _getPath(curr: Sopt) {
        if (curr.parent) {
            let v2 = cc.v2(curr.parent.x, curr.parent.y);
            this.pathList.push(v2);
            return this._getPath(curr.parent);
        } else {
            this.pathList.reverse();
            this.pathList.shift();
            let v2 = cc.v2(this.endPos.x, this.endPos.y);
            this.pathList.push(v2);
            return this.pathList;
        }
    }

    private removeFromArray(arr: Array<any>, elt: Sopt) {
        arr.forEach((el, index) => {
            if (el == elt) {
                arr.splice(index, 1);
            }
        });
    };

    private getH(el: Sopt) {
        return (Math.abs(this.endSopt.x - el.x) + Math.abs(el.y - el.y)) * 10;
    }

    private getG(el1: Sopt, el2: Sopt) {
        let g = 0;
        if (Math.abs(el1.x - el2.x) == Math.abs(el1.y - el2.y)) {
            g = Math.abs(el1.x - el2.x) * 14;
        } else {
            let x = Math.abs(el1.x - el2.x);
            let y = Math.abs(el1.y - el2.y);
            g = (x + y) * 10;
        }
        return g;
    }
};

export let test = function () {
    console.log("test AlgoAStar\n\n");

    let arr2 = [
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ];
    for (let j = 0; j < arr2.length; j++) {
        let arr1 = arr2[j];
        let line = '';
        if (arr1) {
            for (let i = 0; i < arr1.length; i++) {
                let item = arr1[i];
                line += item + ",";
            }
            line += "\n";
            console.log(line);
        }
    }

    let aStar = new AlgoAStar(arr2, cc.v2(0, 0), cc.v2(4, 0), 0);
    let paths = aStar.getPath();
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        console.log("==> ", path.y, path.x);
    }

    console.log("test AlgoAStar\n\n");
};