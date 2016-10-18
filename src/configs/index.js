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

const chooseRoot = () => {
  if (portal === 'tajo') {
    return '/tajo';
  }

  return '';
};

export const initRootRoute = (fleet = undefined) => {
  if (onDev) {
    ROOT_ROUTE = chooseRoot();
    return;
  }

  ROOT_ROUTE = `/portal/${fleet}/${portal}`;
};

const initRouterRoot = () => {
  if (onDev) {
    return `${chooseRoot()}/`;
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
export let ROOT_ROUTE = '';
export const REACT_ROUTER_ROOT = initRouterRoot();

// support or not some old API depends on environment
// for example:
// at this moment (18.10.2016) we have 2 versions of LoginAPI.
// new one works locally and on ddsdev,
// while old one works on stage && production
// and keeped alive for old portal.
export const useLegacy = type => {
  switch (type) {
    // use old loginApi on stage and prod
    case 'login': return !onDev;
    case 'url-with-fleet': return !onDev;
    default:
      return false;
  }
};

// isDev true only on localhost
export const ENGINE_BASE = onDev ? DEV_ENGINE_BASE : PROD_ENGINE_BASE;
