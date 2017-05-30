import * as _configHelpers from './_helpers';

const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080'; // for localhost
// const DEV_ENGINE_BASE = 'drvrstage.cloudapp.net:8080'; // for stage
// const DEV_ENGINE_BASE = 'drvrapp.net'; // for prod
const REMOTE_HOST_BASE = window.location.host;

// support or not some old stuff depends on environment
// for example:
// at 18.10.2016 we have had 2 versions of LoginAPI.
// new one works locally and on ddsdev,
// while old one works on stage && production
// and keeped alive for old portal.
export const useLegacy = type => {
  switch (type) {
    default:
      return false;
  }
};

export const version = process.env.DRVR_VERSION;
export const portal = process.env.DRVR_PROJECT;
export const protocol = document.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss' : 'ws';
// TODO: we are in the middle of renaming tajo->escape; update here when done
export const isEscape = portal === 'tajo';
// export const isSunshine = !isEscape;

// environments definitions
export const serverEnv = _configHelpers.chooseServerEnv();
export const onProduction = serverEnv === 'production';
export const onStage = serverEnv === 'stage';
export const onDev = serverEnv === 'dev';
export const onLocal = serverEnv === 'local';

export const LOCAL_STORAGE_SESSION_KEY = 'drvr_tajo-sessionId';

// use to initiate root for react-router
export const ROOT_ROUTE = _configHelpers.chooseRoot(serverEnv, portal);

// use it for navigation throught app
export const BASE_URL = ROOT_ROUTE === '/' ? '' : ROOT_ROUTE;

// onLocal true only on localhost
export const ENGINE_BASE = onLocal ? DEV_ENGINE_BASE : REMOTE_HOST_BASE;

// TODO: this is to toggle alerts while in development
// remove this when Alerts System done/released
export let isAlerts = true;

// TODO: this is runtime, defined after login; should be in some other place
// TODO: now for dev/test hardcoded value
// TODO: probably this should be undef initially - handle it properly?
// is it used before being set?

export let isMaritime = false;
export let isMwa = false;
export const checkSetMwa = (itIsMwa = undefined) => {
  // set ismwa if argument exist
  if (itIsMwa !== undefined) {
    if (typeof itIsMwa === 'string') {
      isMwa = itIsMwa.indexOf('mwa') !== -1;
    } else if (typeof itIsMwa === 'boolean') {
      isMwa = itIsMwa;
    }
    // isMwa = true;
    // isAlerts = isMwa;
  }
};

export function checkSetMaritime(fleetName) {
  isMaritime = fleetName.indexOf('maritime') !== -1;
}

// TODO: quick fix - just doubled prev limit - need some proven number
// TODO: currently using same for hisotry (24hvr) and reports (arbitrary time range)
// probably need something like limitPer24hvrs
export const requestSamplesLimit = 40000;

console.log(`Current version is ${version}`);
console.log(`Server env is ${serverEnv}, and project is ${portal}`);
console.log(`Root toute is ${ROOT_ROUTE}`);
