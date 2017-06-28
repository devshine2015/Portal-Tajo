import * as _configHelpers from './_helpers';

const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080'; // for dev testing
// const DEV_ENGINE_BASE = 'drvrstage.cloudapp.net:8080'; // for stage testing
// const DEV_ENGINE_BASE = 'drvrapp.net'; // for prod testing
const REMOTE_HOST_BASE = window.location.host;

export const version = process.env.DRVR_VERSION;
export const portal = process.env.DRVR_PROJECT;
export const protocol = window.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss:' : 'ws:';
// TODO: we are in the middle of renaming tajo->escape; update here when done
export const isEscape = portal === 'tajo';
// export const isSunshine = !isEscape;

/**
 * the url of remote server. In case of running locally
 * it could be any server.
 * @const {DEV_ENGINE_BASE} serve as a endpoint to server you want to test during development.
 * @const {REMOTE_HOST_BASE} is any remote environment
 */
export const ENGINE_BASE = _configHelpers.isRunningOnLocalhost() ? DEV_ENGINE_BASE : REMOTE_HOST_BASE;

/**
 * store name of server environment
 */
export const serverEnv = _configHelpers.chooseServerEnv(ENGINE_BASE);

export const onProduction = serverEnv === 'production';
export const onStage = serverEnv === 'stage';
export const onDev = serverEnv === 'dev';

export const LOCAL_STORAGE_SESSION_KEY = 'drvr_tajo-sessionId';

// use to initiate root for react-router
export const ROOT_ROUTE = _configHelpers.chooseRoot(serverEnv, portal);

// use it for navigation throught app
export const BASE_URL = ROOT_ROUTE === '/' ? '' : ROOT_ROUTE;

// TODO: this is to toggle alerts while in development
// remove this when Alerts System done/released
export let isAlerts = true;

export let isNoIcons = false;

// TODO: this is runtime, defined after login; should be in some other place
// TODO: now for dev/test hardcoded value
// TODO: probably this should be undef initially - handle it properly?
// is it used before being set?

export let isMaritime = false;
export let isMwa;
export const setMwa = (itIsMwa = undefined) => {
  // set ismwa if argument exist
  if (itIsMwa !== undefined) {
    if (typeof itIsMwa === 'string') {
      isMwa = itIsMwa === 'mwa';
    } else if (typeof itIsMwa === 'boolean') {
      isMwa = itIsMwa;
    }
  }
};

export function checkSetMaritime(fleetName) {
  isMaritime = fleetName.indexOf('maritime') !== -1;
}

//
// TODO: this shoulc be set in configs/profile, saved locally
// for now - always enabling for CIPTA
export function checkSetNoIcons(fleetName) {
  isNoIcons = fleetName.indexOf('cipta') !== -1;
}


// TODO: quick fix - just doubled prev limit - need some proven number
// TODO: currently using same for hisotry (24hvr) and reports (arbitrary time range)
// probably need something like limitPer24hvrs
export const requestSamplesLimit = 40000;

const bold = 'font-weight: 700';
const boldGreen = 'font-weight: 700; color: green;';

console.log(`%cCurrent version: %c${version}`, bold, boldGreen);
console.log(`%cServer env: %c${serverEnv}`, bold, boldGreen);
console.log(`%cProject: %c${portal}`, bold, boldGreen);
