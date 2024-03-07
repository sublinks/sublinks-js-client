export interface HttpClientConstructorOptions {
    fetchFunction?: typeof fetch,
    headers?: { [key:string]: string}
    insecure?: boolean
    cacheTime?: number
    useCache?: boolean
}