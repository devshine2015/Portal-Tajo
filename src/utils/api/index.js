import qs from 'query-string';
import { protocol, socketProtocol, ENGINE_BASE } from 'configs';
import { getAuthenticationSession } from 'services/Auth/reducer';
import { getFleetName } from 'services/Global/reducer';
import { errorsActions } from 'services/Global/actions';
import prepareRequest from './makeRequest';
import errorsHandler from './errorsHandler';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
  mode: 'no-cors',
};

class API {
  constructor() {
    this.dispatch = () => ({});
    this.getState = () => ({});
    this.baseURL = `${protocol}//${ENGINE_BASE}`;
    this.socketURL = `${socketProtocol}://${ENGINE_BASE}`;

    ['head', 'get', 'post', 'put', 'delete'].forEach(method => {
      this[method] = (url, payload) => this.invoke(method, url, payload);
    });
  }

  injectStore(store) {
    this.dispatch = store.dispatch;
    this.getState = store.getState;
  }

  errorsHandler = error => errorsHandler(error, this.dispatch)

  invoke(method, url, { payload, optionalHeaders = {} } = {}) {
    this.dispatch(errorsActions.resetError());

    const fleet = getFleetName(this.getState());
    const urlToInvoke = `${this.baseURL}/${fleet}/${url}`;
    const headers = Object.assign({}, HEADERS, {
      ['DRVR-SESSION']: getAuthenticationSession(this.getState()),
    }, {
      ...optionalHeaders,
    });

    return prepareRequest(method, urlToInvoke, headers, payload)
      .catch(this.errorsHandler);
  }

  invokeWebSocket(url, options) {
    const fleet = getFleetName(this.getState());
    const sessionId = {
      ['DRVR-SESSION']: getAuthenticationSession(this.getState()),
    };
    const params = Object.assign({}, { ...sessionId }, { ...options });
    const query = params ? `?${qs.stringify(params)}` : '';
    const socketURL = `${this.socketURL}/${fleet}/${url}${query}`;

    return new WebSocket(socketURL);
  }
}

const api = new API();

export default api;
