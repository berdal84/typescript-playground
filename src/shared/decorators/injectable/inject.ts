/**
 * Decorator to automatically inject an instance of a given object
 */
import {provide} from "./provider";

function Inject<T>(token: string): void | any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[propertyKey] = provide(token);
    };
}

export { Inject }