import {describe, expect, test} from '@jest/globals';
import {DGraph, IVertex} from "./dgraph";
import exp = require("constants");

describe('DirectedGraph', () => {

    type NodeProps = {
        name: string;
    }
    type EdgeProps = {
        nature: string;
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
        const edge = graph.connect(a, b, { nature: "is parent"});
        expect(graph.is_empty()).toBe(false);
        expect(graph.edges[0].props.nature).toBe("is parent")
    })

    test('connect() an unknown vertex', () => {
        const a: IVertex<NodeProps> = { edge: [], props: { name: "a"}};
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

        expect(graph.vertex).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    })

    test('is_orphan()', () => {
        const orphan_node = graph.create_node({ name: 'Mr. Alone'});
        expect(graph.is_orphan(orphan_node)).toBe(true);
        orphan_node.edge.push({} as any);
        expect(graph.is_orphan(orphan_node)).toBe(false);
    })
})