import { LinkedList } from '@shared';

console.log('-- program begin --');

const ll = new LinkedList<string>();

ll.push('First item');
ll.push('Second');
ll.push('Third');

console.log( ll.to_string() );

console.log('-- program end --');