
/**
 * This is an exercise.
 * 
 * Simple piece of code to implement a Linked list in typescript
 */

/**
 * The items able to carry a data and be chained
 */
export class Item<T>{

    next: Item<T>;
    data: T;

    constructor(_data: T){
        this.data = _data;
        this.next = null;
    }
}

export class LinkedList<T> {

    root: Item<T>;
    last: Item<T>;

    constructor(){
        this.root = null;
        this.last = null;
        console.log("LinkedList<T>()");
    }

    /**
     * Push a data in the linked list.
     * The data will be stored in an item linked to the last item.
     * @param _data
     */
    push(_data: T) {
        const newItem = new Item<T>(_data);

        if( this.root ) {            
            this.last.next = newItem;
        } else {
            this.root = newItem;
        }

        this.last = newItem;        
    }

    /**
     * Returns true if the linked list is empty, false otherwise.
     */
    is_empty(): boolean {
        return this.root === null;
    }

    /**
     * Empty this linked list
     */
    clear(){
        delete this.root;
        this.root = null;
        this.last = null;
    }

    /**
     * Convert this linked list to a pretty string to print.
     * @returns example: "[ root -> next -> next -> last ]", or if is_empty() returns "[empty list]"
     */
    to_string(): string {

        // early return when list is empty
        if(this.is_empty()) return '[empty list]';

        let result = '';
        let currentItem = this.root;
        result += '[';
        result += currentItem.data;
        while( currentItem.next ) {
            result += ' -> ';
            currentItem = currentItem.next;
            result += currentItem.data;
        }
        result += ']';

        return result;
    }

}