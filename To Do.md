**Add implicit caching to getSite method.**

- Check if cached resonse present, compare expiry time, and either serve from cache or fetch, cache, and return
- Add `cacheTime` setting (class level, probably) and reasonable default value
- Add `revalidate` option to bypass cache and store updated response
- Add `nocache` option to bypass cache and not store updated response


