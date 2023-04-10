import {LinkedItem} from "./linked-item";

export class LinkedList<T> {

    // Ref to the first item
    root: LinkedItem<T>;
    // Ref to the last item
    last: LinkedItem<T>;
    // Cache length instead of having to count each time length() is called
    private _length;

    constructor(...data: T[]) {
        this.root = null;
        this.last = null;
        this._length = 0;

        if (data.length > 0) this.push_back(...data);
    }

    /**
     * Push data at the back of in the linked list.
     * The data will be stored in an item linked to the last item.
     * @param data
     */
    push_back(...data: T[]) {
        if( data.length === 0) return;

        const new_items = LinkedList._make_chain(data);

        // update length
        this._length += new_items.length;

        // Connect existing items with new_items
        if(this.last) {
            this.last.next = new_items[0];
        } else{
            this.root = new_items[0];
        }

        // update last item
        this.last = new_items[new_items.length-1];
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
        if (this.is_empty()) return '[empty list]';

        let result = '';
        let currentItem = this.root;
        result += '[';
        result += currentItem.data;
        while (currentItem.next) {
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
     * @deprecated accessing data from this method is O(n) not O(1).
     *       This LinkedList implementation is not built for fast random access
     */
    at(index: number): T {
        return this.get_item(index).data;
    }

    /**
     * Remove the nth element
     * @param index
     */
    remove_at(index: number) {
        if (this._length === 0) throw new Error("Index  out of bounds")

        // If deletes the first item
        if (index === 0) {
            const new_root = this.root.next;
            this.root.next = null;
            this.root = new_root;
        } else {
            // if deletes any other item
            const item_before = this.get_item(index - 1);
            const item_to_delete = item_before.next;
            item_before.next = item_to_delete.next;
        }
        this._length--;
    }

    private get_item(index: number): LinkedItem<T> {
        if (index < 0 || index >= this._length) throw new Error(`Index out of bounds`)
        let cursor = 0;
        let item = this.root;
        while (index != cursor) {
            item = item.next;
            cursor++;
        }
        return item;
    }

    /**
     * Insert a data at a given index
     * @param data
     * @param index
     */
    insert_at(data: T, index: number) {
        const newItem = new LinkedItem(data);
        // Handle the specific case when we insert at the beginning of the list
        if (index === 0) {
            newItem.next = this.root;
            this.root = newItem;
        } else {
            const previous = this.get_item(index - 1);
            newItem.next = previous.next;
            previous.next = newItem;
        }
    }

    /**
     * Convert the linked list to an arsray
     */
    to_array() {
        if (this._length === 0) return [];

        const result = [];
        let current_item = this.root;
        while (current_item !== null) {
            result.push(current_item.data);
            current_item = current_item.next;
        }
        return result;
    }

    /**
     * get an iterable array of linked list data
     */
    values(): Iterable<T> {
        return this.to_array();
    }

    /**
     * get an iterable array of linked list data
     */
    entries(): Iterable<LinkedItem<T>> {
        if (this._length === 0) return [];

        const result = new Array<LinkedItem<T>>(this._length);
        let current_item = this.root;
        let current_index = 0;
        while (current_index < this._length) {
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
        let previous_item: LinkedItem<T> = null;

        // create one linked item per data
        return data.map((each_data, index) => {
            const new_item = new LinkedItem<T>(each_data);
            if (previous_item) previous_item.next = new_item; // link previous item to this new_item
            previous_item = new_item;
            return new_item;
        });
    }
}