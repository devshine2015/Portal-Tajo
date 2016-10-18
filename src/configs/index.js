const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080'; // for localhost
const PROD_ENGINE_BASE = window.location.host;

const chooseServerEnv = () => {
  if (window.location.hostname.search('drvrapp.net') !== -1) {
    return 'production';
  } else if (window.location.hostname.search('drvrstage') !== -1) {
    return 'stage';
  }

  return 'dev';
};

const chooseRootRoute = () => {
  if (onDev) {
    if (portal === 'tajo') return '/tajo';
    if (portal === 'portal') return '/';
  }

  return `/portal/:fleet/${portal}/`;
};

export const portal = process.env.DRVR_PROJECT;
export const protocol = document.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss' : 'ws';
export const serverEnv = chooseServerEnv();
export const onProduction = serverEnv === 'production';
export const onStage = serverEnv === 'stage';
export const onDev = serverEnv === 'dev';
// use old local storage key notation for ssreports
export const LOCAL_STORAGE_SESSION_KEY = portal !== 'ssreports' ?
  'drvr_tajo-sessionId' : 'ngStorage-sessionId';
export const ROOT_ROUTE = chooseRootRoute();

// isDev true only on localhost
export const ENGINE_BASE = onDev ? DEV_ENGINE_BASE : PROD_ENGINE_BASE;
