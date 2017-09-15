import errorsHandler from './errorsHandler';
import prepareRequest from './makeRequest';

class BaseAPIClass {
  constructor() {
    this.getState = undefined;
    this.dispatch = undefined;

    ['get', 'post', 'patch', 'put', 'delete'].forEach((method) => {
      this[method] = (url, payload) => this._invoke(method.toUpperCase(), url, payload);
    });
  }

  injectStore(store) {
    this.getState = store.getState;
    this.dispatch = store.dispatch;
  }

  _errorsHandler = error => errorsHandler(error, this.dispatch)

  _prepareRequest = (method, urlToInvoke, headers, payload) =>
    prepareRequest(method, urlToInvoke, headers, payload)
      .catch(this._errorsHandler)
}

export default BaseAPIClass;
