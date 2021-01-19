export declare class cu_Adapter {
    /**
     * 游戏屏幕适配
     */
    static adapterScreen(): void;
    /**
     * 是否为刘海屏幕
     */
    static isNotch(): boolean;
    /**
     * 调整刘海屏
     * @param nodes 待调整的节点
     * @param offsetY
     */
    static adapterNotch: (nodes?: any[], offsetY?: number) => void;
}
