export const LOCAL_STORAGE_INSTALLER_KEY = 'drvr_tajo-installer';
//
// -- map related stuff
export const MAPBOX_KEY = 'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
export const ZERO_LOCATION = [16.9037733, 96.1519919];
export const ZERO_ZOOM = 12;
export const NEW_GF_REQUIRED_ZOOM_LEVEL = 15;
export const NEW_GF_RADIUS = 100;
//---
export const ZOMBIE_TIME_TRH_MS = 1000 * 60 * 60 * 24; // 24h
export const LAG_INDICAION_TRH_MS = 1000 * 60 * 5; // 5min
//
// TODO: put those convertion helpers to some separate place
//---------------------------------------------------------------------------
// converting speed kmH to knots
// 1 knot is 1.852 kilometres per hour
export function speedKmHToKnots(speedKmH) {
  return speedKmH / 1.852;
}
// convert decimal degrees to DegriesMinutesSeconds
// example: 16°25'21.1"N 96°27'53.9"E
// Decimal Degrees = Degrees + minutes/60 + seconds/3600
export function decimalDegToDMS(decDeg, isLng) {
  const dir = decDeg < 0 ? (isLng ? 'W' : 'S') : (isLng ? 'E' : 'N');
  const deg = decDeg < 0 ? -decDeg : decDeg;
  const d = Math.floor(deg);
  const minfloat = (deg - d) * 60;
  const m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;
  return `${d}\xB0${m}\'${secfloat.toFixed(2)}"${dir}`;
}
