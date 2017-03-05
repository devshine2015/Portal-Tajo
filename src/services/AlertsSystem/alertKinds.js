import React from 'react';

import Sgv from 'components/Icons/sgv.svg';
import SgvChilled from 'components/Icons/sgv_chilled.svg';
import SgvFrozen from 'components/Icons/sgv_frozen.svg';
import Undefined from 'components/Icons/undefined.svg';

import iSgv from 'assets/images/v_icons_combi/sgv@3x.png';
import iSgvChilled from 'assets/images/v_icons_combi/sgv_chilled@3x.png';
import iSgvFrozen from 'assets/images/v_icons_combi/sgv_frozen@3x.png';
import iUndefined from 'assets/images/v_icons_combi/uncknown@3x.png';

const undefinedType = {
  value: 'UNDEFINED',
  icon: <Undefined />,
  pic: iUndefined,
};

export const ALERT_KINDS = [
  {
    value: 'TEMPERATURE',
    icon: <SgvFrozen />,
    pic: iSgvFrozen,
  }, {
    value: 'SPEED',
    icon: <Sgv />,
    pic: iSgv,
  }, {
    value: 'ENTER_GF',
    icon: <SgvChilled />,
    pic: iSgvChilled,
  }, {
    value: 'EXIT_GF',
    icon: <SgvChilled />,
    pic: iSgvChilled,
  },
];

export function getAlertByValue(value) {
  return ALERT_KINDS.filter(kind => kind.value === value)[0] || undefinedType;
}
