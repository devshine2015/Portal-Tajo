import auth0 from 'auth0-js';
import AUTH_CONFIG from './auth.variables';
import isTokenExpired from './tokenHelpers';
import { login } from './apiCalls';

/**
 * @description
 *
 * 0. should be able to tell if user is already authenticated
 *  - we can do it by verifying expiration date of token (if provided)
 * 1. should provide the way to authorize user with email/password combination and social auth providers (fb, google)
 *  - fetch additional info for different login methods. Ie. after email/password we must get profile and additional access tokens.
 * 2. should provide the way to unauthorize user
 * 3. should be reusable for both mobile and web apps
 */

class Authentication {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor(token = undefined) {
    this.token = token;
    this.authenticated = this.isAuthenticated();
    this.accessToken = null;
  }

  /**
   * Authenticate user with traditional username/password approach
   */
  traditionalLogin = (username, password, cb) => {
    login(username, password)
      .then((profile) => {
        this.accessToken = profile.access_token;

        this._getUserInfo(profile.access_token, cb);
      });
  }

  _getUserInfo = (accessToken, cb) => {
    this.auth0.client.userInfo(accessToken, cb);
  }

  isAuthenticated = () => {
    return !isTokenExpired(this.token);
  }
}

export default Authentication;