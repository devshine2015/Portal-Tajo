import {
  isDev,
  onProduction,
  protocol,
} from 'configs';

export const LOCAL_STORAGE_SESSION_KEY = onProduction ? 'ngStorage-sessionId_tajo' : 'ngStorage-sessionId';
export const LOCAL_STORAGE_INSTALLER_KEY = onProduction ? 'drvr_installer_tajo' : 'drvr_installer';
export const HOST_BASE = isDev ? 'ddsdev.cloudapp.net:8080/engine' : `${window.location.host}/engine`;
//
// -- map related stuff
export const MAPBOX_KEY = 'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
export const ZERO_LOCATION = [16.9037733, 96.1519919];
export const ZERO_ZOOM = 12;
export const NEW_GF_REQUIRED_ZOOM_LEVEL = 15;
export const NEW_GF_RADIUS = 100;
//---
export const ZOMBIE_TIME_TRH_MINUTES = 90;
//---
