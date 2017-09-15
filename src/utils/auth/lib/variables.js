const PROD_CLIENT = {
  domain: 'drvr.auth0.com',
  clientId: 'qlvnewPDcVdLge4ah7Rkp0lL9Lzikj7B',
  callbackUrl: 'http://localhost:3000/login/callback',
};

// thomas client
const DEV_CLIENT = {
  domain: 'thomas-drvr.eu.auth0.com',
  clientId: 'lDBTNr8S_ipznvzqgr1GR6MF7RPAASsV',
  callbackUrl: 'http://localhost:3000/login/callback',
};

export default function getClientConfig(isProd) {
  return isProd ? PROD_CLIENT : DEV_CLIENT;
}
