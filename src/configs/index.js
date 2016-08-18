export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const isSecure = protocol === 'https';
export const onProduction = location.hostname === 'drvrapp.net' && !isDev;
export const serverFolder = 'tajo';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBp0Tvsnkrnv9mpFK6Zo0U9VdHZqH2hKjA',
  authDomain: 'drvr.firebaseapp.com',
  databaseURL: 'https://drvr.firebaseio.com',
  storageBucket: 'project-7060603335742899024.appspot.com',
};
export const VERSIONS = {
  authentication: {
    ver: 2,
    // Don't use arrow shorthand (=>) to keep context for this
    verify: function(savedData) {
      // if no any session data
      if (!savedData) {
        return true;
      }

      // if same version
      if ((savedData && savedData.hasOwnProperty('ver')) && (savedData.ver === this.ver)) {
        return true;
      }

      return false;
    },
  },
};
