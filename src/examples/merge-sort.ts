import {merge_sort} from "../libs/sorting/merge-sort";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(
    'Enter a list of numbers separated by a coma, we will sort it for you:\n>>> ',
    (inputString: string) => {
    // to store not number input strings
    const not_numbers: string[] = [];

    // convert input string to number[]
    const unsorted = inputString.trim().split(',').map(string => {
        const n = Number(string);
        if(isNaN(n)) not_numbers.push(string);
        return n;
    });

    // abort if not numbers are found
    if(not_numbers.length) {
        throw new Error(`Those items are not numbers "${JSON.stringify(not_numbers)}"`)
    }

    process.stdout.write(`You entered: ${JSON.stringify(unsorted)}\n`);
    console.log(`Sorting ...`);

    const sorted = merge_sort(unsorted);

    process.stdout.write(`Sorting DONE: `);
    process.stdout.write(`${JSON.stringify(sorted)}\n`);
    readline.close();
});
