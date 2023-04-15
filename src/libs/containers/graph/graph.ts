/**
 * Simple object to wrap a data and connected edges
 */
export interface INode<Props = any> {
    props: Props;
    edge: IEdge[];
    type?: string; // to differentiate nodes later
}

/**
 * Directed edge between two nodes, can hold data.
 */
export interface IEdge<Props = any> {
    node: [INode, INode];
    props: Props;
}

/**
 * Graph formed by nodes and edges holding data of respectively T and E type.
 *
 * TODO:
 *  - Speedup edge search (store edges ref in nodes too? Use an adjacency matrix?)
 *  - Write a traversal method/class (visitor? callback like in forEach and map?)
 *  - ...
 */
export class Graph<NodeProps extends Record<string, any>,
    EdgeProps extends Record<string, any>> {

    private readonly _nodes: Set<INode<NodeProps>>;
    private readonly _edges: Set<IEdge<EdgeProps>>;

    constructor() {
        this._nodes = new Set<INode<NodeProps>>();
        this._edges = new Set<IEdge<EdgeProps>>();
    }

    is_empty(): boolean {
        if (this._nodes.size === 0) {
            if (this._edges.size !== 0) throw new Error("Incoherence, graph has no nodes but contains some edges");
            return true;
        }
        return false;
    }

    /**
     * Check if a given node is orphan.
     */
    is_orphan(node: INode): boolean {
        return node.edge.length === 0;
    }

    /**
     * Create a new node in the graph
     * @param props
     */
    create_node(props: NodeProps): INode<NodeProps> {
        const node: INode = {
            props: props,
            edge: []
        };
        this._nodes.add(node);
        return node;
    }

    /**
     * Remove a node that belongs to this graph.
     * Any edge connected to it will be disconnected.
     */
    remove_node(node: INode): void {
        if (!this._nodes.has(node)) throw new Error(`The node ${JSON.stringify(node)} does not belong to this graph`)
        // disconnect any related edge
        for (let edge of this._edges) {
            if (edge.node[0] == node || edge.node[1] == node) this.disconnect(edge);
        }
        this._nodes.delete(node);
    }

    /**
     * Create a directed edge between a and b with a type (data) associated
     * The two nodes must belong to this graph.
     * Two node cannot have two directed edges (even with different data).
     */
    connect(a: INode, b: INode, props: EdgeProps): IEdge<EdgeProps> {
        if (!this._nodes.has(a)) throw new Error(`The node ${JSON.stringify(a)} does not belong to this graph`)
        if (!this._nodes.has(b)) throw new Error(`The node ${JSON.stringify(b)} does not belong to this graph`)
        // Ensure this edge does not already exists
        // edge.type is not considered when checking for duplicates
        for (let each_edge of this._edges) {
            if (each_edge.node[0] == a && each_edge.node[1] == b) throw new Error(`An edge connected to the same nodes already exists ${JSON.stringify(each_edge)}`)
        }
        const edge: IEdge<EdgeProps> = {
            props,
            node: [a, b]
        }
        this._edges.add(edge);
        return edge;
    }

    /**
     * Disconnect a given edge
     * @param edge an edge that should exist in the graph
     */
    disconnect(edge: IEdge): void {
        if (!this._edges.has(edge)) throw new Error(`Unable to find this edge in the graph`)
        this._edges.delete(edge);
    }

    /**
     * Clear the graph (delete nodes, delete and disconnect all edges)
     */
    clear(): void {
        this.edges.forEach(edge => this.disconnect(edge));
        this._edges.clear();
        this._nodes.clear();
    }

    /**
     * To iterate over all the edges
     */
    get edges() {
        return [...this._edges];
    }

    /**
     * To iterate over all the nodes
     */
    get nodes() {
        return [...this._nodes];
    }
}