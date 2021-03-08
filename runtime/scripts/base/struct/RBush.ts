export class RBush {
    data = null;
    _maxEntries = null;
    _minEntries = null;

    constructor(maxEntries = 9) {
        // max entries in a node is 9 by default; min node fill is 40% for best performance
        this._maxEntries = Math.max(4, maxEntries);
        this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
        this.clear();
    }

    all() {
        return this._all(this.data, []);
    }

    search(bbox) {
        let node = this.data;
        const result = [];

        if (!intersects(bbox, node)) return result;

        const toBBox = this.toBBox;
        const nodesToSearch = [];

        while (node) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                const childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);
                    else if (contains(bbox, childBBox)) this._all(child, result);
                    else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    }

    collides(bbox) {
        let node = this.data;

        if (!intersects(bbox, node)) return false;

        const nodesToSearch = [];
        while (node) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                const childBBox = node.leaf ? this.toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    }

    load(data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (let i = 0; i < data.length; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from scratch using OMT algorithm
        let node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                const tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    }

    insert(item?) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    }

    clear() {
        this.data = createNode([]);
        return this;
    }

    remove(item?, equalsFn?) {
        if (!item) return this;

        let node = this.data;
        const bbox = this.toBBox(item);
        const path = [];
        const indexes = [];
        let i, parent, goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) { // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) { // check current node
                const index = findItem(item, node.children, equalsFn);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];

            } else if (parent) { // go right
                i++;
                node = parent.children[i];
                goingUp = false;

            } else node = null; // nothing found
        }

        return this;
    }

    toBBox(item) { return item; }

    compareMinX(a, b) { return a.minX - b.minX; }
    compareMinY(a, b) { return a.minY - b.minY; }

    toJSON() { return this.data; }

    fromJSON(data) {
        this.data = data;
        return this;
    }

    _all(node, result) {
        const nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push(...node.children);
            else nodesToSearch.push(...node.children);

            node = nodesToSearch.pop();
        }
        return result;
    }

    _build(items, left, right, height) {

        const N = right - left + 1;
        let M = this._maxEntries;
        let node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = createNode([]);
        node.leaf = false;
        node.height = height;

        // split the items into M mostly square tiles

        const N2 = Math.ceil(N / M);
        const N1 = N2 * Math.ceil(Math.sqrt(M));

        multiSelect(items, left, right, N1, this.compareMinX);

        for (let i = left; i <= right; i += N1) {

            const right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (let j = i; j <= right2; j += N2) {

                const right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    }

    _chooseSubtree(bbox, node, level, path) {
        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            let minArea = Infinity;
            let minEnlargement = Infinity;
            let targetNode;

            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                const area = bboxArea(child);
                const enlargement = enlargedArea(bbox, child) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;

                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    }

    _insert(item, level, isNode?: boolean) {
        const bbox = isNode ? item : this.toBBox(item);
        const insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        const node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    }

    // split overflowed node into two
    _split(insertPath, level) {
        const node = insertPath[level];
        const M = node.children.length;
        const m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        const splitIndex = this._chooseSplitIndex(node, m, M);

        const newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);
        else this._splitRoot(node, newNode);
    }

    _splitRoot(node, newNode) {
        // split root node
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
    }

    _chooseSplitIndex(node, m, M) {
        let index;
        let minOverlap = Infinity;
        let minArea = Infinity;

        for (let i = m; i <= M - m; i++) {
            const bbox1 = distBBox(node, 0, i, this.toBBox);
            const bbox2 = distBBox(node, i, M, this.toBBox);

            const overlap = intersectionArea(bbox1, bbox2);
            const area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;

            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index || M - m;
    }

    // sorts node children by the best axis for split
    _chooseSplitAxis(node, m, M) {
        const compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
        const compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
        const xMargin = this._allDistMargin(node, m, M, compareMinX);
        const yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    }

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin(node, m, M, compare) {
        node.children.sort(compare);

        const toBBox = this.toBBox;
        const leftBBox = distBBox(node, 0, m, toBBox);
        const rightBBox = distBBox(node, M - m, M, toBBox);
        let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);

        for (let i = m; i < M - m; i++) {
            const child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }

        for (let i = M - m - 1; i >= m; i--) {
            const child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    }

    _adjustParentBBoxes(bbox, path, level) {
        // adjust bboxes along the given tree path
        for (let i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    }

    _condense(path) {
        // go through the path, removing empty nodes and updating bboxes
        for (let i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);

                } else this.clear();

            } else calcBBox(path[i], this.toBBox);
        }
    }
}

