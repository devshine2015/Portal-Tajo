import drvrStorage from 'utils/drvrStorage';
import * as _configHelpers from './_helpers';

// const DEV_ENGINE_BASE = 'ddsdev.cloudapp.net:8080'; // for dev testing
const DEV_ENGINE_BASE = 'drvrstage.cloudapp.net:8080'; // for stage testing
// const DEV_ENGINE_BASE = 'drvrapp.net'; // for prod testing
const REMOTE_HOST_BASE = window.location.host;

export const version = process.env.DRVR_VERSION;
export const project = process.env.DRVR_PROJECT;
// TODO: we are in the middle of renaming tajo->escape; update here when done
export const isEscape = project === 'tajo';
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

export const protocol = onProduction ? 'https:' : window.location.protocol;
export const isSecure = protocol.search('https') !== -1;
export const socketProtocol = isSecure ? 'wss:' : 'ws:';

export const DRVR_PROFILE_KEY = 'drvr:profile';
export const DRVR_PROFILE_LAST_KEY = 'drvr:profile:last';

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

const features = {
  auth0Full: false,
  extraPath: false,
  restorePassword: false,
};
export function isFeatureSupported(feature) {
  return features[feature] || false;
}

export function setFeature(name, value) {
  features[name] = value;
}

export function setFeatures(feats = {}) {
  Object.assign(features, feats);
}

const bold = 'font-weight: 700';
const boldGreen = 'font-weight: 700; color: green;';

console.log(`%cCurrent version: %c${version}`, bold, boldGreen);
console.log(`%cServer env: %c${serverEnv}`, bold, boldGreen);
console.log(`%cProject: %c${project}`, bold, boldGreen);

const getExtraPathname = (location) => {
  const splitted = location.pathname.split('/');
  const result = splitted.filter(path => ['mwa', 'cc'].indexOf(path) !== -1);

  return result.length !== 0 ? result[0] : false;
};

export const init = () => {
  window.drvrStorage = drvrStorage.init(window.localStorage);

  setFeatures({
    auth0Full: onStage,
    restorePassword: false,
    extraPath: getExtraPathname(window.location),
  });
};
