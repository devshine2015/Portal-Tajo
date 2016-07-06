export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const onProduction = location.hostname === 'drvrapp.net' && !isDev;
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBp0Tvsnkrnv9mpFK6Zo0U9VdHZqH2hKjA',
  authDomain: 'drvr.firebaseapp.com',
  databaseURL: 'https://drvr.firebaseio.com',
  storageBucket: 'project-7060603335742899024.appspot.com',
};
export const VERSION = {
  storage: 2,
};