function findItem(item, items, equalsFn) {
    if (!equalsFn) return items.indexOf(item);

    for (let i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) return i;
    }
    return -1;
}

// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox, destNode?: any) {
    if (!destNode) destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;

    for (let i = k; i < p; i++) {
        const child = node.children[i];
        extend(destNode, node.leaf ? toBBox(child) : child);
    }

    return destNode;
}

function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
}

function compareNodeMinX(a, b) { return a.minX - b.minX; }
function compareNodeMinY(a, b) { return a.minY - b.minY; }

function bboxArea(a) { return (a.maxX - a.minX) * (a.maxY - a.minY); }
function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
        (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}

function intersectionArea(a, b) {
    const minX = Math.max(a.minX, b.minX);
    const minY = Math.max(a.minY, b.minY);
    const maxX = Math.min(a.maxX, b.maxX);
    const maxY = Math.min(a.maxY, b.maxY);

    return Math.max(0, maxX - minX) *
        Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a.minX <= b.minX &&
        a.minY <= b.minY &&
        b.maxX <= a.maxX &&
        b.maxY <= a.maxY;
}

function intersects(a, b) {
    return b.minX <= a.maxX &&
        b.minY <= a.maxY &&
        b.maxX >= a.minX &&
        b.maxY >= a.minY;
}

function createNode(children) {
    return {
        children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach
function multiSelect(arr, left, right, n, compare) {
    const stack = [left, right];

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        const mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);

        stack.push(left, mid, mid, right);
    }
}

function quickselect(arr, k, left, right, compare) {
    quickselectStep(arr, k, left || 0, right || (arr.length - 1), compare || defaultCompare);
};

function quickselectStep(arr, k, left, right, compare) {
    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselectStep(arr, k, newLeft, newRight, compare);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) { swap(arr, left, right); }

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) { i++; }
            while (compare(arr[j], t) > 0) { j--; }
        }

        if (compare(arr[left], t) === 0) { swap(arr, left, j); }
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) { left = j + 1; }
        if (k <= j) { right = j - 1; }
    }
};

function defaultCompare(a, b) {
    return (a.minX - b.minX) || (a.minY - b.minY) || (a.maxX - b.maxX) || (a.maxY - b.maxY);
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
};

// import { Test } from "../core/Test";

// Test.test("RBush", [
//     () => {
//         function sortedEqual(t, a, b, compare?) {
//             compare = compare || defaultCompare;
//             t.same(a.slice().sort(compare), b.slice().sort(compare));
//         }

//         function someData(n) {
//             const data = [];
//             for (let i = 0; i < n; i++) {
//                 data.push({ minX: i, minY: i, maxX: i, maxY: i });
//             }
//             return data;
//         }

//         function arrToBBox(arr) {
//             let minX = arr[0];
//             let minY = arr[1];
//             let maxX = arr[2];
//             let maxY = arr[3];
//             return { minX, minY, maxX, maxY };
//         }

//         const data = [[0, 0, 0, 0], [10, 10, 10, 10], [20, 20, 20, 20], [25, 0, 25, 0], [35, 10, 35, 10], [45, 20, 45, 20], [0, 25, 0, 25], [10, 35, 10, 35],
//         [20, 45, 20, 45], [25, 25, 25, 25], [35, 35, 35, 35], [45, 45, 45, 45], [50, 0, 50, 0], [60, 10, 60, 10], [70, 20, 70, 20], [75, 0, 75, 0],
//         [85, 10, 85, 10], [95, 20, 95, 20], [50, 25, 50, 25], [60, 35, 60, 35], [70, 45, 70, 45], [75, 25, 75, 25], [85, 35, 85, 35], [95, 45, 95, 45],
//         [0, 50, 0, 50], [10, 60, 10, 60], [20, 70, 20, 70], [25, 50, 25, 50], [35, 60, 35, 60], [45, 70, 45, 70], [0, 75, 0, 75], [10, 85, 10, 85],
//         [20, 95, 20, 95], [25, 75, 25, 75], [35, 85, 35, 85], [45, 95, 45, 95], [50, 50, 50, 50], [60, 60, 60, 60], [70, 70, 70, 70], [75, 50, 75, 50],
//         [85, 60, 85, 60], [95, 70, 95, 70], [50, 75, 50, 75], [60, 85, 60, 85], [70, 95, 70, 95], [75, 75, 75, 75], [85, 85, 85, 85], [95, 95, 95, 95]]
//             .map(arrToBBox);

