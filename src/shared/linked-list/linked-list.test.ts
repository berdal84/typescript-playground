import {describe, expect, test} from '@jest/globals';
import { LinkedList } from '.'
import exp = require("constants");

describe('LinkedList', () => {

    test('constructor', () => {
        const list = new LinkedList();
        expect(list.last).toBeNull();
        expect(list.root).toBeNull();
        expect(list.is_empty()).toBeTruthy();
    })

    test('constructor with initial data', () => {
        const list = new LinkedList('some', 'data');
        expect(list.last).not.toBeNull();
        expect(list.root).not.toBeNull();
        expect(list.is_empty()).not.toBeTruthy();
        expect(list.length).toBe(2);
    })

    test('push() single item', () => {
        const list = new LinkedList();
        list.push("1");
        expect(list.length).toBe(1);
        expect(list.root.data).toBe("1");
        expect(list.last.data).toBe("1");
    })

    test('push() multi item', () => {
        const list = new LinkedList();
        list.push("1", "2", "3");
        expect(list.length).toBe(3);
        expect(list.root.data).toBe("1");
        expect(list.root.next.data).toBe("2");
        expect(list.root.next.next.data).toBe("3");
        expect(list.last.data).toBe("3");
    })

    test('to_string() for empty list', () => {
        const list = new LinkedList();
        expect(list.to_string()).toBe("[empty list]")
    })

    test('to_string() for a single item list', () => {
        const list = new LinkedList();
        list.push("root");
        expect(list.to_string()).toBe("[root]")
    })

    test('to_string() for a 3-length item list', () => {
        const list = new LinkedList('1', '2', '3');
        expect(list.to_string()).toBe("[1 -> 2 -> 3]")
    })

    test('clear()', () => {
        const list = new LinkedList('1', '2', '3');
        expect(list.is_empty()).toBe(false);
        list.clear();
        expect(list.is_empty()).toBe(true);
    })

    test('length()', () => {
        const list = new LinkedList();
        expect(list.length).toBe(0);
        list.push('1', '2', '3');
        expect(list.length).toBe(3);
        list.clear();
        expect(list.length).toBe(0);
    })

    test('at()', () => {
        const list = new LinkedList('1', '2', '3');
        expect(list.at(0)).toBe("1");
        expect(list.at(1)).toBe("2");
        expect(list.at(2)).toBe("3");
        expect(() => list.at(-1)).toThrow();
        expect(() => list.at(3)).toThrow();
    })

    test('remove() first item', () => {
        const list = new LinkedList('1', '2', '3');
        list.remove(0);
        expect(list.length).toBe(2);
        expect(list.at(0)).toBe("2");
    })

    test('remove() last item', () => {
        const list = new LinkedList('1', '2', '3');
        list.remove(2);
        expect(list.length).toBe(2);
    })

    test('remove() out of bounds', () => {
        const list = new LinkedList('1', '2', '3');
        expect(()=>list.remove(-1)).toThrow();
        expect(()=>list.remove(3)).toThrow();
    })

    test('insert_at()', ()  => {
        const list =  new  LinkedList('1', '2',  '4', '5');
        list.insert_at('3', 2);
        expect(list.at(2)).toBe('3');
        expect(list.at(3)).toBe('4');

    })
})