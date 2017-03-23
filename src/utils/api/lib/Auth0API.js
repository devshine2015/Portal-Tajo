import BaseAPIClass from './BaseAPIClass';

const auth0Domain = 'https://drvr.auth0.com/api/v2';
const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
};

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFVXhRemt6UTBGRk1EUTJRVEEyTlRCRlJUVXpOMFE1TXpneE5VRXhORFF4T1RkR1FUTTVRZyJ9.eyJpc3MiOiJodHRwczovL2RydnIuYXV0aDAuY29tLyIsInN1YiI6InFsdm5ld1BEY1ZkTGdlNGFoN1JrcDBsTDlMemlrajdCQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2RydnIuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTAyNTYxNDgsImlhdCI6MTQ5MDE2OTc0OCwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMifQ.a4jOImhc1U04fgPwe6DiCGDxorshQbNPZt3k8DKsDcPuzUr6k5W4dte7cZDCd4-OvGw587_MPtwGE5e9wuH6fYrXHzArw7_7Wk73C74juSxUNe-Daq4wIA9wah1PcsyNFFlatYO8wyTWZ93VT6GpA6ctwqzuWVjlwdustvUs9AXCyznP_-qJ0lPfFsMBSsZCK9Rqel9zU8F8hBJur-m8j9jyZLxAubcYxpVC0TwKmGQaiLk8FTEtfIfjWuLwE59gKk0h-ytOFOStaUthegu3HkYztLfrzN9DCbDh_a3BWBYy3BZxHPJEOVlQPyjba4pouekTfAGCR4COUcZnLywJWQ';

class Auth0API extends BaseAPIClass {
  constructor() {
    super();

    this.accessToken = `Bearer ${token}`;
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
    const urlToInvoke = `${auth0Domain}/${url}`;

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }
}

const auth0Api = new Auth0API();

export default auth0Api;
