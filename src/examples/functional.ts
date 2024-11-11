

// This file contains some example of usage of the fp-ts library
//
// "Typed functional programming in TypeScript
// fp-ts provides developers with popular patterns and reliable abstractions
// from typed functional languages in TypeScript. [..] " 
//
// See https://gcanti.github.io/fp-ts/


import { number } from 'fp-ts';
import { array } from 'fp-ts';
import { some } from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import { Predicate } from 'fp-ts/lib/Predicate';

// Arrays
/////////

// makeBy
const dozen = (n: number): number => n * 12
const ten_dozen = array.makeBy(10, dozen);
console.log("makeBy(10, dozen): ", ten_dozen);

// pipe and filter
const data: number[] = [1,1,2,2,2,4,4,4,9];
const even: Predicate<number> = (n) => n % 2 == 0;
const even_numbers = pipe(
    data,
    array.filter( even )
);
console.log("even numbers: ", even_numbers);