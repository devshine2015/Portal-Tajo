import 'whatwg-fetch';
import {
  HOST_BASE,
  LOCAL_STORAGE_SESSION_KEY,
} from './constants';
import localStorage from './localStorage';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function sendRequest({ endpoint, options }) {
  return fetch(endpoint, options)
    .then(checkStatus);
}

function getSessionId() {
  return localStorage.read(LOCAL_STORAGE_SESSION_KEY);
}

function invoke(method, url, { payload, optionalHeaders = {} } = {}) {
  let query;
  let body;
  const headers = Object.assign({}, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'DRVR-SESSION': getSessionId(),
  }, {
    ...optionalHeaders,
  });

  if (method === 'get' || method === 'head') {
    const string = JSON.stringify(payload);
    query = string ? `?${string}` : '';
  } else if (method === 'post' || method === 'put' || method === 'delete') {
    body = JSON.stringify(payload);
  }

  const base = `${HOST_BASE}/${url}`;
  const endpoint = query ? `${base}/${query}` : base;

  const options = {
    body,
    method,
    headers,
    mode: 'no-cors',
  };

  return sendRequest({ endpoint, options });
}

function api(url, payload) {
  return invoke('get', url, payload);
}

['head', 'get', 'post', 'put', 'delete'].forEach(method => {
  api[method] = (url, payload) => invoke(method, url, payload);
});

export default api;
