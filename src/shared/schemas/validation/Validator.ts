import {resolve} from "path";
import {Definition,  generateSchema, getProgramFromFiles, PartialArgs, CompilerOptions} from "typescript-json-schema";
import Ajv, {Options as AjvOptions} from "ajv";
import * as fs from "fs";

/**
 * Helper class to generate json schemas (using TJS) and validate data (using Ajv)
 */
export class Validator {

    /** json schema validation */
    private ajv: Ajv;
    /** cache for generated schemas */
    private cache: Map<string, Definition>;
    /** types root directory */
    private root_dir: string;

    constructor(options: Partial<{ ajv: AjvOptions, rootDir: string}> = {}) {
        this.cache = new Map<string, Definition>();
        this.ajv = new Ajv( {
            allowUnionTypes: true,
            ...options.ajv
        });
        this.root_dir = options.rootDir ?? resolve(__dirname, "types")
    }

    /**
     * Generate a schema from a given type name
     * @param type_name should match with filename with no extension. File must be in same directory.
     * @param auto_generate
     */
    get_schema(type_name: string, auto_generate = true): Definition {
        // Try to load from cache
        if(this.cache.has(type_name)) return this.cache.get(type_name);
        // throws if autogenerate is off
        if(!auto_generate) throw new Error(`No schema found for ${type_name}. Turn on  auto_generate or call generate_schema()`);
        // generate schema
        return this.generate_schema(type_name);
    }

    /**
     * Generate a schema from a type name
     * @param type_name should match with filename with no extension.
     */
    generate_schema(type_name: string):  Definition {

        const file_path = resolve(this.root_dir ,`${type_name}.ts`);

        if(!fs.existsSync(file_path)) throw new Error(`Unable to generate a schema for ${type_name}.\nFile not found: ${file_path}\nTypes should be placed in ${this.root_dir}`)

        // Generate schema
        const program = getProgramFromFiles(
            [file_path],
            {
                strictNullChecks: true,
            },
        );
        const schema = generateSchema(program, type_name, {
            required: true,
        });

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
