import React from 'react';

// import Sgv from 'components/Icons/sgv.svg';
// import SgvFrozen from 'components/Icons/sgv_frozen.svg';
import Undefined from 'components/Icons/undefined.svg';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';

export const _ALERT_KIND_UNDEFINED = 'undefined-alert';
export const _ALERT_KIND_TEMPERATURE = 'temperature-alert';
export const _ALERT_KIND_GF_ENTER = 'geofence-alert';


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
    value: _ALERT_KIND_GF_ENTER,  // enterGF
    niceName: 'Enter GF',
    icon: <IconLocation />,
    makeBEObject: (inState) => (
      {
        gfId: inState.gfId,
      }
    ),

  },
];

export function getAlertByKind(value) {
  return ALERT_KINDS.filter(kind => kind.value === value)[0] || undefinedType;
}
