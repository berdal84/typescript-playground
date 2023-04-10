/**
 * Decorator to automatically inject an instance of a given object
 */
import {add_provider} from "./provider";

function Injectable<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log(`${constructor.name} is now injectable`);
    add_provider(constructor.name, constructor);
    return constructor;
}

export {Injectable}