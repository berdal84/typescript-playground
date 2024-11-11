import {LinkedItem} from "./linked-item";

export class LinkedList<T> {

    // Ref to the first item
    root: LinkedItem<T> | null;
    // Ref to the last item
    last: LinkedItem<T> | null;
    // Cache length instead of having to count each time length() is called
    private _length;

    constructor(...data: T[]) {
        const chain = LinkedList._make_chain(data);
        this._length = chain.length;

        if (chain.length > 0) {
            this.root = chain[0];
            this.last = chain[chain.length-1];
        } else {
            this.root = null;
            this.last = null;
        }
    }

    /**
     * Push data at the back of in the linked list.
     * The data will be stored in an item linked to the last item.
     * @param data
     */
    push_back(...data: T[]) {
        if (data.length === 0) return;

        const new_items = LinkedList._make_chain(data);

        // update length
        this._length += new_items.length;

        // Connect existing items with new_items
        if (this.last) {
            this.last.next = new_items[0];
        } else if (!this.root) {
            this.root = new_items[0];
        }

        // update last item
        this.last = new_items[new_items.length - 1];
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
    clear() {
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
        if (this.is_empty()) return '[empty list]';

        let result = '[';

        let current_item = this.root;
        while ( current_item ) {
            if ( current_item != this.root ) {
                result += ' -> ';
            }
            result += current_item.data;
            current_item = current_item.next;
        }

        result += ']';

        return result;
    }

    /**
     * Get the item count in this list
     * Complexity is O(1)
     */
    get length(): number {
        return this._length;
    }

    /**
     * Get the nth element
     * Complexity is O(n).
     */
    at(index: number): LinkedItem<T> | never {
        if (index < 0 || index >= this._length) throw new Error(`Index out of bounds`)
        let cursor = 0;
        let item = this.root;
        while (index != cursor) {
            if ( !item )
                break;
            item = item.next;
            cursor++;
        }
        if (!item)
            throw new Error('Out of bounds');
        return item;
    }

    /**
     * Remove the nth element
     * Complexity is O(n)
     * @param index
     */
    remove_at(index: number) {
        if (index < 0) throw new Error("negative index are not allowed")
        if (index >= this._length) throw new Error("Index  out of bounds")

        // If deletes the first item
        if (index === 0) {
            if ( !this.root ) {
                return;
            }
            const new_root = this.root.next;
            this.root.next = null;
            this.root = new_root;
            
        } else {
            // if deletes any other item
            const item_before = this.at(index - 1);
            if ( !item_before )
                return;
            const item_to_delete = item_before.next;
            if ( !item_to_delete )
                return;
            item_before.next = item_to_delete.next;
        }
        this._length--;
    }

    /**
     * Insert a data at a given index
     * @param data
     * @param index
     */
    insert_at(data: T, index: number) {
        if (index < 0) throw new Error("negative index are not allowed")
        if (index >= this._length) throw new Error("index out of bounds")
        const newItem = new LinkedItem(data);
        // Handle the specific case when we insert at the beginning of the list
        if (index === 0) {
            newItem.next = this.root;
            this.root = newItem;
        } else {
            const previous = this.at(index - 1);
            if (!previous)
                return;
            newItem.next = previous.next;
            previous.next = newItem;
        }
    }

    /**
     * get an iterable array of linked list data
     */
    values(): Iterable<T> {
        if (this._length === 0) return [];

        const result = new Array<T>(this._length);
        let current_item = this.root;
        let current_index = 0;
        while ( current_item && current_index < this._length) {
            result[current_index] = current_item.data;
            current_item = current_item.next;
            current_index++;
        }
        return result;
    }

    /**
     * get an iterable array of linked list data
     */
    entries(): Iterable<LinkedItem<T>> {
        if (this._length === 0) return [];

        const result = new Array<LinkedItem<T>>(this._length);
        let current_item = this.root;
        let current_index = 0;
        while (current_item && current_index < this._length) {
            result[current_index] = current_item;
            current_item = current_item.next;
            current_index++;
        }
        return result;
    }

    /**
     * Create chained items from some data
     * @param data
     * @private
     */
    private static _make_chain<T>(data: T[]) {
        // to track the last item
        let previous_item: LinkedItem<T> | null = null;

        // create one linked item per data
        return data.map((each_data, index) => {
            const new_item = new LinkedItem<T>(each_data);
            if (previous_item) previous_item.next = new_item; // link previous item to this new_item
            previous_item = new_item;
            return new_item;
        });
    }
}