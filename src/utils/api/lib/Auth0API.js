import { onProduction } from 'configs';
import BaseAPIClass from './BaseAPIClass';
import getExtAccessToken from './authHeaderHelper';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

const CLIENT = {
  thomas: {
    auth0Api: 'https://thomas-drvr.eu.auth0.com',
    managmentAPI: 'https://thomas-drvr.eu.auth0.com/api/v2',
    authorizationExtAPI: 'https://thomas-drvr.eu.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api',
  },
  drvr: {
    auth0Api: 'https://drvr.auth0.com',
    managmentAPI: 'https://drvr.auth0.com/api/v2',
    authorizationExtAPI: 'https://drvr.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api',
  },
};


class Auth0API extends BaseAPIClass {
  constructor({ clientConfig }) {
    super();

    this.idToken = undefined;
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
    this.apis = clientConfig;
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
    const accessToken = getExtAccessToken(extName, this);
    const headers = Object.assign({}, HEADERS, {
      Authorization: `Bearer ${accessToken}`,
    });

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }

  clean() {
    this.idToken = undefined;
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }
}

const auth0Api = new Auth0API({
  // it's awful, but inevitable evil until we organize auth0 usage
  // check out baseProject.js on how authentication util initialised with clientName property
  // same idea is here
  clientConfig: onProduction ? CLIENT.drvr : CLIENT.drvr,
});

export default auth0Api;
