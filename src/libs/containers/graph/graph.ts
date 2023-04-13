/**
 * Simple object to wrap a data
 */
export type node<T = any> = {
    data: T;
}

/**
 * Relation between two nodes, can hold data.
 */
export type edge<T = any, E = undefined> = {
    /** The two nodes connected by this edge */
    node: [node<T>, node<T>];
    /** Optional data to qualify this edge */
    data: E;
}

/**
 * Graph formed by nodes and edges holding data of respectively T and E type.
 */
export class Graph<T = any, E = undefined> {
    private readonly _nodes: Set<node<T>>;
    private readonly _edges: Set<edge<T, E>>;

    constructor() {
        this._nodes = new Set<node<T>>();
        this._edges = new Set<edge<T, E>>();
    }

    is_orphan(node: node<T>): boolean {
        throw new Error("Not implemented yet")
    }

    create_node(data: T): node<T> {
        throw new Error("Not implemented yet")
    }

    remove_node(node: node<T>): node<T> {
        throw new Error("Not implemented yet")
    }

    connect(a: node<T>, b: node<T>, type: E): edge<T, E> {
        throw new Error("Not implemented yet")
    }

    disconnect(edge: edge<T, E>): void {
        throw new Error("Not implemented yet")
    }

    clear(): void {
        throw new Error("Not implemented yet")
    }

    get edges(): edge<T, E>[] {
        return [...this._edges];
    }

    get nodes(): node<T>[] {
        return [...this._nodes];
    }
}