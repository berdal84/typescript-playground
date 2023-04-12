import {Injectable} from "./injectable.decorator";
import {IService} from "./service.interface";

export function Service<T extends { new(...args: any[]): IService } >(_type: string) {
    return function(constructor: T) {
        return Injectable(constructor, _type) && console.log(`${_type} is now registered as a Service`);
    }
}