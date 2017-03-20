import BaseAPIClass from './BaseAPIClass';

const auth0Domain = 'https://drvr.auth0.com';
const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
  mode: 'no-cors',
};

class Auth0API extends BaseAPIClass {
  constructor() {
    super();

    this.accessToken = undefined;
  }

  setAccessToken = (accessToken = undefined) => {
    if (accessToken) {
      this.accessToken = `Bearer ${accessToken}`;
    } else {
      this.accessToken = undefined;
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
