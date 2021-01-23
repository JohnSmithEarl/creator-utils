import { UDictionary } from "./UDictionary";

class UGraph {
    protected isDirected: boolean = false;
    protected vertices: Array<any> = null;
    protected adjList: UDictionary = null;

    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = []; // 用来存放图中的顶点
        this.adjList = new UDictionary(); // 用来存放图中的边
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
    public getAdjList(): UDictionary {
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
}

export let test = function () {
    let graph = new UGraph();
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
}