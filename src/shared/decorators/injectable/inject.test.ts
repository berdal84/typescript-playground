import {describe, expect, test, jest} from '@jest/globals';
import {Inject, Injectable} from '.'

interface IComponent {
    type: string;
    update: () => void;
}

describe('@Injectable', () => {

    test('@Inject', () => {

        // prepare

        @Injectable
        class Counter implements IComponent  {
            type = 'counter' as const;
            count = 0;
            update() {
                console.log(`counter is ${this.count}`)
                this.count++;
            }
        }

        @Injectable
        class Hello implements IComponent {
            type = 'hello' as const;
            update() {
                console.log('Hello World!');
            }
        }

        class EntityWithInjectedComponents {
            @Inject('Hello') hello: IComponent;
            @Inject('Counter') counter: IComponent;
        }

        // act
        const entity = new EntityWithInjectedComponents();

        // check
        expect(entity.hello).toBeInstanceOf(Hello)
        expect(entity.hello.type).toStrictEqual('hello');
        const mock = jest.spyOn(console, 'log');
        entity.hello.update();
        expect(mock).toBeCalled();

        expect(entity.counter).toBeInstanceOf(Counter)
        expect(entity.counter.type).toStrictEqual('counter');
        entity.counter.update();
        expect((entity.counter as Counter).count).toBe(1);
    })
})