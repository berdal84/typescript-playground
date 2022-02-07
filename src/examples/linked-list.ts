import { LinkedList } from '../classes/linked-list'; // TODO: add a root path in ts-config.json

console.log('-- program begin --');

const ll = new LinkedList<string>();

ll.push('First item');
ll.push('Second');
ll.push('Third');

ll.log();

console.log('-- program end --');