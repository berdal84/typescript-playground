/**
 * Decorator to automatically inject an instance of a given object
 */
import {add_provider} from "./provider";

function Injectable<T extends { new(...args: any[]): {} }>(constructor: T, token?: string) {
    add_provider(token ?? constructor.name, constructor);
    return constructor;
}

export {Injectable}