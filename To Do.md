**Add implicit caching to getSite method.**

- [X] Check if cached resonse present, compare expiry time, and either serve from cache or fetch, cache, and return
- [X] Add `cacheTime` setting (class level, probably) and reasonable default value
- [X] Add `revalidate` option to bypass cache and store updated response
- [X] Add `nocache` option to bypass cache and not store updated response
- [ ] Move cache key generation to internal method


**Remove Lemmy JS Client as Dependency**
- [X] Rewrite methods in client.ts to use the `call` wrapper and call endpoints directly instead of wrapping Lemmy HTTP client
- [X] Pull in Lemmy types from Lemmy JS Client and create an export file
- [X] Update client.ts to import Lemmy types from internal copy
- [X] Update package index to export Lemmy types from internal copy instead of from LJS client
- [X] Remove LJS client and Lemmy HTTP from client and package dependencies
- [X]  Remove cross-fetch entirely?
- [X] Reimplement uploadImage method in client.ts
- [X] Reimplement setHeaders method in client.ts



