import qs from 'query-string';
import { protocol, socketProtocol, ENGINE_BASE } from 'configs';
import { getAuthenticationSession } from 'services/Auth/reducer';
import { getErrorMessage } from 'services/Global/reducer';
import { errorsActions } from 'services/Global/actions';
import { getFleetName } from 'services/UserModel/reducer';
import prepareRequest from './makeRequest';
import errorsHandler from './errorsHandler';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
  mode: 'no-cors',
};

const BASE_URL = `${protocol}//${ENGINE_BASE}`;
const SOCKET_URL = `${socketProtocol}://${ENGINE_BASE}/engine`;

class API {
  constructor() {
    this.dispatch = () => ({});
    this.getState = () => ({});
    this.currentVersion = 1;

    ['head', 'get', 'post', 'put', 'delete'].forEach(method => {
      this[method] = (url, payload) => this.invoke(method, url, payload);
    });
  }

  injectStore(store) {
    this.dispatch = store.dispatch;
    this.getState = store.getState;
  }

  errorsHandler = error => errorsHandler(error, this.dispatch)

  invoke(method, url, {
    payload,
    optionalHeaders = {},
    // apiVersion = this.currentVersion, - not necessary anymore - REMOVE
    // optionalFleet, // used in events calculater - REMOVE!!!
    // host, // used in events calculater - REMOVE!!!
  } = {}) {
    const hasError = !!getErrorMessage(this.getState());

    // reset error if have some
    if (hasError) {
      this.dispatch(errorsActions.resetError());
    }

    // REMOVE FLEET
    // const fleet = optionalFleet || getFleetName(this.getState());
    const urlToInvoke = `${BASE_URL}/${url}`;
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
    const socketURL = `${SOCKET_URL}/${fleet}/${url}${query}`;

    return new WebSocket(socketURL);
  }
}

const api = new API();

export default api;
