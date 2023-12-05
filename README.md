# sublinks-js-client
A Javascript/Typescript client to interact with Sublinks.

Can act as a drop-in replacement for `lemmy-js-client` if app developers want to port their Lemmy clients to Sublinks.

Currently, all `lemmy-js-client` methods are simply wrapped, and all of its types are re-exported.  

As the native Sublinks API is developed, new methods and types will be added to this library to access those.  As the native API matures, methods will be ported over and the `lemmy-js-client` eventually phased out and removed as a dependency.

This client may also gain additional convenience methods for the Lemmy JS client, so even if you're developing for that platform, you may find this library useful.


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

