import * as _configHelpers from './_helpers';

const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080'; // for localhost
const REMOTE_HOST_BASE = window.location.host;

// support or not some old stuff depends on environment
// for example:
// at 18.10.2016 we have had 2 versions of LoginAPI.
// new one works locally and on ddsdev,
// while old one works on stage && production
// and keeped alive for old portal.
export const useLegacy = type => {
  switch (type) {
    case 'session-key': return portal === 'ssreports';
    default:
      return false;
  }
};

export const portal = process.env.DRVR_PROJECT;
export const protocol = document.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss' : 'ws';
// TODO: we are in the middle on renaming tajo->escape; update here when done
export const isEscape = portal === 'tajo';
// export const isSunshine = !isEscape;

// environments definitions
export const serverEnv = _configHelpers.chooseServerEnv();
export const onProduction = serverEnv === 'production';
export const onStage = serverEnv === 'stage';
export const onDev = serverEnv === 'dev';
export const onLocal = serverEnv === 'local';

// use old local storage key notation for ssreports
export const LOCAL_STORAGE_SESSION_KEY = useLegacy('session-key') ?
  'ngStorage-sessionId' : 'drvr_tajo-sessionId';

// use to initiate root for react-router
export const ROOT_ROUTE = _configHelpers.chooseRoot(serverEnv, portal);

// use it for navigation throught app
export const BASE_URL = ROOT_ROUTE === '/' ? '' : ROOT_ROUTE;

// isDev true only on localhost
export const ENGINE_BASE = onLocal ? DEV_ENGINE_BASE : REMOTE_HOST_BASE;

// TODO: this is runtime, defined after login; should be in some other place
// TODO: now for dev/test hardcoded value
// TODO: probably this should be undef initially - handle it properly?
// is it used before being set?

export let isMaritime = false;
export function checkSetMaritime(fleetName) {
  isMaritime = fleetName.indexOf('maritime') !== -1;
  // isMaritime = true;
}

// TODO: quick fix - just doubled prev limit - need some proven number
// TODO: currently using same for hisotry (24hvr) and reports (arbitrary time range)
// probably need something like limitPer24hvrs
export const requestSamplesLimit = 40000;

console.log(`Server env is ${serverEnv}, and project is ${portal}`);
console.log(`Root toute is ${ROOT_ROUTE}`);
