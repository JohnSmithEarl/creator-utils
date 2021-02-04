import { Dictionary } from "./Dictionary";
import { Queue } from "./Queue";

let COLORS = {
    WHITE: 0, // 未处理的图节点
    GREY: 1, // 待处理的图节点
    BLACK: 2 // 已处理的图节点
};

/**
 * 图
 */
export class Graph {
    protected isDirected: boolean = false;
    protected vertices: Array<any> = null;
    protected adjList: Dictionary = null;

    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = []; // 用来存放图中的顶点
        this.adjList = new Dictionary(); // 用来存放图中的边
    }

    // 向图中添加一个新顶点
    public addVertex(v: any): void {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    // 向图中添加a和b两个顶点之间的边
    public addEdge(a: any, b: any): void {
        // 如果图中没有顶点a，先添加顶点a
        if (!this.adjList.has(a)) {
            this.addVertex(a);
        }
        // 如果图中没有顶点b，先添加顶点b
        if (!this.adjList.has(b)) {
            this.addVertex(b);
        }

        this.adjList.get(a).push(b); // 在顶点a中添加指向顶点b的边
        if (this.isDirected !== true) {
            this.adjList.get(b).push(a); // 如果为无向图，则在顶点b中添加指向顶点a的边
        }
    }

    // 获取图的vertices
    public getVertices(): Array<any> {
        return this.vertices;
    }

    // 获取图中的adjList
    public getAdjList(): Dictionary {
        return this.adjList;
    }

    public toString(): string {
        let s = '';
        this.vertices.forEach((v) => {
            s += `${v} -> `;
            this.adjList.get(v).forEach((n) => {
                s += `${n} `;
            });
            s += '\n';
        });
        return s;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////     遍历      ////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @description 广度优先遍历
     * @param graph
     * @param startVertex
     * @param handler
     */
    public static breadthFirstTraversal(graph: Graph, startVertex: any, handler: Function) {
        let vertices = graph.getVertices();
        let adjList = graph.getAdjList();
        let color = {};
        vertices.forEach(v => color[v] = COLORS.WHITE);
        let queue = new Queue();

        queue.enqueue(startVertex);

        while (!queue.isEmpty()) {
            let u = queue.dequeue();
            adjList.get(u).forEach(n => {
                if (color[n] === COLORS.WHITE) {
                    color[n] = COLORS.GREY;
                    queue.enqueue(n);
                }
            });
            color[u] = COLORS.BLACK;
            if (handler) {
                handler(u);
            }
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////     搜索 - 广度优先 /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 广度优先算法
     * @param graph
     * @param startVertex
     */
    public static breadthFirstSearchPath(graph: Graph, startVertex: any) {
        let vertices = graph.getVertices();
        let adjList = graph.getAdjList();
        let color = {};
        vertices.forEach(v => color[v] = COLORS.WHITE);
        let queue = new Queue();
        let distances = {};
        let predecessors = {};

        queue.enqueue(startVertex);

        // 初始化所有顶点的距离为0，前置节点为null
        vertices.forEach(v => {
            distances[v] = 0;
            predecessors[v] = null;
        });

        while (!queue.isEmpty()) {
            let u = queue.dequeue();
            adjList.get(u).forEach(n => {
                if (color[n] === COLORS.WHITE) {
                    color[n] = COLORS.GREY;
                    distances[n] = distances[u] + 1;
                    predecessors[n] = u;
                    queue.enqueue(n);
                }
            });

            color[u] = COLORS.BLACK;
        }

        return { distances, predecessors };
    };

    // Dijkstra - 寻找从指定顶点到其它所有顶点的最短路径的贪心算法。
    //
    // const INF = Number.MAX_SAFE_INTEGER;
    // const minDistance = (dist, visited) => {
    //     let min = INF;
    //     let minIndex = -1;
    //     for (let v = 0; v < dist.length; v++) {
    //         if (visited[v] === false && dist[v] <= min) {
    //             min = dist[v];
    //             minIndex = v;
    //         }
    //     }
    //     return minIndex;
    // };
    // const dijkstra = (graph, src) => {
    //     const dist = [];
    //     const visited = [];
    //     const { length } = graph;
    //     for (let i = 0; i < length; i++) {
    //         dist[i] = INF;
    //         visited[i] = false;
    //     }
    //     dist[src] = 0;
    //     for (let i = 0; i < length - 1; i++) {
    //         const u = minDistance(dist, visited);
    //         visited[u] = true;
    //         for (let v = 0; v < length; v++) {
    //             if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
    //                 dist[v] = dist[u] + graph[u][v];
    //             }
    //         }
    //     }
    //     return dist;
    // };

    // Floyd-Warshall - 计算图中所有最短路径的动态规划算法。
    //
    // const floydWarshall = graph => {
    //     const dist = [];
    //     const { length } = graph;
    //     for (let i = 0; i < length; i++) {
    //         dist[i] = [];
    //         for (let j = 0; j < length; j++) {
    //             if (i === j) {
    //                 dist[i][j] = 0;
    //             } else if (!isFinite(graph[i][j])) {
    //                 dist[i][j] = Infinity;
    //             } else {
    //                 dist[i][j] = graph[i][j];
    //             }
    //         }
    //     }
    //     for (let k = 0; k < length; k++) {
    //         for (let i = 0; i < length; i++) {
    //             for (let j = 0; j < length; j++) {
    //                 if (dist[i][k] + dist[k][j] < dist[i][j]) {
    //                     dist[i][j] = dist[i][k] + dist[k][j];
    //                 }
    //             }
    //         }
    //     }
    //     return dist;
    // };

    // Kruskal - 求解加权无向连通图的最小生成树（MST）的贪心算法。
    //
    // const INF = Number.MAX_SAFE_INTEGER;
    // const find = (i, parent) => {
    //   while (parent[i]) {
    //     i = parent[i]; // eslint-disable-line prefer-destructuring
    //   }
    //   return i;
    // };
    // const union = (i, j, parent) => {
    //   if (i !== j) {
    //     parent[j] = i;
    //     return true;
    //   }
    //   return false;
    // };
    // const initializeCost = graph => {
    //   const cost = [];
    //   const { length } = graph;
    //   for (let i = 0; i < length; i++) {
    //     cost[i] = [];
    //     for (let j = 0; j < length; j++) {
    //       if (graph[i][j] === 0) {
    //         cost[i][j] = INF;
    //       } else {
    //         cost[i][j] = graph[i][j];
    //       }
    //     }
    //   }
    //   return cost;
    // };
    // const kruskal = graph => {
    //   const { length } = graph;
    //   const parent = [];
    //   let ne = 0;
    //   let a;
    //   let b;
    //   let u;
    //   let v;
    //   const cost = initializeCost(graph);
    //   while (ne < length - 1) {
    //     for (let i = 0, min = INF; i < length; i++) {
    //       for (let j = 0; j < length; j++) {
    //         if (cost[i][j] < min) {
    //           min = cost[i][j];
    //           a = u = i;
    //           b = v = j;
    //         }
    //       }
    //     }
    //     u = find(u, parent);
    //     v = find(v, parent);
    //     if (union(u, v, parent)) {
    //       ne++;
    //     }
    //     cost[a][b] = cost[b][a] = INF;
    //   }
    //   return parent;
    // };


    // Prime - 求解加权无向连通图的最小生成树（MST）的贪心算法。
    //
    // const INF = Number.MAX_SAFE_INTEGER;
    // const minKey = (graph, key, visited) => {
    //     // Initialize min value
    //     let min = INF;
    //     let minIndex = 0;
    //     for (let v = 0; v < graph.length; v++) {
    //         if (visited[v] === false && key[v] < min) {
    //             min = key[v];
    //             minIndex = v;
    //         }
    //     }
    //     return minIndex;
    // };
    // const prim = graph => {
    //     const parent = [];
    //     const key = [];
    //     const visited = [];
    //     const { length } = graph;
    //     for (let i = 0; i < length; i++) {
    //         key[i] = INF;
    //         visited[i] = false;
    //     }
    //     key[0] = 0;
    //     parent[0] = -1;
    //     for (let i = 0; i < length - 1; i++) {
    //         const u = minKey(graph, key, visited);
    //         visited[u] = true;
    //         for (let v = 0; v < length; v++) {
    //             if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
    //                 parent[v] = u;
    //                 key[v] = graph[u][v];
    //             }
    //         }
    //     }
    //     return parent;
    // };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////     搜索 - 广度优先 /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 深度优先
     */
    // let depthFirstSearchVisit = (u, color, adjList, callback) => {
    //     color[u] = Colors.GREY;
    //     if (callback) callback(u);

    //     adjList.get(u).forEach(n => {
    //         if (color[n] === Colors.WHITE) {
    //             depthFirstSearchVisit(n, color, adjList, callback);
    //         }
    //     });

    //     color[u] = Colors.BLACK;
    // };

    // let depthFirstSearch = (graph, callback) => {
    //     let vertices = graph.getVertices();
    //     let adjList = graph.getAdjList();
    //     let color = initializeColor(vertices);

    //     vertices.forEach(v => {
    //         if (color[v] === Colors.WHITE) {
    //             depthFirstSearchVisit(v, color, adjList, callback);
    //         }
    //     });
    // };

    // 拓扑排序
    //
    // let DFSVisit = (u, color, discovery, finished, predecessors, time, adjList) => {
    //     color[u] = Colors.GREY;
    //     discovery[u] = ++time.count;

    //     adjList.get(u).forEach(n => {
    //         if (color[n] === Colors.WHITE) {
    //             predecessors[n] = u;
    //             DFSVisit(n, color, discovery, finished, predecessors, time, adjList);
    //         }
    //     });

    //     color[u] = Colors.BLACK;
    //     finished[u] = ++time.count;
    // };

    // let DFS = graph => {
    //     let vertices = graph.getVertices();
    //     let adjList = graph.getAdjList();
    //     let color = initializeColor(vertices);
    //     let discovery = {};
    //     let finished = {};
    //     let predecessors = {};
    //     let time = { count: 0 };

    //     vertices.forEach(v => {
    //         finished[v] = 0;
    //         discovery[v] = 0;
    //         predecessors[v] = null;
    //     });

    //     vertices.forEach(v => {
    //         if (color[v] === Colors.WHITE) {
    //             DFSVisit(v, color, discovery, finished, predecessors, time, adjList);
    //         }
    //     });

    //     return {discovery, finished, predecessors};
    // };
};

export let test = function () {
    let graph = new Graph();
    let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    myVertices.forEach((v) => {
        graph.addVertex(v);
    });
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('E', 'I');

    console.log(graph.toString());

    console.log("\n\n 广度优先遍历");
    Graph.breadthFirstTraversal(graph, 'A', (value: any) => console.log(`visited vertex: ${value}`));
}