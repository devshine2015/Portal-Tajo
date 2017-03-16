import React from 'react';

// import Undefined from 'components/Icons/undefined.svg';
//import Undefined from 'material-ui/svg-icons/content/gesture';
import Undefined from 'material-ui/svg-icons/image/panorama-fish-eye';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';

export const _ALERT_KIND_UNDEFINED = 'undefined-alert';
export const _ALERT_KIND_TEMPERATURE = 'temperature-alert';
export const _ALERT_KIND_GF = 'geofence-alert';


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
    makeBEObject: (inState) => (
      {
        aboveTemp: Math.round(inState.maxTemp),
      }
    ),
  }, {
    value: _ALERT_KIND_GF,  // enterGF
    niceName: 'GeoFence',
    icon: <IconLocation />,
    makeBEObject: (inState) => (
      {
        gfId: inState.gfId,
        meta: {
          name: inState.name,
          onEnter: inState.onEnter.toString(),
          onExit: inState.onExit.toString(),
        },
      }
    ),

  },
];

export function getAlertByKind(value) {
  return ALERT_KINDS.filter(kind => kind.value === value)[0] || undefinedType;
}
