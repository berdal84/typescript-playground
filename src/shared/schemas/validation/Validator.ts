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
     * @param auto_generate
     */
    get_schema(type_name: string, auto_generate = true): Definition {
        // Try to load from cache
        if(this.cache.has(type_name)) return this.cache.get(type_name);
        // throws if autogenerate is off
        if(!auto_generate) throw new Error(`Cannot find a schema for ${type_name}`);
        // generate schema
        return this.generate_schema(type_name);
    }

    /**
     * Generate a schema from a type name
     * @param type_name should match with filename with no extension.
     */
    generate_schema(type_name: string):  Definition {

        // Generate schema
        const program = getProgramFromFiles(
            [resolve(__dirname, `${type_name}.ts`)],
            this.compilerOptions,
        );
        const schema = generateSchema(program, type_name, this.settings);

        //  warns if cache entry already exists
        if(this.cache.has(type_name)) console.warn(`A schema for ${type_name} exists and will be replaced`);

        // store in cache
        this.cache.set(type_name, schema);

        return schema;
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
