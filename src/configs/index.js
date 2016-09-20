const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080/engine';
const PROD_ENGINE_BASE = `${window.location.host}/engine`;

export const portal = process.env.DRVR_PROJECT;

export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss' : 'ws';
export const onProduction = location.hostname === 'drvrapp.net';
export const LOCAL_STORAGE_SESSION_KEY = onProduction && portal !== 'ssreports' ?
  'ngStorage-sessionId_tajo' : 'ngStorage-sessionId';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBp0Tvsnkrnv9mpFK6Zo0U9VdHZqH2hKjA',
  authDomain: 'drvr.firebaseapp.com',
  databaseURL: 'https://drvr.firebaseio.com',
  storageBucket: 'project-7060603335742899024.appspot.com',
};

export const ENGINE_BASE = onProduction ? PROD_ENGINE_BASE : DEV_ENGINE_BASE;
