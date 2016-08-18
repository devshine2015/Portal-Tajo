import {
  isDev,
  onProduction,
} from 'configs';

export const LOCAL_STORAGE_SESSION_KEY = onProduction ? 'ngStorage-sessionId_tajo' : 'ngStorage-sessionId';
export const LOCAL_STORAGE_INSTALLER_KEY = onProduction ? 'drvr_installer_tajo' : 'drvr_installer';
export const HOST_BASE = isDev ? 'ddsdev.cloudapp.net:8080/engine' : `${window.location.hostname}/engine`;
export const ZERO_LOCATION = [16.9037733, 96.1519919];
