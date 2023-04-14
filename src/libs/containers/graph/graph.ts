/**
 * Simple object to wrap a data
 */
export type node<T = any> = {
    data: T;
}

/**
 * Directed edge between two nodes, can hold data.
 */
export type edge<T = any, E = undefined> = {
    /** The two nodes connected by this edge */
    node: [node<T>, node<T>];
    /** Optional data to qualify this edge */
    type: E;
}

/**
 * Graph formed by nodes and edges holding data of respectively T and E type.
 *
 * TODO:
 *  - Speedup edge search (store edges ref in nodes too? Use an adjacency matrix?)
 *  - Write a traversal method/class (visitor? callback like in forEach and map?)
 *  - ...
 */
export class Graph<T = any, E = undefined> {
    private readonly _nodes: Set<node<T>>;
    private readonly _edges: Set<edge<T, E>>;

    constructor() {
        this._nodes = new Set<node<T>>();
        this._edges = new Set<edge<T, E>>();
    }

    is_empty(): boolean {
        if(this._nodes.size === 0) {
            if(this._edges.size !== 0) throw new Error("Incoherence, graph has no nodes but contains some edges");
            return true;
        }
        return false;
    }

    /**
     * Check if a given node is orphan.
     */
    is_orphan(node: node<T>): boolean {
        throw new Error("Not implemented yet")
    }

    /**
     * Create a new node in the graph
     * @param data to associate to the node
     */
    create_node(data: T): node<T> {
        const node: node<T> = { data };
        this._nodes.add(node);
        return node;
    }

    /**
     * Remove a node that belongs to this graph.
     * Any edge connected to it will be disconnected.
     */
    remove_node(node: node<T>): void {
        if(!this._nodes.has(node)) throw new Error(`The node ${JSON.stringify(node)} does not belong to this graph`)
        // disconnect any related edge
        for(let edge of this._edges) {
            if(edge.node[0] == node || edge.node[1] == node) this.disconnect(edge);
        }
        this._nodes.delete(node);
    }

    /**
     * Create a directed edge between a and b with a type (data) associated
     * The two nodes must belong to this graph.
     * Two node cannot have two directed edges (even with different data).
     */
    connect(a: node<T>, b: node<T>, type: E): edge<T, E> {
        if(!this._nodes.has(a)) throw new Error(`The node ${JSON.stringify(a)} does not belong to this graph`)
        if(!this._nodes.has(b)) throw new Error(`The node ${JSON.stringify(b)} does not belong to this graph`)
        // Ensure this edge does not already exists
        // edge.type is not considered when checking for duplicates
        for(let each_edge of this._edges) {
            if(each_edge.node[0] == a && each_edge.node[1] == b) throw new Error(`An edge connected to the same nodes already exists ${JSON.stringify(each_edge)}`)
        }
        const edge: edge<T, E> = {
            node: [a, b],
            type
        }
        this._edges.add(edge);
        return edge;
    }

    /**
     * Disconnect a given edge
     * @param edge an edge that should exist in the graph
     */
    disconnect(edge: edge<T, E>): void {
        if(!this._edges.has(edge)) throw new Error(`Unable to find this edge in the graph`)
        this._edges.delete(edge);
    }

    /**
     * Clear the graph (delete nodes, delete and disconnect all edges)
     */
    clear(): void {
        this.edges.forEach( edge => this.disconnect(edge) );
        this._edges.clear();
        this._nodes.clear();
    }

    /**
     * To iterate over all the edges
     */
    get edges(): edge<T, E>[] {
        return [...this._edges];
    }

    /**
     * To iterate over all the nodes
     */
    get nodes(): node<T>[] {
        return [...this._nodes];
    }
}