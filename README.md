# sublinks-js-client
A Javascript/Typescript client to interact with Sublinks.

Acts as a drop-in replacement for `lemmy-js-client` for app developers who want to port their Lemmy clients to Sublinks. The library is targeting the 0.19.3 Lemmy API as that will be
the major release version at the time Sublinks launches.  The unified client library will allow for a graceful switchover to the native Sublinks API as it is developed and matures.

As the native Sublinks API is developed, new methods and types will be added to this library to access those.  If a native API endpoints matures sufficiently, it may replace a the Lemmy compatibility endpoint that a current method calls.

This client may also gain additional convenience methods for the Lemmy JS client, so even if you're developing for that platform, you may find this library useful. Since the Lemmy API will eventually be phased out and removed from this library, you will likely want to fork this into a new project.

**Note**: Hover information is only provided for methods that are not native to `lemmy-js-client`.  e.g. `setAuth`, `setHeader`, and any future Sublinks native API methods.  Please see the `lemmy-js-client` docs if you need those.


### Client API Documentation
The documentation is generated with TypeDoc and is available [here](https://sublinks.org/sublinks-js-client/).

### Example

```Javascript
import { 
    type GetSiteResponse,
    SublinksClient 
} from 'sublinks-js-client'

let site: GetSiteResponse | undefined = undefined

const client = new SublinksClient('sublinks.example.com');

try {
    let { jwt }  = await client.login({
        username_or_email: 'TestUser',
        password: '$uperS3cre+P@$sw0rd!'
    })

    if (jwt) client.setAuth(jwt);

    site = await client.getSite(); 
}
catch (err) {
    console.log(err)
}


if (site?.my_user) console.log("Successfully logged in");
else console.log("Login was unsuccessful");
```

### Compatibility Mode for 0.18.x
If you need to target 0.18.x with this library, you will need to supply `compatible18: true` in the client constructor options or call `client.compatible18=true` after initialization.

All this does is extract the JWT from the client's internal headers and add it to the `form` object when making API requests.  It will not prevent API calls to unsupported endpoints.
Additionally, it does not backport any type definition differences, so you may have to ignore or fix those in client code.  The compatibility mode is simply to allow
authenticated methods to work with both auth schemes (form param in 0.18.x and auth header in 0.19.0+).

Only use this option if you *must* support 0.18.x.  Consider either calling getSite() and re-initializing the client with compatibility mode if needed or reading this value from an environment variable.

```typescript
import { 
    type GetSiteResponse,
    SublinksClient 
} from 'sublinks-js-client'

let site: GetSiteResponse | undefined = undefined

// Create 0.18.x compatible client explicitly
const client = new SublinksClient('sublinks.example.com', {compatible18: true});

// Alternatively, dynamically detect if it needs to use compatibility mode
const client = new SublinksClient('sublinks.example.com');
site = await client.getSite({useCache: false});   // Don't cache the test lookup
if (site?.version?.startsWith('0.18.')) client.compatible18 = true


try {
    let { jwt }  = await client.login({
        username_or_email: 'TestUser',
        password: '$uperS3cre+P@$sw0rd!'
    })

    if (jwt) client.setAuth(jwt);

    site = await client.getSite(); 
}
catch (err) {
    console.log(err)
}


if (site?.my_user) console.log("Successfully logged in using compatibility mode.");
else console.log("Login was unsuccessful");

```


### Caching
By default, certain getters cache responses from the API.  This caching is, optionally, performed transparently when calling the following methods.  You can specify an additional parameter of type CacheOptions to fine-tune the cache behavior on a method-by-method basis.

- `getCommunity(form, cacheOptions?)`
- `getFederatedInstances(cacheOptions?)`
- `getModlog(form?, cacheOptions?)`
- `getPersonDetails(form, cacheOptions?)`
- `getSite(cacheOptions?)`

The client class can globally enable or disable caching, and each of the above methods can also adjust cache options individually by specifying an additional config object, `cacheOptions` to those methods.

```Javascript
interface CacheOptions {
    duration?: number,      // Number of seconds the cached item should be considered valid
    invalidate?: boolean,   // Perofrm a fresh lookup from the API and store/return the result
    useCache?: boolean      // True (default) uses the cache. False to not store API results in cache.
}

```


#### Example
```Javascript
import { SublinksClient } from 'sublinks-js-client'

// Initialize the client with a default cache time of 60 seconds. 
const client = new SublinksClient('sublinks.example.com', {cacheTime: 60});

// Lookup the site info and cache it for the default TTL
const site = await client.getSite()     

// Lookup a community but store it in cache longer than the default TTL
const community = await client.getCommunity({name: 'test@example.com'}, {cacheTime:600})

// Lookup a person but perform a fresh API call before storing and returning the response
const person = await client.getPersonDetails({person_id:5}, {invalidate: true, cacheTime: 120})

// Lookup a person but do not cache the result
const person = await client.getPersonDetails({username:'bob@example.com'}, {useCache: false})



// Instantiate a client and disable caching by default
const clientNoCache = new SublinksClient('sublinks.example.com', {useCache: false})

// Use caching on this request even if caching is disabled at the client level
const person2 = await clientNoCache.getPersonDetails({username:'bob@example.com'}, {useCache: true, cacheTime: 120})

// Flush the cache
client.cache.flush()

// Delete a key from the cache
client.cache.del('getSite')

// Delete a key pattern from the cache
client.cache.del('getModlog*')

// Delete any keys from the cache older than the max age.  With no parameter specified, will use the `cacheTime` value specified at client instantiation time.  Can also specify a custom max age, in seconds, to flush keys older than that.

client.cache.housekeep()    // Delete items older than class-level max age
client.cache.housekeep(600) // Delete items older than 600 seconds



```



### Usage with Insecure HTTP
By default, the client library will enforce HTTPS even if you specify `http://` in the instance parameter. Under 99.9% of all scenarios, you should take the hint and make sure HTTPS is enabled on your API endpoint.  However, there are times when it may be desirable/necessary to use insecure HTTP such as internal testing or working against the API via localhost.

To bypass the HTTPS enforcement, you will need to set `insecure: true` in the `options` object and include that in the client constructor.

```Javascript
// All of these will treat the instance URL as HTTP

const client = new SublinksClient('http://sublinks.example.com', {insecure: true} );

const client = new SublinksClient('https://sublinks.example.com', {insecure: true} );

const client = new SublinksClient('sublinks.example.com', {insecure: true} );
```

Any of those are valid.  When the `insecure` option is set, the instance value is treated as `http` regardless of the scheme.  Setting the `insecure` flag **does not** have any effect on HTTPS URLs, such as ignoring cert validity; it merely tells the client to use HTTP instead of HTTPS.

**Do not set the insecure in production or when accessing the API over the internet!**

You will be exposing your instance and your users to risk. The option only exists to assist developers under certain relatively safe conditions.