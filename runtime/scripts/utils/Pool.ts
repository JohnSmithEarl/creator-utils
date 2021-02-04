export class Pool {
    prefab: cc.Prefab = null;
    component: any = null;

    initNum: number = 1;

    pool: any = null;

    constructor(prefab: cc.Prefab, component: any, initNum: number) {
        this.prefab = prefab;
        this.component = component;
        this.initNum = initNum;

        this.pool = new cc.NodePool();

        this.init();
    }

    private init(): void {
        for (let i = 0; i < this.initNum; i++) {
            let node = this.createNode();
            this.pool.put(node);
        }
    }

    private createNode(): cc.Node {
        let node = cc.instantiate(this.prefab);
        let component: any = node.getComponent(this.component);
        if (component && typeof component.reuse == "function") {
            component.reuse();
        }
        return node;
    }

    public clear() {
        this.pool.clear();
    }

    public get(): cc.Node {
        let node = this.pool.get() || null;
        if (!node) {
            node = this.createNode();
        }
        return node;
    }

    public put(node: cc.Node): void {
        this.pool.put(node);
    }
};