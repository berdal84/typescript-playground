/**
 * Simple object to wrap a data and connected edges
 */
export interface IVertex<Props = any> {
    props: Props;
    edge: IEdge[];
    type?: string; // to differentiate nodes later
}

/**
 * Directed edge between two nodes, can hold data.
 */
export interface IEdge<Props = any> {
    vertex: [IVertex, IVertex];
    props: Props;
}

/**
 * Directed Graph formed by nodes and edges holding data (resp. NodeProps and EdgeProps type)
 *
 * TODO:
 *  - Speedup edge search (store edges ref in nodes too? Use an adjacency matrix?)
 *  - Write a traversal method/class (visitor? callback like in forEach and map?)
 *  - ...
 */
export class DGraph<
    VertexProps extends Record<string, any>,
    EdgeProps extends Record<string, any>> {

    private readonly _vertex: Set<IVertex<VertexProps>>;
    private readonly _edges: Set<IEdge<EdgeProps>>;

    constructor() {
        this._vertex = new Set<IVertex<VertexProps>>();
        this._edges = new Set<IEdge<EdgeProps>>();
    }

    is_empty(): boolean {
        if (this._vertex.size === 0) {
            if (this._edges.size !== 0) throw new Error("Incoherence, graph has no nodes but contains some edges");
            return true;
        }
        return false;
    }

    /**
     * Check if a given vertex is orphan.
     */
    is_orphan(vertex: IVertex): boolean {
        return vertex.edge.length === 0;
    }

    /**
     * Create a new vertex in the graph
     * @param props
     */
    create_node(props: VertexProps): IVertex<VertexProps> {
        const vertex: IVertex = {
            props: props,
            edge: []
        };
        this._vertex.add(vertex);
        return vertex;
    }

    /**
     * Remove a vertex that belongs to this graph.
     * Any edge connected to it will be disconnected.
     */
    remove_node(vertex: IVertex): void {
        if (!this._vertex.has(vertex)) throw new Error(`The vertex ${JSON.stringify(vertex)} does not belong to this graph`)
        // disconnect any related edge
        for (let edge of this._edges) {
            if (edge.vertex[0] == vertex || edge.vertex[1] == vertex) this.disconnect(edge);
        }
        this._vertex.delete(vertex);
    }

    /**
     * Create a directed edge between a and b with a type (data) associated
     * The two nodes must belong to this graph.
     * Two vertex cannot have two directed edges (even with different data).
     */
    connect(a: IVertex, b: IVertex, props: EdgeProps): IEdge<EdgeProps> {
        if (!this._vertex.has(a)) throw new Error(`The vertex ${JSON.stringify(a)} does not belong to this graph`)
        if (!this._vertex.has(b)) throw new Error(`The vertex ${JSON.stringify(b)} does not belong to this graph`)
        // Ensure this edge does not already exists
        // edge.type is not considered when checking for duplicates
        for (let each_edge of this._edges) {
            if (each_edge.vertex[0] == a && each_edge.vertex[1] == b) throw new Error(`An edge connected to the same nodes already exists ${JSON.stringify(each_edge)}`)
        }
        const edge: IEdge<EdgeProps> = {
            props,
            vertex: [a, b]
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
        this._vertex.clear();
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
    get vertex() {
        return [...this._vertex];
    }
}