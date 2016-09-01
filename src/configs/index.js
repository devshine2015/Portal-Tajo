export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const onProduction = location.hostname === 'drvrapp.net';
export const serverFolder = 'tajo';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBp0Tvsnkrnv9mpFK6Zo0U9VdHZqH2hKjA',
  authDomain: 'drvr.firebaseapp.com',
  databaseURL: 'https://drvr.firebaseio.com',
  storageBucket: 'project-7060603335742899024.appspot.com',
};

export const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080/engine';
export const PROD_ENGINE_BASE = `${window.location.host}/engine`;
export const ENGINE_BASE = onProduction ? PROD_ENGINE_BASE : DEV_ENGINE_BASE;

export const VERSIONS = {
  authentication: {
    verify: function (savedData) {
      let version;

      if (savedData === null) {
        version = 2;
      } else {
        version = savedData.hasOwnProperty('ver') && savedData.ver || 1;
      }

      return this[version](savedData);
    },
    1: () => false,
    2: (savedData) => {
      if (!savedData) {
        return true;
      }

      return true;
    },
  },
};
