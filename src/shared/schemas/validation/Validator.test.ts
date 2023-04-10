import {describe, expect, test, jest} from '@jest/globals';
import {MyType} from "./types/MyType";
import {Validator} from "./Validator";
import {resolve} from "path";

describe('Validator', () => {

    let validator: Validator;
    let rootDir:  string;

    beforeAll(() => {
        rootDir = resolve(__dirname, 'types');
        validator = new Validator({ rootDir });
        // First call to generate_schema can be long
        // caching is on by default and any call to get_schema will be fast
        const schema = validator.generate_schema('MyType')
        expect(schema).toBeDefined();
    })

    test('should throw getting a schema for an unexisting file', async () => {
        expect(() => validator.get_schema('NotExisting')).toThrow();
    })

    test('should generate a schema matching with a handmade schema', async () => {
        const schema = validator.get_schema('MyType')
        const handmade_schema = await import( resolve(rootDir, 'MyType.schema.json') );
        expect(schema).toEqual(handmade_schema);
    })

    test('should generate a schema rejecting an incompatible data', async () => {
        const schema = validator.get_schema('MyType')
        const wrong_data: MyType = {
            value: "42" as any,
            name: 1001 as any
        }
        expect( validator.validate(schema, wrong_data) ).toBe(false)
    })

    test('should generate a schema validating a compatible data', async () => {
        const schema = validator.get_schema('MyType')
        const good_data: MyType = {
            value: 42,
            name: 'Robot',
            description: 'This is the expected data type'
        }
        expect( validator.validate(schema, good_data) ).toBe(true)
    })
})