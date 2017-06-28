import qs from 'query-string';
import {
  protocol,
  socketProtocol,
  ENGINE_BASE,
  onDev,
} from 'configs';
import {
  getSessionToken,
  getIdToken,
  getFleetName,
} from 'services/Session/reducer';
import { getErrorType } from 'services/Global/reducer';
import { errorsActions } from 'services/Global/actions';
import BaseAPIClass from './BaseAPIClass';

const HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
  mode: 'no-cors',
};

const BASE_URL = `${protocol}//${ENGINE_BASE}`;
const SOCKET_URL = `${socketProtocol}//${ENGINE_BASE}/engine`;

// construct URL depends on API version
function makeUrl(apiVersion, url, fleet, host = undefined) {
  let result;

  if (!apiVersion || apiVersion === 1) {
    result = `${host || BASE_URL}/engine/${fleet}/${url}`;
  }
  if (apiVersion === 1.1) {
    result = `${host || BASE_URL}/${url}`;
  }

  return result;
}

/**
 * get token which will serve as part of Bearer to make requiests
 * to Engine. It might be old-fashioned sessionid
 * or new-shiny-bright auth0 JWT.
 * result depends on a backend server: local/dev or stage/prod.
 * @param {ImmutableMap} state - app state
 *
 * @returns {String} token
 */
function getAuthString(state) {
  if (onDev) {
    return getIdToken(state);
  }

  return getSessionToken(state);
}

class DrvrEngineApi extends BaseAPIClass {

  _invoke(method, url, {
    payload,
    optionalHeaders = {},
    apiVersion = this.currentVersion,
    optionalFleet,
    host,
  } = {}) {
    const state = this.getState();
    const hasError = !!getErrorType(state);

    // reset error if have some
    if (hasError) {
      this.dispatch(errorsActions.resetError());
    }

    const fleet = optionalFleet || getFleetName(state);
    const urlToInvoke = makeUrl(apiVersion, url, fleet, host);
    const headers = Object.assign({}, HEADERS, {
      'DRVR-SESSION': getAuthString(state),
    }, {
      ...optionalHeaders,
    });

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }

  invokeWebSocket(url, options) {
    const state = this.getState();
    const fleet = getFleetName(state);
    const sessionId = {
      'DRVR-SESSION': getAuthString(state),
    };
    const params = Object.assign({}, { ...sessionId }, { ...options });
    const query = params ? `?${qs.stringify(params)}` : '';
    const socketURL = `${SOCKET_URL}/${fleet}/${url}${query}`;

    return new WebSocket(socketURL);
  }
}

const drvrEngineApi = new DrvrEngineApi();

export default drvrEngineApi;
