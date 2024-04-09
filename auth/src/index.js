import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";

// `User` is an RPC interface to perform operations on a particular
// user. This class is NOT exported as an entrypoint; it must be
// received as the result of the checkCookie() RPC.
class User extends RpcTarget {
  // NOT exposed over RPC by default, even though it's public.
  profile;

  constructor(profile) {
    super();
    this.profile = profile;
  }

  // Get user profile.
  async getProfile() {
    return this.profile;
  }
}

// Now we define the entrypoint service, which can be used to
// get User instances -- but only by presenting the cookie.
export class AuthService extends WorkerEntrypoint {
  async checkCookie(cookie) {
    // "Authenticate" the cookie.
    let profile = cookie === "secret-cookie" ? {
      name: "Harris Hancock",
    } : null;

    if (profile) {
      return {
        authorized: true,
        user: new User(profile),
      };
    } else {
      return { authorized: false };
    }
  }
}

// For now, we need this default entrypoint. It will become unnecessary soon,
// due to the named entrypoint above.
export default {
  async fetch() {
    return new Response("Not Implemented", { status: 501 });
  }
}