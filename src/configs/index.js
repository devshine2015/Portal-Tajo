export const isDev = process.env.NODE_ENV !== 'production';
export const protocol = document.location.protocol;
export const onProduction = location.hostname === 'drvrapp.net' && !isDev;
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBp0Tvsnkrnv9mpFK6Zo0U9VdHZqH2hKjA',
  authDomain: 'drvr.firebaseapp.com',
  databaseURL: 'https://drvr.firebaseio.com',
  storageBucket: 'project-7060603335742899024.appspot.com',
};
export const VERSIONS = {
  authentication: {
    ver: 2,
    verify: (sessions) => {
      let verified = true;

      // if no any session data
      if (!sessions) {
        return verified;
      }

      if (typeof sessions === 'string') {
        return false;
      }

      // authentication ver 2 session object
      // must have fleet, session-id and id props
      if (sessions.hasOwnProperty('length')) {
        for (let i = 0; i < sessions.length; i++) {
          const s = sessions[i];
          if (!s.hasOwnProperty('fleet') ||
              !s.hasOwnProperty('session-id') ||
              !s.hasOwnProperty('id')) {
            verified = false;
            break;
          }
        }
      }

      return verified;
    },
  },
};
