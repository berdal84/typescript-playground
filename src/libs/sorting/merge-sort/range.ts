/**
 * Utility function to generate an array [n,...,m]
 */
export function range(min: number, max: number): number[] {
    if(min > max) throw new Error('min should be smaller or equal to max')
    const result = new Array(max - min + 1);
    result.fill(0);
    result.forEach( ((value, index, array) => {
        array[index] = min + index;
    }))
    return result;
}