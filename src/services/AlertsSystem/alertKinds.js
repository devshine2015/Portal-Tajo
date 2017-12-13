import React from 'react';

// import Undefined from 'components/Icons/undefined.svg';
// import Undefined from 'material-ui/svg-icons/content/gesture';
import Undefined from 'material-ui/svg-icons/image/panorama-fish-eye';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';
import IconOverSpeed from 'material-ui/svg-icons/maps/directions-run';
import IconOdo from 'material-ui/svg-icons/notification/network-check';
import IconIdle from 'material-ui/svg-icons/av/snooze';
import IconTime from 'material-ui/svg-icons/action/watch-later';
import IconFuel from 'material-ui/svg-icons/maps/local-gas-station';
import IconSun from 'material-ui/svg-icons/image/wb-sunny';

export const _ALERT_KIND_UNDEFINED = 'undefined-alert';
export const _ALERT_KIND_TEMPERATURE = 'temperature-alert';
export const _ALERT_KIND_GF = 'geofence-alert';
export const _ALERT_KIND_SPEEDING = 'speeding-alert';
export const _ALERT_KIND_ODO = 'odometer-alert';
export const _ALERT_KIND_IDLE = 'idling-alert';
export const _ALERT_KIND_DRIVE_TIME = 'drive-time-alert';
export const _ALERT_KIND_FUEL_DIFF = 'fuel-diff-alert';
export const _ALERT_KIND_FUEL_GAIN = 'fuel-inc-alert';
export const _ALERT_KIND_FUEL_LOSS = 'fuel-dec-alert';
export const _ALERT_KIND_ENGINE_TEMP = 'engine-temp-alert';

const undefinedType = {
  value: _ALERT_KIND_UNDEFINED,
  icon: <Undefined />,
};

export const ALERT_KINDS = [
  {
    value: _ALERT_KIND_TEMPERATURE,
    niceName: 'Temperature',
    icon: <IconSnow />,
    // making back-end object for particular kind
    makeBEObject: inState => (
      {
        aboveTemp: Math.round(inState.maxTemp),
      }
    ),
  }, {
    value: _ALERT_KIND_GF, // enterGF
    niceName: 'GeoFence',
    icon: <IconLocation />,
    makeBEObject: inState => (
      {
        gfId: inState.gfId,
        meta: {
          name: inState.name,
          onEnter: inState.onEnter.toString(),
          onExit: inState.onExit.toString(),
        },
      }
    ),
  }, {
    value: _ALERT_KIND_SPEEDING,
    niceName: 'Speeding',
    icon: <IconOverSpeed />,
    makeBEObject: inState => (
      {
        maxSpeed: Math.round(inState.maxSpeed),
      }
    ),
  }, {
    value: _ALERT_KIND_ODO,
    niceName: 'Odometer',
    icon: <IconOdo />,
    makeBEObject: inState => (
      {
        odoValue: Math.round(inState.odoValue),
      }
    ),
  }, {
    value: _ALERT_KIND_IDLE,
    niceName: 'Idling',
    icon: <IconIdle />,
    makeBEObject: inState => (
      {
        odoValue: Math.round(inState.odoValue),
      }
    ),
  }, {
    value: _ALERT_KIND_DRIVE_TIME,
    niceName: 'Drive Time',
    icon: <IconTime />,
    makeBEObject: inState => (
      {
        driveTimeSec: inState.driveTimeSec,
      }
    ),
  }, {
    value: _ALERT_KIND_FUEL_DIFF,
    niceName: 'Fuel',
    icon: <IconFuel />,
    makeBEObject: inState => (
      {
        percentDiff: Math.round(inState.fuelDiff),
      }
    ),
  }, {
    value: _ALERT_KIND_FUEL_GAIN,
    niceName: 'Fuel Gain',
    icon: <IconFuel />,
    makeBEObject: inState => (
      {
        fuelThreshold: Math.round(inState.fuelDiff),
      }
    ),
  }, {
    value: _ALERT_KIND_FUEL_LOSS,
    niceName: 'Fuel Loss',
    icon: <IconFuel />,
    makeBEObject: inState => (
      {
        fuelThreshold: Math.round(inState.fuelDiff),
      }
    ),
  }, {
    value: _ALERT_KIND_ENGINE_TEMP,
    niceName: 'Engine Temperature',
    icon: <IconSun />,
    makeBEObject: inState => (
      {
        maxTemp: Math.round(inState.maxTemp),
      }
    ),
  }];

export function getAlertByKind(value) {
  return ALERT_KINDS.filter(kind => kind.value === value)[0] || undefinedType;
}
