

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
import { concat } from 'fp-ts/lib/ReadonlyNonEmptyArray';

// Arrays
/////////

// makeBy
{
    const dozen = (n: number): number => n * 12
    const ten_dozen = array.makeBy(10, dozen);
    console.log("makeBy(10, dozen): ", ten_dozen);
}

// pipe and filter
{
    const data: number[] = [1,1,2,2,2,4,4,4,9];
    const even: Predicate<number> = (n) => n % 2 == 0;
    const even_numbers = pipe(
        data,
        array.filter( even )
    );
    console.log("even numbers: ", even_numbers);
}

// concat
{
    const data: number[] = array.makeBy(10, (i) => i);
    const odds: Predicate<number> = (n) => n % 2 == 1;
    const odds_concat = pipe(
        data,
        array.filter( odds ),
        concat([11,11,11,11,11,11]),
        concat([99,99,99,99,99,99]),
    );
    console.log("even numbers: ", odds_concat);
}