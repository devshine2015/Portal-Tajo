import BaseAPIClass from './BaseAPIClass';

const auth0Domain = 'https://drvr.auth0.com';
const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

function _attachAuthorizationHeader(_this, extName) {
  let token = 'Bearer ';

  switch (extName) {
    case 'mgmtApi': {
      token += _this.mgmtAccessToken.access_token;
      break;
    }
    case 'authExtApi': {
      token += _this.authExtAccessToken.access_token;
      break;
    }
    default: token += _this.idToken;
  }

  return {
    Authorization: token,
  };
}

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

  setMgmtAccessToken = (accessToken = undefined) => {
    if (accessToken) {
      this.mgmtAccessToken = accessToken;
    } else {
      this.mgmtAccessToken = undefined;
    }
  }

  setAuthExtAccessToken = (accessToken = undefined) => {
    if (accessToken) {
      this.authExtAccessToken = accessToken;
    } else {
      this.authExtAccessToken = undefined;
    }
  }

  _invoke = (method, url, {
    payload,
    extName = undefined,
  }) => {
    const headers = Object.assign({}, HEADERS, _attachAuthorizationHeader(this, extName));
    const urlToInvoke = `${auth0Domain}${url}`;

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }

  clean() {
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }
}

const auth0Api = new Auth0API();

export default auth0Api;
