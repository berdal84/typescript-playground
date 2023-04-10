import {Injectable} from "./injectable";

export interface OnInit {
    init: () => void;
}

export interface OnUpdate {
    update: () => void;
}

export interface OnDestroy {
    destroy: () => void;
}

export type IService = OnUpdate | OnInit | OnDestroy;

export function Service<T extends { new(...args: any[]): IService } >(_type: string) {
    return function(constructor: T) {
        return Injectable(constructor, _type) && console.log(`${_type} is now registered as a Service`);
    }
}