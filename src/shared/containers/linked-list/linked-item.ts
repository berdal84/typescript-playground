/**
 * LinkedItem is able to carry a data T and to be chained to another LinkedItem<T>
 */
export class LinkedItem<T> {

    next: LinkedItem<T>;
    data: T;

    constructor(_data: T) {
        this.data = _data;
        this.next = null;
    }
}