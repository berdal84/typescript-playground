import {describe, expect, test} from '@jest/globals';
import { LinkedList } from './linked-list'

describe('LinkedList', () => {

    test('constructor', () => {
        const list = new LinkedList();
        expect(list.last).toBeNull();
        expect(list.root).toBeNull();
        expect(list.is_empty()).toBeTruthy();
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
        const list = new LinkedList();
        list.push("1");
        list.push("2");
        list.push("3");
        expect(list.to_string()).toBe("[1 -> 2 -> 3]")
    })

    test('clear()', () => {
        const list = new LinkedList();
        list.push("1");
        list.push("2");
        list.push("3");
        expect(list.is_empty()).toBe(false);
        list.clear();
        expect(list.is_empty()).toBe(true);
    })

    test('length()', () => {
        const list = new LinkedList();
        expect(list.length).toBe(0);
        list.push("1");
        list.push("2");
        list.push("3");
        expect(list.length).toBe(3);
        list.clear();
        expect(list.length).toBe(0);
    })
})