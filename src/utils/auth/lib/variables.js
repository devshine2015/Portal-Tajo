const CLIENT = {
  drvr: {
    domain: 'auth.drvrapp.net',
    clientId: 'qlvnewPDcVdLge4ah7Rkp0lL9Lzikj7B',
    callbackUrl: 'http://localhost:3000/login/callback',
  },
};

export default function getClientConfig(clientName) {
  return CLIENT[clientName];
}
