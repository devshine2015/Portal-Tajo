import 'whatwg-fetch';

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

export default function prepareRequest(method, url, headers, payload) {
  let query;
  let body;

  if (method === 'get' || method === 'head') {
    const string = JSON.stringify(payload);
    query = string ? `?${string}` : '';
  } else if (method === 'post' || method === 'put' || method === 'delete') {
    body = JSON.stringify(payload);
  }

  const base = url;
  const endpoint = query ? `${base}/${query}` : base;

  const options = {
    body,
    method,
    headers,
  };

  return sendRequest({ endpoint, options });
}
