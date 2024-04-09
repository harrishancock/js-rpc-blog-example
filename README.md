# js-rpc-blog-example
An example of JS RPC copied from https://blog.cloudflare.com/javascript-native-rpc

## This example was bootstrapped with the following commands

```
npm create cloudflare -- ./api-gateway
# -> "Hello World" Worker
# -> No TypeScript
# -> No deployment (yet)

npm create cloudflare -- ./auth
# -> "Hello World" Worker
# -> No TypeScript
# -> No deployment (yet)
```

Then I copied code from the blog into the JS files and modified them for simplicity.

## To try out locally

Start the auth service first:
```
cd auth
npx wrangler@using-keyword-experimental dev
```

In a separate terminal, start the API gateway service next:
```
cd api-gateway
npx wrangler@using-keyword-experimental dev
```

Look up which local port the API gateway service is using, set it to the variable `$PORT`, then:
```
curl http://localhost:$PORT/ -H "Cookie: secret-cookie"
```

The API gateway service Worker should respond with my name. Any other Cookie header value should result in a 403.