//         const emptyData = [[-Infinity, -Infinity, Infinity, Infinity], [-Infinity, -Infinity, Infinity, Infinity],
//         [-Infinity, -Infinity, Infinity, Infinity], [-Infinity, -Infinity, Infinity, Infinity],
//         [-Infinity, -Infinity, Infinity, Infinity], [-Infinity, -Infinity, Infinity, Infinity]].map(arrToBBox);

//         // t('allows custom formats by overriding some methods', (t) => {
//         //     class MyRBush extends RBush {
//         //         toBBox(a) {
//         //             return {
//         //                 minX: a.minLng,
//         //                 minY: a.minLat,
//         //                 maxX: a.maxLng,
//         //                 maxY: a.maxLat
//         //             };
//         //         }
//         //         compareMinX(a, b) {
//         //             return a.minLng - b.minLng;
//         //         }
//         //         compareMinY(a, b) {
//         //             return a.minLat - b.minLat;
//         //         }
//         //     }
//         //     const tree = new MyRBush(4);
//         //     t.same(tree.toBBox({ minLng: 1, minLat: 2, maxLng: 3, maxLat: 4 }),
//         //         { minX: 1, minY: 2, maxX: 3, maxY: 4 });
//         //     t.end();
//         // });

//         // t('constructor uses 9 max entries by default', (t) => {
//         //     const tree = new RBush().load(someData(9));
//         //     t.equal(tree.toJSON().height, 1);

//         //     const tree2 = new RBush().load(someData(10));
//         //     t.equal(tree2.toJSON().height, 2);
//         //     t.end();
//         // });

//         // t('#toBBox, #compareMinX, #compareMinY can be overriden to allow custom data structures', (t) => {

//         //     const tree = new RBush(4);
//         //     tree.toBBox = item => ({
//         //         minX: item.minLng,
//         //         minY: item.minLat,
//         //         maxX: item.maxLng,
//         //         maxY: item.maxLat
//         //     });
//         //     tree.compareMinX = (a, b) => a.minLng - b.minLng;
//         //     tree.compareMinY = (a, b) => a.minLat - b.minLat;

//         //     const data = [
//         //         { minLng: -115, minLat: 45, maxLng: -105, maxLat: 55 },
//         //         { minLng: 105, minLat: 45, maxLng: 115, maxLat: 55 },
//         //         { minLng: 105, minLat: -55, maxLng: 115, maxLat: -45 },
//         //         { minLng: -115, minLat: -55, maxLng: -105, maxLat: -45 }
//         //     ];

//         //     tree.load(data);

//         //     function byLngLat(a, b) {
//         //         return a.minLng - b.minLng || a.minLat - b.minLat;
//         //     }

//         //     sortedEqual(t, tree.search({ minX: -180, minY: -90, maxX: 180, maxY: 90 }), [
//         //         { minLng: -115, minLat: 45, maxLng: -105, maxLat: 55 },
//         //         { minLng: 105, minLat: 45, maxLng: 115, maxLat: 55 },
//         //         { minLng: 105, minLat: -55, maxLng: 115, maxLat: -45 },
//         //         { minLng: -115, minLat: -55, maxLng: -105, maxLat: -45 }
//         //     ], byLngLat);

//         //     sortedEqual(t, tree.search({ minX: -180, minY: -90, maxX: 0, maxY: 90 }), [
//         //         { minLng: -115, minLat: 45, maxLng: -105, maxLat: 55 },
//         //         { minLng: -115, minLat: -55, maxLng: -105, maxLat: -45 }
//         //     ], byLngLat);

//         //     sortedEqual(t, tree.search({ minX: 0, minY: -90, maxX: 180, maxY: 90 }), [
//         //         { minLng: 105, minLat: 45, maxLng: 115, maxLat: 55 },
//         //         { minLng: 105, minLat: -55, maxLng: 115, maxLat: -45 }
//         //     ], byLngLat);

//         //     sortedEqual(t, tree.search({ minX: -180, minY: 0, maxX: 180, maxY: 90 }), [
//         //         { minLng: -115, minLat: 45, maxLng: -105, maxLat: 55 },
//         //         { minLng: 105, minLat: 45, maxLng: 115, maxLat: 55 }
//         //     ], byLngLat);

