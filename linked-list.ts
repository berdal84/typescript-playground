
/**
 * This is an exercise.
 * 
 * Simple piece of code to implement a Linked list in typescript
 * 
 * How to run:
 * 
 * compile using tsc: `tsc *.ts`
 * and run using node `node linked-list.ts`
 */

export class Item<T>{

    next: Item<T>;
    data: T;

    constructor(_data: T){
        this.data = _data;
    }
}

export class LinkedList<T> {

    root: Item<T>;
    last: Item<T>;

    constructor(){
        console.log('LinkedList well created.');
    }

    push(_data: T) {
        const newItem = new Item<T>(_data);

        if( this.root ) {            
            this.last.next = newItem;
        } else {
            this.root = newItem;
        }

        this.last = newItem;        
    }

    empty(){
        delete this.root;
        this.root = undefined;
        this.last = undefined;
    }

    log(): void {

        let result = '';
        let currentItem = this.root;

        if ( currentItem ) {
            result += '[';
            result += currentItem.data;
            while( currentItem.next ) {
                result += ' -> ';
                currentItem = currentItem.next;
                result += currentItem.data;
            }
            result += ']';
        } else {
            result = '[empty list]'
        }

        console.log(result);
    }

}

console.log('-- program begin --');

const ll = new LinkedList<string>();

ll.push('Premier mot');
ll.push('Second');
ll.push('Troisième');

ll.log();

console.log('-- program end --');