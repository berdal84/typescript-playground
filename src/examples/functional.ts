

// This file contains some example of usage of the fp-ts library
//
// "Typed functional programming in TypeScript
// fp-ts provides developers with popular patterns and reliable abstractions
// from typed functional languages in TypeScript. [..] " 
//
// See https://gcanti.github.io/fp-ts/


// Arrays
import { makeBy } from 'fp-ts/Array'

const dozen = (n: number): number => n * 12
const dozens = makeBy(10, dozen);
console.log("makeBy(10, dozen): ", dozens);
