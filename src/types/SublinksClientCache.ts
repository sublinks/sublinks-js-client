import type {GetSiteResponse} from 'lemmy-js-client'

export interface SublinksClientCache {
    duration: number,           // Number of seconds the cache should be considered valid
    
    getSite?: {
        timestamp: number,   
        data: GetSiteResponse
    }
}