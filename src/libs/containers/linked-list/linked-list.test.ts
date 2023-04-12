import {describe, expect, test} from '@jest/globals';
import {LinkedList} from './index'
import exp = require("constants");

describe('LinkedList', () => {

    test('constructor()', () => {
        const list = new LinkedList();
        expect(list.last).toBeNull();
        expect(list.root).toBeNull();
        expect(list.is_empty()).toBeTruthy();
    })

    test('constructor() with initial data', () => {
        const list = new LinkedList('some', 'data');
        expect(list.last).not.toBeNull();
        expect(list.root).not.toBeNull();
        expect(list.is_empty()).not.toBeTruthy();
        expect(list.length).toBe(2);
    })

    test('push_back() a single item', () => {
        const list = new LinkedList();
        list.push_back("1");
        expect(list.length).toBe(1);
        expect(list.root.data).toBe("1");
        expect(list.last.data).toBe("1");
    })

    test('push_back() multiple items', () => {
        const list = new LinkedList();
        list.push_back("1", "2", "3");
        expect(list.length).toBe(3);
        expect(list.root.data).toBe("1");
        expect(list.root.next.data).toBe("2");
        expect(list.root.next.next.data).toBe("3");
        expect(list.last.data).toBe("3");
    })

    test('push_back() twice', () => {
        const list = new LinkedList();

        list.push_back("1", "2");
        const last = list.last;
        expect(last.data).toBe("2");

        list.push_back("3");
        expect(list.last).not.toBe(last);
        expect(list.last.data).toBe("3");
    })

    test('push_back() empty array', () => {
        const list = new LinkedList();
        list.push_back();
        expect(list.length).toBe(0);
        expect(list.root).toBe(null);
        expect(list.last).toBe(null);
    })

    test('to_string() for empty list', () => {
        const list = new LinkedList();
        expect(list.to_string()).toBe("[empty list]")
    })

    test('to_string() for a single item list', () => {
        const list = new LinkedList();
        list.push_back("root");
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

    test('get length()', () => {
        const list = new LinkedList();
        expect(list.length).toBe(0);
        list.push_back('1', '2', '3');
        expect(list.length).toBe(3);
        list.clear();
        expect(list.length).toBe(0);
    })

    test('at()', () => {
        const list = new LinkedList('1', '2', '3');
        expect(list.at(0).data).toBe("1");
        expect(list.at(1).data).toBe("2");
        expect(list.at(2).data).toBe("3");
    })

    test('at() out of bounds', () => {
        const list = new LinkedList('1', '2', '3');
        expect(() => list.at(-1)).toThrow();
        expect(() => list.at(3)).toThrow();
    })

    test('remove_at() first item', () => {
        const list = new LinkedList('1', '2', '3');
        list.remove_at(0);
        expect(list.length).toBe(2);
        expect(list.root.data).toBe("2");
    })

    test('remove_at() last item', () => {
        const list = new LinkedList('1', '2', '3');
        list.remove_at(2);
        expect(list.length).toBe(2);
    })

    test('remove_at() out of bounds', () => {
        const list = new LinkedList('1', '2', '3');
        expect(() => list.remove_at(-1)).toThrow();
        expect(() => list.remove_at(3)).toThrow();
    })

    test('insert_at() in the middle', () => {
        const list = new LinkedList('1', '2', '4', '5');
        list.insert_at('3', 2);
        expect(list.root.next.next.data).toBe('3');
        expect(list.root.next.next.next.data).toBe('4');
    })

    test('insert_at() at index 0', () => {
        const list = new LinkedList('1', '2', '4', '5');
        list.insert_at('0', 0);
        expect(list.root.data).toBe("0")
    })

    test('insert_at() at index length-1', () => {
        const list = new LinkedList('1', '2', '4', '5');
        list.insert_at('4.5', list.length - 1);
        expect(list.last.data).toBe("5")
    })

    test('insert_at() out of bounds', () => {
        const list = new LinkedList('1', '2', '4', '5');
        expect( () => list.insert_at('fddsds', list.length) ).toThrow();
        expect( () => list.insert_at('sdsd', list.length + 42) ).toThrow();
        expect( () => list.insert_at('sdsd', -1) ).toThrow();
    })

    test('values() empty', () => {
        const list = new LinkedList();
        expect(list.values()).toStrictEqual([]);
    })

    test('values()', () => {
        const list = new LinkedList('1', '2', '3');
        expect(list.values()).toStrictEqual(['1', '2', '3']);
    })

    test('iterate on values()', () => {
        const data = ['1', '2', '3'];
        const list = new LinkedList(...data);
        let index = 0;
        for(let each_data of list.values()) {
            expect(each_data).toBe(data[index++])
        }
        expect.assertions(data.length)
    })

    test('iterate on entries()', () => {
        const data = ['1', '2', '3'];
        const list = new LinkedList(...data);
        let index = 0;
        for(let each_item of list.entries()) {
            expect(each_item.data).toBe(data[index++])
        }
        expect.assertions(data.length)
    })

    test('iterate on entries() with no items', () => {
        const list = new LinkedList();
        for(let each_item of list.entries()) {
            expect(each_item.data).toBeDefined();
        }
        expect.assertions(0)
    })
})