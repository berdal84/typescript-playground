/**
 * Simple object to wrap a data and connected edges
 */
export interface IVertex<Props = any> {
    props: Props;
    edge: Set<IEdge>;
    type?: string; // to differentiate nodes later
}

/**
 * Directed edge between two nodes, can hold data.
 */
export interface IEdge<Props = any> {
    vertex: [IVertex, IVertex];
    props: Props;
}

type RequiredEdgeProps = {
    type: 'parent' | 'next'
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
    EdgeProps extends Record<string, any> & RequiredEdgeProps> {

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
        return vertex.edge.size === 0;
    }

    /**
     * Create a new vertex in the graph
     * @param props
     */
    create_node(props: VertexProps): IVertex<VertexProps> {
        const vertex: IVertex = {
            props: props,
            edge: new Set<IEdge>()
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
    connect(from: IVertex, to: IVertex, props: EdgeProps): IEdge<EdgeProps> {
        if (!this._vertex.has(from)) throw new Error(`The vertex ${JSON.stringify(from)} does not belong to this graph`)
        if (!this._vertex.has(to)) throw new Error(`The vertex ${JSON.stringify(to)} does not belong to this graph`)
        // Ensure this edge does not already exists
        // edge.type is not considered when checking for duplicates
        for (let each_edge of this._edges) {
            if (each_edge.vertex[0] == from && each_edge.vertex[1] == to) throw new Error(`An edge connected to the same nodes already exists ${JSON.stringify(each_edge)}`)
        }
        const edge: IEdge<EdgeProps> = {
            props,
            vertex: [from, to]
        }
        this._edges.add(edge);
        from.edge.add(edge);
        to.edge.add(edge)
        return edge;
    }

    /**
     * Disconnect a given edge
     * @param edge an edge that should exist in the graph
     */
    disconnect(edge: IEdge): void {
        if (!this._edges.has(edge)) throw new Error(`Unable to find this edge in the graph`)
        this._edges.delete(edge);
        edge.vertex.forEach( vertex => vertex.edge.delete(edge))
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

    /**
     * Traverse the graph from a given vertex and following edges under certain conditions defined by can_traverse_edge.
     * @param vertex  the vertex to start the traversal from
     * @param can_traverse_edge a function returning true if a given edge must be traversed and false otherwise
     * @param max_iteration number of times the traversal algorithm will be executed, also correspond to the max count of edges that can be traversed.
     * @returns the last visited vertex or null if no edge have been traversed.
     *          Note: You could get the input vertex as a return in case there is a loop in the graph.
     */
    traverse(vertex: IVertex, can_traverse_edge: (edge: IEdge<EdgeProps>) => boolean, max_iteration: number): IVertex | null {
        let current_vtx = vertex;
        const traversed_edges: Array<IEdge> = [];

        while( max_iteration !== 0 ) {
            let next_edge_found: IEdge = null;
            // find the next edge
            for (const edge of current_vtx.edge) {
                // outgoing and not traversed and matches user defined filter
                if (edge.vertex[0] === current_vtx && !traversed_edges.includes(edge) && can_traverse_edge(edge)) {
                    next_edge_found = edge;
                    break;
                }
            }
            // In case we have no next edge, we can stop to iterate
            if (!next_edge_found) break;
            // If not, we store the edge in the stack and prepare next iteration
            traversed_edges.push(next_edge_found);
            current_vtx = next_edge_found.vertex[1];
            max_iteration--;
        }
        // return the last edge's destination vertex or null if none.
        const last_edge = traversed_edges.pop();
        if(!last_edge) return null;
        return last_edge.vertex[1];
    }
}