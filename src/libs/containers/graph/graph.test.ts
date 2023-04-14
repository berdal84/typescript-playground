import {describe, expect, test} from '@jest/globals';
import {Graph} from "./graph";

describe('Graph', () => {

    test('constructor()', () => {
        const graph = new Graph<string, string>();
        expect(graph.edges).toStrictEqual([]);
        expect(graph.nodes).toStrictEqual([]);
    })

    test('is_empty()', () => {
        const graph = new Graph<string, string>();
        expect(graph.is_empty()).toBe(true);
    })

    test('create_node()', () => {
        const graph = new Graph<string, string>();
        graph.create_node("test");
        expect(graph.is_empty()).toBe(false);
        expect(graph.nodes).toStrictEqual([{data: "test"}]);
    })

    test('remove_node()', () => {
        const graph = new Graph<string, string>();
        const a = graph.create_node("a");
        expect(graph.is_empty()).toBe(false);
        graph.remove_node(a);
        expect(graph.is_empty()).toBe(true);
    })

    test('connect()', () => {
        const graph = new Graph<string, string>();
        const a = graph.create_node("a");
        const b = graph.create_node("b");
        const edge = graph.connect(a, b, "edge");
        expect(graph.is_empty()).toBe(false);
        expect(graph.nodes).toStrictEqual([{data: "a"},{data: "b"}] satisfies typeof graph.nodes);
        expect(graph.edges).toStrictEqual([{node: [{data: "a"},{data: "b"}], type: "edge"}] satisfies typeof graph.edges);
    })

    test('connect() an unknown node', () => {
        const graph = new Graph<string, string>();
        const a = { data: "a"};
        const b = graph.create_node("b");
        expect( () => { graph.connect(a, b, "edge") }).toThrow();
    })

    test('connect() two times the same nodes', () => {
        const graph = new Graph<string, string>();
        const a = graph.create_node("a");
        const b = graph.create_node("b");
        graph.connect(a, b, "edge");
        expect( () => { graph.connect(a, b, "edge") }).toThrow();
    })

    test('disconnect()', () => {
        const graph = new Graph<string, string>();
        const a = graph.create_node("a");
        const b = graph.create_node("b");
        const edge = graph.connect(a, b, "edge");
        expect(graph.edges).not.toStrictEqual([]);
        graph.disconnect(edge);
        expect(graph.nodes).toStrictEqual([{data: "a"},{data: "b"}] satisfies typeof graph.nodes);
        expect(graph.edges).toStrictEqual([]);
    })

    test('clear()', () => {
        const graph = new Graph<string, string>();
        const a = graph.create_node("a");
        const b = graph.create_node("b");
        const edge = graph.connect(a, b, "edge");

        graph.clear();

        expect(graph.nodes).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    })
})