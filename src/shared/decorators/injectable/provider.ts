const container = new Map<string, any>();
const providers = new Map<string, { new (...args: any[]): any}>();

/**
 * Declare a new providers
 * @param token
 * @param factory
 */
export function add_provider<T>(token:string, factory: { new (...args: any[]): T} ) {
    providers.set(token, factory);
}

/**
 * Get an instance from a given class name
 * @param token
 */
export function provide<T>(token: string): T {
    // Try to reuse existing instance
    const existing_instance = container.get(token);
    if(existing_instance) return existing_instance;

    // Create a new instance
    const factory = providers.get(token);
    if(!factory) throw new Error(`Unable to find a factory for ${token}`)
    return new factory();
}