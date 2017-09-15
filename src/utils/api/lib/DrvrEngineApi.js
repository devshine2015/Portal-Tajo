import qs from 'query-string';
import {
  protocol,
  socketProtocol,
  ENGINE_BASE,
} from 'configs';
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

class DrvrEngineApi extends BaseAPIClass {
  drvrHeader = null;
  fleet = null;

  setDrvrHeader(key, value) {
    this.drvrHeader = {
      [key]: value,
    };
  }

  setFleet(fleetName) {
    this.fleet = fleetName;
  }

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

    const fleet = optionalFleet || this.fleet;
    const urlToInvoke = makeUrl(apiVersion, url, fleet, host);
    const headers = Object.assign({}, HEADERS, this.drvrHeader, optionalHeaders);

    return this._prepareRequest(method, urlToInvoke, headers, payload);
  }

  invokeWebSocket(url, options) {
    const params = Object.assign({}, this.drvrHeader, options);
    const query = params ? `?${qs.stringify(params)}` : '';
    const socketURL = `${SOCKET_URL}/${this.fleet}/${url}${query}`;

    return new WebSocket(socketURL);
  }
}

const drvrEngineApi = new DrvrEngineApi();

export default drvrEngineApi;
