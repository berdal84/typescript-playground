/**
 * Merge sort algorithm, complexity is O(n log(n))
 * @see https://en.wikipedia.org/wiki/Merge_sort
 * @param arr an array to sort
 * @returns a sorted array (may be the same reference if array is empty or small and sorted)
 */
export function merge_sort<T>(arr: T[]): T[] {
    // Check the argument, this function is the public one and
    // could be called from JS
    if(!arr) throw new Error("arr must be a valid array")
    // call the type-safe implementation
    return merge_sort_implem(arr);
}

/**
 * Implementation of the merge sort
 * @param arr
 */
function merge_sort_implem<T>(arr: T[]): T[] {
    switch (arr.length) {
        case 0:
        case 1:
            // nothing to do, we just pass the reference as-is
            return arr;
        case 2:
            // sort the array by comparing the two elements
            // we pass the reference as-is if array is sorted
            return arr[0] <= arr[1] ? arr : [ arr[1], arr[0] ];
        default:
            // split array in two
            // sort each of them
            // merge sorted arrays
            throw new Error("Not implemented yet")
    }
}