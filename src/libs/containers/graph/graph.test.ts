import {describe, expect, test} from '@jest/globals';
import {Graph, INode} from "./graph";
import exp = require("constants");

describe('Graph', () => {

    type NodeProps = {
        name: string;
    }
    type EdgeProps = {
        nature: string;
    };
    let graph: Graph<NodeProps, EdgeProps>;

    beforeEach( () =>  {
        graph =  new Graph<NodeProps, EdgeProps>();
    })

    test('constructor()', () => {
        expect(graph.edges).toStrictEqual([]);
        expect(graph.nodes).toStrictEqual([]);
    })

    test('is_empty()', () => {
        expect(graph.is_empty()).toBe(true);
    })

    test('create_node()', () => {
        graph.create_node({ name: "test" });
        expect(graph.is_empty()).toBe(false);
        expect(graph.nodes[0].props.name).toStrictEqual("test");
    })

    test('remove_node()', () => {
        const a = graph.create_node({ name: "a"});
        expect(graph.is_empty()).toBe(false);
        graph.remove_node(a);
        expect(graph.is_empty()).toBe(true);
    })

    test('connect()', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});
        const edge = graph.connect(a, b, { nature: "is parent"});
        expect(graph.is_empty()).toBe(false);
        expect(graph.edges[0].props.nature).toBe("is parent")
    })

    test('connect() an unknown node', () => {
        const a: INode<NodeProps> = { edge: [], props: { name: "a"}};
        const b = graph.create_node({name: "b"});
        expect( () => { graph.connect(a, b, { nature: "ancestor" }) }).toThrow();
    })

    test('connect() two times the same nodes', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});
        graph.connect(a, b, { nature: "next"});
        expect( () => { graph.connect(a, b, { nature: "next again"}) }).toThrow();
    })

    test('disconnect()', () => {
        const a = graph.create_node({ name: "a" });
        const b = graph.create_node({ name:  "b"});
        const edge = graph.connect(a, b, { nature: "parent"});
        expect(graph.edges).not.toStrictEqual([]);
        graph.disconnect(edge);
        expect(graph.edges).toStrictEqual([]);
    })

    test('clear()', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});

        graph.connect(a, b, { nature: "edge" });
        graph.clear();

        expect(graph.nodes).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    })

    test('is_orphan()', () => {
        const orphan_node = graph.create_node({ name: 'Mr. Alone'});
        expect(graph.is_orphan(orphan_node)).toBe(true);
        orphan_node.edge.push({} as any);
        expect(graph.is_orphan(orphan_node)).toBe(false);
    })
})