//         //     sortedEqual(t, tree.search({ minX: -180, minY: -90, maxX: 180, maxY: 0 }), [
//         //         { minLng: 105, minLat: -55, maxLng: 115, maxLat: -45 },
//         //         { minLng: -115, minLat: -55, maxLng: -105, maxLat: -45 }
//         //     ], byLngLat);

//         //     t.end();
//         // });

//         // t('#load bulk-loads the given data given max node entries and forms a proper search tree', (t) => {

//         //     const tree = new RBush(4).load(data);
//         //     sortedEqual(t, tree.all(), data);

//         //     t.end();
//         // });

//         // t('#load uses standard insertion when given a low number of items', (t) => {

//         //     const tree = new RBush(8)
//         //         .load(data)
//         //         .load(data.slice(0, 3));

//         //     const tree2 = new RBush(8)
//         //         .load(data)
//         //         .insert(data[0])
//         //         .insert(data[1])
//         //         .insert(data[2]);

//         //     t.same(tree.toJSON(), tree2.toJSON());
//         //     t.end();
//         // });

//         // t('#load does nothing if loading empty data', (t) => {
//         //     const tree = new RBush().load([]);

//         //     t.same(tree.toJSON(), new RBush().toJSON());
//         //     t.end();
//         // });

//         // t('#load handles the insertion of maxEntries + 2 empty bboxes', (t) => {
//         //     const tree = new RBush(4)
//         //         .load(emptyData);

//         //     t.equal(tree.toJSON().height, 2);
//         //     sortedEqual(t, tree.all(), emptyData);

//         //     t.end();
//         // });

//         // t('#insert handles the insertion of maxEntries + 2 empty bboxes', (t) => {
//         //     const tree = new RBush(4);

//         //     emptyData.forEach((datum) => {
//         //         tree.insert(datum);
//         //     });

//         //     t.equal(tree.toJSON().height, 2);
//         //     sortedEqual(t, tree.all(), emptyData);
//         //     t.equal(tree.data.children[0].children.length, 4);
//         //     t.equal(tree.data.children[1].children.length, 2);

//         //     t.end();
//         // });

//         // t('#load properly splits tree root when merging trees of the same height', (t) => {
//         //     const tree = new RBush(4)
//         //         .load(data)
//         //         .load(data);

//         //     t.equal(tree.toJSON().height, 4);
//         //     sortedEqual(t, tree.all(), data.concat(data));

//         //     t.end();
//         // });

//         // t('#load properly merges data of smaller or bigger tree heights', (t) => {
//         //     const smaller = someData(10);

//         //     const tree1 = new RBush(4)
//         //         .load(data)
//         //         .load(smaller);

//         //     const tree2 = new RBush(4)
//         //         .load(smaller)
//         //         .load(data);

//         //     t.equal(tree1.toJSON().height, tree2.toJSON().height);

//         //     sortedEqual(t, tree1.all(), data.concat(smaller));
//         //     sortedEqual(t, tree2.all(), data.concat(smaller));

//         //     t.end();
//         // });

//         // t('#search finds matching points in the tree given a bbox', (t) => {

//         //     const tree = new RBush(4).load(data);
//         //     const result = tree.search({ minX: 40, minY: 20, maxX: 80, maxY: 70 });

//         //     sortedEqual(t, result, [
//         //         [70, 20, 70, 20], [75, 25, 75, 25], [45, 45, 45, 45], [50, 50, 50, 50], [60, 60, 60, 60], [70, 70, 70, 70],
//         //         [45, 20, 45, 20], [45, 70, 45, 70], [75, 50, 75, 50], [50, 25, 50, 25], [60, 35, 60, 35], [70, 45, 70, 45]
//         //     ].map(arrToBBox));

//         //     t.end();
//         // });

//         // t('#collides returns true when search finds matching points', (t) => {

//         //     const tree = new RBush(4).load(data);
//         //     const result = tree.collides({ minX: 40, minY: 20, maxX: 80, maxY: 70 });

//         //     t.same(result, true);

//         //     t.end();
//         // });

//         // t('#search returns an empty array if nothing found', (t) => {
//         //     const result = new RBush(4).load(data).search([200, 200, 210, 210]);

//         //     t.same(result, []);
//         //     t.end();
//         // });

//         // t('#collides returns false if nothing found', (t) => {
//         //     const result = new RBush(4).load(data).collides([200, 200, 210, 210]);

