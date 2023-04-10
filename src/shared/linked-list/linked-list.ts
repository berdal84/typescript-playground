import { LinkedItem } from "./linked-item";

export class LinkedList<T> {

    // Ref to the first item
    root: LinkedItem<T>;
    // Ref to the last item
    last: LinkedItem<T>;
    // Cache length instead of having to count each time length() is called
    private _length;

    constructor(){
        this.root = null;
        this.last = null;
        this._length = 0;
    }

    /**
     * Push a data in the linked list.
     * The data will be stored in an item linked to the last item.
     * @param data
     */
    push(...data: T[]) {
        data.forEach(_data => {
            const newItem = new LinkedItem<T>(_data);

            if( this.root ) {
                this.last.next = newItem;
            } else {
                this.root = newItem;
            }

            this.last = newItem;
        })

        this._length += data.length;
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
        this._length = 0;
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

    /**
     * Get the item count in this list
     */
    get length(): number {
        return this._length;
    }

    /**
     * Get the nth element
     */
    at(index: number): T {
        if( index < 0 || index >= this._length ) throw new Error(`Index out of bounds`)
        let cursor = 0;
        let item = this.root;
        while( index != cursor) {
            item = item.next;
            cursor++;
        }
        return item.data;
    }
}