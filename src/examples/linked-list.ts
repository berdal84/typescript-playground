import { LinkedList } from '@shared';

console.log('-- program begin --');

const list = new LinkedList<string>();

list.push('First');
list.push('Second');
list.push('Third');

console.log( list.to_string() );

console.log('-- program end --');