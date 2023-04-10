import {LinkedList} from '@shared';

console.log('-- program begin --');

const list = new LinkedList<string>('first', 'second', 'third');
console.log(list.to_string());
console.log(`The second element is: ${list.at(1)}`)
console.log(`removing it...`)
list.remove_at(1);
console.log(`The second element is: ${list.at(1)}`)

console.log('-- program end --');