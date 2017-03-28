import BaseAPIClass from './BaseAPIClass';

const auth0Domain = 'https://drvr.auth0.com';
const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

class Auth0API extends BaseAPIClass {
  constructor() {
    super();

    this.idToken = undefined;
  }

  setIdToken = (idToken = undefined) => {
    if (idToken) {
      this.idToken = idToken;
    } else {
      this.idToken = undefined;
    }
  }

  _invoke = (method, url, payload) => {
    const headers = Object.assign({}, HEADERS, {
      Authorization: this.accessToken,
    });
    const urlToInvoke = `${auth0Domain}${url}`;

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }
}

const auth0Api = new Auth0API();

export default auth0Api;
