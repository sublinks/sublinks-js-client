import type { CacheOptions } from './types/argumentTypes/CacheOptions'

interface FetchCacheStore {
    
    [key: string]: {    
        timestamp: number,
        data: any
    }
}


export class FetchCache {
    store: FetchCacheStore = {}  as FetchCacheStore
    ttl: number
    useCache: boolean

    /** Fetch cache for SublinksClient
     * @param ttl           Default cache duration, in seconds, for the cache. Default is 60 seconds
     * @param useCache      Whether to use the cache by default if not specified. Default `true`
    */
    constructor(ttl:number = 60, useCache:boolean = true) {
        this.ttl = ttl
        this.useCache = useCache
   }

    /** Get the age of a given key. Value is in seconds
     * @param key The cache key to lookup
     */
    age(key:string): number {
        if (!this.store[key]) return -1
        return Math.floor(this.now() - this.store[key].timestamp) 
    }

   /** Returns the current date/time as a Unix timestamp rounded down to nearest second. */
    now(): number {
        return Math.floor(new Date().getTime()/1000)
    }

    
    /** Flushes the cache **/
    flush() {
        this.store = {} as FetchCacheStore
    }

    /** Get a value for a given key. If not found, will return undefined. Data type should be specified by caller.
     * @param key The storage key to lookup
     * @param options Object representing the cache options. Can be passed directly from calling method
     * @param options.invalidate Do not return a lookup from the cache 
    */
    get <ReturnType> (key: string, options:CacheOptions={}): ReturnType | undefined {
        const duration   = options?.duration   ?? this.ttl
        const useCache   = options?.useCache   ?? this.useCache
        const invalidate = options?.invalidate ?? false
        
        if (!useCache) return undefined
        if (!this.store[key]) return undefined
        
        const validCache = this.store[key].data && (this.now() - this.store[key].timestamp <= duration)
        
        if (validCache && !invalidate) return this.store[key].data as ReturnType
        
        if (!validCache || invalidate) {
            this.del(key)
            return undefined
        }
    }

    /** Stores a given key/value pair. 
    * @param key Lookup key
    * @param value Any arbitrary data. Data type should be specified by caller 
    */
    put <DataType> (key: string, value:DataType, options:CacheOptions={}): DataType {
        const useCache   = options?.useCache   ?? this.useCache
        if (!useCache) return value as DataType

        this.store[key] = {
            timestamp:  this.now(),
            data: value as DataType
        }
        return this.store[key].data as DataType
    }

    /** Deletes a key from the cache
     * @param key The key to delete. If ends with *, the key will be used as a prefix.
     * e.g.  del('the\*') will delete keys the, thee, and there
    */
    del (key:string) {
        
        if (key.endsWith('*')) {
            let prefix = key.split('*')[0]
            for (let k of Object.keys(this.store)) {
                if (k.startsWith(prefix)) {
                    delete this.store[k]
                }
            }
        }
        else {
            delete this.store[key]
        }
    }

    /** Delete any expired keys from the store. Uses the class-level TTL 
     * @param maxAge Delete any keys older than this value (in seconds)
     * **/
    housekeep(maxAge:number = this.ttl): void {
        for (let key of Object.keys(this.store)) {
            if (this.age(key) > maxAge) {
                delete this.store[key]
            }
        }
    }

   
    
   



}