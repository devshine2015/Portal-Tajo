import 'whatwg-fetch';
import { HOST_BASE } from './constants';

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

function prepareRequest(method, url, headers, payload) {
  let query;
  let body;

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
  };

  return sendRequest({ endpoint, options });
}

function invoke(method, url, { payload, optionalHeaders = {} } = {}) {
  const headers = Object.assign({}, {
    'content-type': 'application/json',
  }, {
    ...optionalHeaders,
  });

  return prepareRequest(method, url, headers, payload);
}

function api(url, payload) {
  return invoke('get', url, payload);
}

['head', 'get', 'post', 'put', 'delete'].forEach(method => {
  api[method] = (url, payload) => invoke(method, url, payload);
});

export default api;
