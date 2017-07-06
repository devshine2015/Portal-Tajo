import BaseAPIClass from './BaseAPIClass';
import getExtentionAuthorizationHeader from './authHeaderHelper';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

class Auth0API extends BaseAPIClass {
  constructor() {
    super();

    this.idToken = undefined;
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }

  setIdToken = (idToken = undefined) => {
    if (idToken) {
      this.idToken = idToken;
    } else {
      this.idToken = undefined;
    }
  }

  setAccessTokens = (tokens = {}) => {
    this.mgmtAccessToken = tokens.mgmtApi || undefined;
    this.authExtAccessToken = tokens.authExtApi || undefined;
  }

  _invoke = (method, url, {
    payload = {},
    extName = undefined,
  } = {}) => {
    const headers = Object.assign({}, HEADERS, getExtentionAuthorizationHeader(extName, {
      mgmtAccessToken: this.mgmtAccessToken,
      authExtAccessToken: this.authExtAccessToken,
      idToken: this.idToken,
    }));

    return this._prepareRequest(method, url, headers, payload);
  }

  clean() {
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }
}

const auth0Api = new Auth0API();

export default auth0Api;