//         //     t.same(result, false);
//         //     t.end();
//         // });

//         // t('#all returns all points in the tree', (t) => {

//         //     const tree = new RBush(4).load(data);
//         //     const result = tree.all();

//         //     sortedEqual(t, result, data);
//         //     sortedEqual(t, tree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 }), data);

//         //     t.end();
//         // });

//         // t('#toJSON & #fromJSON exports and imports search tree in JSON format', (t) => {

//         //     const tree = new RBush(4).load(data);
//         //     const tree2 = new RBush(4).fromJSON(tree.data);

//         //     sortedEqual(t, tree.all(), tree2.all());
//         //     t.end();
//         // });

//         // t('#insert adds an item to an existing tree correctly', (t) => {
//         //     const items = [
//         //         [0, 0, 0, 0],
//         //         [1, 1, 1, 1],
//         //         [2, 2, 2, 2],
//         //         [3, 3, 3, 3],
//         //         [1, 1, 2, 2]
//         //     ].map(arrToBBox);

//         //     const tree = new RBush(4).load(items.slice(0, 3));

//         //     tree.insert(items[3]);
//         //     t.equal(tree.toJSON().height, 1);
//         //     sortedEqual(t, tree.all(), items.slice(0, 4));

//         //     tree.insert(items[4]);
//         //     t.equal(tree.toJSON().height, 2);
//         //     sortedEqual(t, tree.all(), items);

//         //     t.end();
//         // });

//         // t('#insert does nothing if given undefined', (t) => {
//         //     t.same(
//         //         new RBush().load(data),
//         //         new RBush().load(data).insert());
//         //     t.end();
//         // });

//         // t('#insert forms a valid tree if items are inserted one by one', (t) => {
//         //     const tree = new RBush(4);

//         //     for (let i = 0; i < data.length; i++) {
//         //         tree.insert(data[i]);
//         //     }

//         //     const tree2 = new RBush(4).load(data);

//         //     t.ok(tree.toJSON().height - tree2.toJSON().height <= 1);

//         //     sortedEqual(t, tree.all(), tree2.all());
//         //     t.end();
//         // });

//         // t('#remove removes items correctly', (t) => {
//         //     const tree = new RBush(4).load(data);

//         //     const len = data.length;

//         //     tree.remove(data[0]);
//         //     tree.remove(data[1]);
//         //     tree.remove(data[2]);

//         //     tree.remove(data[len - 1]);
//         //     tree.remove(data[len - 2]);
//         //     tree.remove(data[len - 3]);

//         //     sortedEqual(t,
//         //         data.slice(3, len - 3),
//         //         tree.all());
//         //     t.end();
//         // });
//         // t('#remove does nothing if nothing found', (t) => {
//         //     t.same(
//         //         new RBush().load(data),
//         //         new RBush().load(data).remove([13, 13, 13, 13]));
//         //     t.end();
//         // });
//         // t('#remove does nothing if given undefined', (t) => {
//         //     t.same(
//         //         new RBush().load(data),
//         //         new RBush().load(data).remove());
//         //     t.end();
//         // });
//         // t('#remove brings the tree to a clear state when removing everything one by one', (t) => {
//         //     const tree = new RBush(4).load(data);

//         //     for (let i = 0; i < data.length; i++) {
//         //         tree.remove(data[i]);
//         //     }

//         //     t.same(tree.toJSON(), new RBush(4).toJSON());
//         //     t.end();
//         // });
//         // t('#remove accepts an equals function', (t) => {
//         //     const tree = new RBush(4).load(data);

//         //     const item = { minX: 20, minY: 70, maxX: 20, maxY: 70, foo: 'bar' };

//         //     tree.insert(item);
//         //     tree.remove(JSON.parse(JSON.stringify(item)), (a, b) => a.foo === b.foo);

//         //     sortedEqual(t, tree.all(), data);
//         //     t.end();
//         // });

//         // t('#clear should clear all the data in the tree', (t) => {
//         //     t.same(
//         //         new RBush(4).load(data).clear().toJSON(),
//         //         new RBush(4).toJSON());
//         //     t.end();
//         // });

//         // t('should have chainable API', (t) => {
//         //     t.doesNotThrow(() => {
//         //         new RBush()
//         //             .load(data)
//         //             .insert(data[0])
//         //             .remove(data[0]);
//         //     });
//         //     t.end();
//         // });
//     }
// ]);