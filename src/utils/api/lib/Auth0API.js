import { onProduction } from 'configs';
import BaseAPIClass from './BaseAPIClass';
import getExtentionAuthorizationHeader from './authHeaderHelper';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

const THOMAS_CLIENT = {
  auth0Api: 'https://thomas-drvr.eu.auth0.com',
  managmentAPI: 'https://thomas-drvr.eu.auth0.com/api/v2',
  authorizationExtAPI: 'https://thomas-drvr.eu.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api',
};

const PROD_CLIENT = {
  auth0Api: 'https://drvr.auth0.com',
  managmentAPI: 'https://drvr.auth0.com/api/v2',
  authorizationExtAPI: 'https://drvr.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api',
};


class Auth0API extends BaseAPIClass {
  constructor({ onProd }) {
    super();

    this.idToken = undefined;
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
    this.onProd = onProd;
    this.apis = onProd ? PROD_CLIENT : THOMAS_CLIENT;
  }

  setIdToken = (idToken = undefined) => {
    if (idToken) {
      this.idToken = idToken;
    } else {
      this.idToken = undefined;
    }
  }

  setAccessTokens = (tokens = {}) => {
    this.mgmtAccessToken = tokens.managmentAPI || undefined;
    this.authExtAccessToken = tokens.authorizationExtAPI || undefined;
  }

  _invoke = (method, url, {
    payload = {},
    extName,
  } = {}) => {
    const urlToInvoke = `${this.apis[extName]}/${url}`;
    const headers = Object.assign({}, HEADERS, getExtentionAuthorizationHeader(extName, {
      mgmtAccessToken: this.mgmtAccessToken,
      authExtAccessToken: this.authExtAccessToken,
    }));

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }

  clean() {
    this.idToken = undefined;
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }
}

const auth0Api = new Auth0API({ onProd: onProduction });

export default auth0Api;
