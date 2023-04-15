import {describe, expect, test} from '@jest/globals';
import {DGraph, IEdge, IVertex} from "./dgraph";
import exp = require("constants");

describe('DirectedGraph', () => {

    type NodeProps = {
        name: string;
    }
    type EdgeProps = {
        type: 'parent' | 'next';
    };
    let graph: DGraph<NodeProps, EdgeProps>;

    beforeEach( () =>  {
        graph =  new DGraph<NodeProps, EdgeProps>();
    })

    test('constructor()', () => {
        expect(graph.edges).toStrictEqual([]);
        expect(graph.vertex).toStrictEqual([]);
    })

    test('is_empty()', () => {
        expect(graph.is_empty()).toBe(true);
    })

    test('create_node()', () => {
        graph.create_node({ name: "test" });
        expect(graph.is_empty()).toBe(false);
        expect(graph.vertex[0].props.name).toStrictEqual("test");
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
        const edge = graph.connect(a, b, { type: "parent"});
        expect(graph.is_empty()).toBe(false);
        expect(graph.edges[0].props.type).toBe("parent")
    })

    test('connect() an unknown vertex', () => {
        const a: IVertex<NodeProps> = { edge: new Set<IEdge>(), props: { name: "a"}};
        const b = graph.create_node({name: "b"});
        expect( () => { graph.connect(a, b, { type: "next" }) }).toThrow();
    })

    test('connect() two times the same nodes', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});
        graph.connect(a, b, { type: "next"});
        expect( () => { graph.connect(a, b, { type: "next"}) }).toThrow();
    })

    test('disconnect()', () => {
        const a = graph.create_node({ name: "a" });
        const b = graph.create_node({ name:  "b"});
        const edge = graph.connect(a, b, { type: "parent"});
        expect(graph.edges).not.toStrictEqual([]);
        graph.disconnect(edge);
        expect(graph.edges).toStrictEqual([]);
    })

    test('clear()', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});

        graph.connect(a, b, { type: "parent" });
        graph.clear();

        expect(graph.vertex).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    })

    test('is_orphan()', () => {
        const orphan_node = graph.create_node({ name: 'Mr. Alone'});
        expect(graph.is_orphan(orphan_node)).toBe(true);
        orphan_node.edge.add({} as any);
        expect(graph.is_orphan(orphan_node)).toBe(false);
    })

    test('traverse() 1 iteration', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});
        graph.connect(a, b, { type: "next" });
        const  get_next = (edge: IEdge<EdgeProps>) => edge.props.type === 'next';
        expect(graph.traverse(a, get_next, 1)).toEqual(b);
        expect(graph.traverse(b, get_next, 1)).toEqual(null);
    })

    test('traverse() 2 iterations', () => {
        const a = graph.create_node({ name: "a"});
        const b = graph.create_node({ name: "b"});
        const c = graph.create_node({ name: "c"});

        graph.connect(a, b, { type: "next" });
        graph.connect(b, c, { type: "next" });

        const  get_next = (edge: IEdge<EdgeProps>) => edge.props.type === 'next';

        expect(graph.traverse(a, get_next, 2)).toEqual(c);
        expect(graph.traverse(b, get_next, 2)).toEqual(c);
        expect(graph.traverse(c, get_next, 2)).toEqual(null);
    })
})