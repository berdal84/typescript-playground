import { LinkedList } from './linked-list'

describe('LinkedList', () => {

    test('constructor', () => {
        const ll = new LinkedList();
        expect(ll.last).toBeNull();
        expect(ll.root).toBeNull();
        expect(ll.is_empty()).toBeTruthy();
    })

    test('push() single item', () => {
        const ll = new LinkedList();
        ll.push("1");
        expect(ll.length).toBe(1);
        expect(ll.root.data).toBe("1");
        expect(ll.last.data).toBe("1");
    })

    test('push() multi item', () => {
        const ll = new LinkedList();
        ll.push("1", "2", "3");
        expect(ll.length).toBe(3);
        expect(ll.root.data).toBe("1");
        expect(ll.root.next.data).toBe("2");
        expect(ll.root.next.next.data).toBe("3");
        expect(ll.last.data).toBe("3");
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
        ll.push("1");
        ll.push("2");
        ll.push("3");
        expect(ll.to_string()).toBe("[1 -> 2 -> 3]")
    })

    test('clear()', () => {
        const ll = new LinkedList();
        ll.push("1");
        ll.push("2");
        ll.push("3");
        expect(ll.is_empty()).toBe(false);
        ll.clear();
        expect(ll.is_empty()).toBe(true);
    })

    test('length()', () => {
        const ll = new LinkedList();
        expect(ll.length).toBe(0);
        ll.push("1");
        ll.push("2");
        ll.push("3");
        expect(ll.length).toBe(3);
        ll.clear();
        expect(ll.length).toBe(0);
    })
})