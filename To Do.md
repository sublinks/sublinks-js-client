**Add implicit caching to getSite method.**

- [X] Check if cached resonse present, compare expiry time, and either serve from cache or fetch, cache, and return
- [X] Add `cacheTime` setting (class level, probably) and reasonable default value
- [X] Add `revalidate` option to bypass cache and store updated response
- [X] Add `nocache` option to bypass cache and not store updated response
- [ ] Move cache key generation to internal method


