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
            let [left, right] = split(arr);
            // sort each of them
            left = merge_sort_implem(left);
            right = merge_sort_implem(right);
            // merge sorted arrays
            return merge(left, right);
    }
}

/**
 * Split a given array into two arrays
 * when array size is odd, the first array is bigger, if not their size are identical.
 * @param arr
 */
function split<T>(arr: T[]): [T[], T[]] {
    const index_to_cut = Math.ceil( arr.length / 2 );
    const left = arr.slice(0, index_to_cut);
    const right = arr.slice(index_to_cut);
    return [left, right];
}

/**
 * Merge two sorted arrays into a single sorted array
 */
function merge<T>(left: T[], right: T[]): T[] {
    const sorted_result = new Array<T>();

    // create two cursors to advance in both arrays
    let left_cursor = 0, right_cursor = 0;
    // while we didn't reach the end of each arrays...
    while( left_cursor !== left.length || right_cursor !== right.length) {
        // if the right cursor reached the end of the array,
        // or if the left item is not greater that the right
        if( right_cursor === right.length || left[left_cursor] <= right[right_cursor]) {
            // push the left item to the sorted array
            sorted_result.push(left[left_cursor]);
            left_cursor++;
        } else {
            // push the right item to the sorted array
            sorted_result.push(right[right_cursor]);
            right_cursor++;
        }
    }
    return sorted_result;
}