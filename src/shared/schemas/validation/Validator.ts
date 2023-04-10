import {resolve} from "path";
import {Definition,  generateSchema, getProgramFromFiles, PartialArgs, CompilerOptions} from "typescript-json-schema";
import Ajv, {Options as AjvOptions} from "ajv";

/**
 * Helper class to generate json schemas (using TJS) and validate data (using Ajv)
 */
export class Validator {
    private settings: PartialArgs;
    private compilerOptions: CompilerOptions;
    private ajv: Ajv;
    private cache: Map<string, Definition>;

    constructor(options: Partial<{ ajv: AjvOptions}> = {}) {

        this.cache = new Map<string, Definition>();

        this.ajv = new Ajv( {
            allowUnionTypes: true,
            ...options.ajv
        });

        this.settings = {
            required: true,
        };

        this.compilerOptions = {
            strictNullChecks: true,
        };
    }

    /**
     * Generate a schema from a given type name
     * @param type_name
     * @param cache_enable
     */
    get_schema(type_name: string, cache_enable = true): Definition {
        // If cache is enable, try to load from it
        if(cache_enable && this.cache.has(type_name)) return this.cache.get(type_name);

        const schema = this.generate_schema(type_name);
        if(cache_enable) this.cache.set(type_name, schema);

        return schema;
    }

    private generate_schema(type_name: string):  Definition {
        // Generate schema
        const program = getProgramFromFiles(
            [resolve(__dirname, `${type_name}.ts`)],
            this.compilerOptions,
        );
       return generateSchema(program, type_name, this.settings);
    }

    /**
     * Validate a unknown data against a given schema
     * @param schema
     * @param data
     */
    validate(schema: string | Definition, data: unknown): boolean {
        return this.ajv.validate(schema, data);
    }
}
