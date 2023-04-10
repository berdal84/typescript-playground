import {describe, expect, test, jest} from '@jest/globals';
import {MyType} from "./MyType";
import {Validator} from "./Validator";

describe('Validator', () => {

    let validator: Validator;

    beforeAll(() => {
        validator = new Validator();
        // First call to generate_schema can be long
        // caching is on by default and any call to get_schema will be fast
        const schema = validator.generate_schema('MyType')
        expect(schema).toBeDefined();
    })

    test('should generate a schema matching with a handmade schema', async () => {
        const schema = validator.get_schema('MyType')
        expect(schema).toEqual(await import('./MyType.schema.json'));
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