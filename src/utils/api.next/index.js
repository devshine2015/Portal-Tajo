import qs from 'query-string';
import { protocol, socketProtocol, ENGINE_BASE } from 'configs';
import { commonActions } from 'services/Auth/actions';
import { getAuthenticationSession } from 'services/Auth/reducer';
import { getFleetName } from 'services/Global/reducer';
import prepareRequest from './makeRequest';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
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

  errorsHandler = error => {
    switch (error && error.response && error.response.status) {
      case 403: {
        this.dispatch(commonActions.eraseAuth());
        break;
      }
      default: break;
    }

    return Promise.reject(error && error.response);
  }

  invoke(method, url, { payload, optionalHeaders = {} } = {}) {
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
