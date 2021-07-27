export interface ServiceOperations<T, K, V> {
    list?: (limit: number, page: number) => Promise<T>;
    readById: (id: string) => Promise<T>;
    create: (resource: T) => Promise<string>;
    putById: (id: string, resource: K) => Promise<string>;
    patchById: (id: string, resource: V) => Promise<string>;
    deleteById: (id: string) => Promise<string>;
}