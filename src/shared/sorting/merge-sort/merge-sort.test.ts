import {describe, expect, test, jest} from '@jest/globals';
import {merge_sort} from "./merge-sort";
import {shuffle} from "./shuffle";
import {range} from "./range";

describe('merge_sort', () => {

    test('should sort an empty array', () => {
        expect( () => merge_sort([])).not.toThrow();
        expect(merge_sort([])).toStrictEqual([]);
    })

    test('should throw when called with an undefined array', () => {
        expect(() => merge_sort(undefined as any)).toThrow();
    })

    test('should throw when called with a null array', () => {
        expect(() => merge_sort(null as any)).toThrow();
    })

    test('should sort a 1-sized array', () => {
        expect(merge_sort([42])).toStrictEqual([42]);
    })

    test('should sort a 2-sized array', () => {
        expect(merge_sort([4,2])).toStrictEqual([2,4]);
        expect(merge_sort([2,4])).toStrictEqual([2,4]);
    })

    test('should sort a 3-sized array', () => {
        expect(merge_sort([2,7,1])).toStrictEqual([1,2,7]);
    })

    test('should sort a 4-sized array', () => {
        expect(merge_sort([4,2,7,1])).toStrictEqual([1,2,4,7]);
    })

    test('should sort negative numbers', () => {
        expect(merge_sort([-4, -11, -42])).toStrictEqual([-42, -11, -4]);
    })

    test('should sort 2048-sized arrays (positive nb)', () => {
        const ordered = range(1, 2048)
        const unordered = shuffle([...ordered]);
        expect(merge_sort(unordered)).toStrictEqual(ordered);
    })

    test('should sort 2048-sized arrays (both negative an positive nb)', () => {
        const ordered = range(-1023, 1024);
        const unordered = shuffle([...ordered]);
        expect(merge_sort(unordered)).toStrictEqual(ordered);
    })
})