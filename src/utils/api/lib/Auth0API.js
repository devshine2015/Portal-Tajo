import BaseAPIClass from './BaseAPIClass';

const auth0Domain = 'https://drvr.auth0.com';
const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

const tempMgmtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFVXhRemt6UTBGRk1EUTJRVEEyTlRCRlJUVXpOMFE1TXpneE5VRXhORFF4T1RkR1FUTTVRZyJ9.eyJpc3MiOiJodHRwczovL2RydnIuYXV0aDAuY29tLyIsInN1YiI6InFsdm5ld1BEY1ZkTGdlNGFoN1JrcDBsTDlMemlrajdCQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2RydnIuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTA3NzA5NjUsImlhdCI6MTQ5MDY4NDU2NSwic2NvcGUiOiJyZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMifQ.k9VcKfDwaE8JeBk_jBSq56Ou6ZIlYxPFDkEkcvsDWMbApeX1VCl6-C2Vy7jsKzk9tEZrcQsvsQ2B5OItEXMR9zT8peVLFNw4_eiIAMzGaL2UMjpy0yOK2wf8EuYJFWk8Ubcn8zHYi8ON89lvPbFrioge_CI0K3NtXvZlWzhroAwJvKGuE-SnRC6_FeMsWJnjng9-xNy2GPYCDsnmUB91uRYxaOe95J0a0lHzRZ38snOz7QXQs23zFJ46nhfD3O6EphjCbXD87IGPIG140E8Muj-zKwDMIl7yqmIUywa7jKYcFjCxzNGvcUgdFcjkhJFxdP4ZHqNnAcwJRroAmL6P_A';

function _attachAuthorizationHeader(_this, extName) {
  let token = 'Bearer ';

  switch (extName) {
    case 'mgmtApi': {
      token += tempMgmtToken; // _this.mgmtAccessToken.access_token;
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
