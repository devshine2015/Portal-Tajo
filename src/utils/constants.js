import {
  isDev,
  onProduction,
  protocol,
} from 'configs';

export const LOCAL_STORAGE_SESSION_KEY = onProduction ? 'ngStorage-sessionId_tajo' : 'ngStorage-sessionId';
export const LOCAL_STORAGE_INSTALLER_KEY = onProduction ? 'drvr_installer_tajo' : 'drvr_installer';
export const HOST_BASE = isDev ? `${protocol}//ddsdev.cloudapp.net:8080/engine` : '/engine';
//
// -- map related stuff
export const MAPBOX_KEY = 'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
export const ZERO_LOCATION = [16.9037733, 96.1519919];
export const ZERO_ZOOM = 12;
export const NEW_GF_REQUIRED_ZOOM_LEVEL = 15;
export const NEW_GF_RADIUS = 100;
//---
export const VEHICLE_KINDS = {
  passenger: {
    value: 'PASSENGER_CAR',
    text: 'Passenger Car',
  },
  pickup: {
    value: 'PICK_UP',
    text: 'Pick-Up',
  },
  suv: {
    value: 'SUV',
    text: 'SUV',
  },
  minibus: {
    value: 'MINI_BUS',
    text: 'Minibus',
  },
  tractor: {
    value: 'TRACTOR',
    text: 'Tractor',
  },
  farm: {
    value: 'FARM',
    text: 'Farm implementation',
  },
  forklift: {
    value: 'FORKLIFT',
    text: 'Forklift',
  },
  motorcycle: {
    value: 'MOTORCYCLE',
    text: 'Motorcycle',
  },
  taxi: {
    value: 'TAXI',
    text: 'Taxi',
  },
  sgv: {
    value: 'SGV',
    text: 'Small Goods Vehicle',
  },
  sgv_chilled: {
    value: 'SGV_CHILLED',
    text: 'Small Goods Vehicle Chilled',
  },
  sgv_frozen: {
    value: 'SGV_FROZEN',
    text: 'Small Goods Vehicle Frozen',
  },
  mgv: {
    value: 'MGV',
    text: 'Medium Goods Vehicle',
  },
  mgv_chilled: {
    value: 'MGV_CHILLED',
    text: 'Medium Goods Vehicle Chilled',
  },
  mgv_frozen: {
    value: 'MGV_FROZEN',
    text: 'Medium Goods Vehicle Frozen',
  },
  hgv: {
    value: 'HGV',
    text: 'Heavy Goods Vehicle',
  },
  hgv_chilled: {
    value: 'HGV_CHILLED',
    text: 'Heavy Goods Vehicle Chilled',
  },
  hgv_frozen: {
    value: 'HGV_FROZEN',
    text: 'Heavy Goods Vehicle Frozen',
  },
};
