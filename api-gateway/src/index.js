export default {
	async fetch(req, env) {
	  // `using` is a new JavaScript feature. Check out the
	  // docs for more on this:
	  // https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/
	  using authResult = await env.AUTH_SERVICE.checkCookie(
		  req.headers.get("Cookie"));
	  if (!authResult.authorized) {
		return new Response("Not authorized", {status: 403});
	  }
  
	  let user = authResult.user;
	  let profile = await user.getProfile();
  
	  return new Response(`Hello, ${profile.name}!`);
	}
  }