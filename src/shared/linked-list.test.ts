import { LinkedList } from './linked-list'

describe('LinkedList', () => {

    test('constructor', () => {
        const ll = new LinkedList();
        expect(ll.last).toBeNull();
        expect(ll.root).toBeNull();
        expect(ll.is_empty()).toBeTruthy();
    })

    test('to_string() for empty list', () => {
        const ll = new LinkedList();
        expect(ll.to_string()).toBe("[empty list]")
    })

    test('to_string() for a single item list', () => {
        const ll = new LinkedList();
        ll.push("root");
        expect(ll.to_string()).toBe("[root]")
    })

    test('to_string() for a 3-length item list', () => {
        const ll = new LinkedList();
        ll.push("root");
        ll.push("item");
        ll.push("last");
        expect(ll.to_string()).toBe("[root -> item -> last]")
    })

    test('clear()', () => {
        const ll = new LinkedList();
        ll.push("root");
        ll.push("item");
        ll.push("last");
        expect(ll.is_empty()).toBe(false);
        ll.clear();
        expect(ll.is_empty()).toBe(true);
    })
})