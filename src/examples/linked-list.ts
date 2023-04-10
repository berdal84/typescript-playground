import { LinkedList } from '@shared';

console.log('-- program begin --');

const list = new LinkedList<string>();

list.push('First');
list.push('Second');
list.push('Third');

console.log( list.to_string() );
console.log(`The second element is: ${list.at(1)}`)
console.log(`removing it...`)
list.remove(1);
console.log(`The second element is: ${list.at(1)}`)

console.log('-- program end --');