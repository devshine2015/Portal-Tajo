const CLIENT = {
  thomas: {
    domain: 'thomas-drvr.eu.auth0.com',
    clientId: 'lDBTNr8S_ipznvzqgr1GR6MF7RPAASsV',
    callbackUrl: 'http://localhost:3000/login/callback',
  },
  drvr: {
    domain: 'drvr.auth0.com',
    clientId: 'qlvnewPDcVdLge4ah7Rkp0lL9Lzikj7B',
    callbackUrl: 'http://localhost:3000/login/callback',
  },
};

export default function getClientConfig(clientName) {
  return CLIENT[clientName];
}
