import BaseAPIClass from './BaseAPIClass';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

function _attachAuthorizationHeader(_this, extName) {
  let token = 'Bearer ';

  switch (extName) {
    case 'mgmtApi': {
      token += _this.mgmtAccessToken;
      break;
    }
    case 'authExtApi': {
      token += _this.authExtAccessToken;
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

  setAccessTokens = (tokens = {}) => {
    this.mgmtAccessToken = tokens.mgmtApi || undefined;
    this.authExtAccessToken = tokens.authExtApi || undefined;
  }

  _invoke = (method, url, {
    payload = {},
    extName = undefined,
  } = {}) => {
    const headers = Object.assign({}, HEADERS, _attachAuthorizationHeader(this, extName));

    return this._prepareRequest(method, url, headers, payload);
  }

  clean() {
    this.mgmtAccessToken = undefined;
    this.authExtAccessToken = undefined;
  }
}

const auth0Api = new Auth0API();

export default auth0Api;
