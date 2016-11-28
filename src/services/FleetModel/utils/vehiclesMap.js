import React from 'react';
import Sgv from 'components/Icons/sgv.svg';
import SgvChilled from 'components/Icons/sgv_chilled.svg';
import SgvFrozen from 'components/Icons/sgv_frozen.svg';
import Mgv from 'components/Icons/mgv.svg';
import MgvChilled from 'components/Icons/mgv_chilled.svg';
import MgvFrozen from 'components/Icons/mgv_frozen.svg';
import Hgv from 'components/Icons/hgv.svg';
import HgvChilled from 'components/Icons/hgv_chilled.svg';
import HgvFrozen from 'components/Icons/hgv_frozen.svg';
import Minibus from 'components/Icons/minibus.svg';
import Suv from 'components/Icons/suv.svg';
import Pickup from 'components/Icons/pickup.svg';
import Sedan from 'components/Icons/sedan.svg';
import Motorcycle from 'components/Icons/motorcycle.svg';
import Taxi from 'components/Icons/taxi.svg';
import Forklift from 'components/Icons/forklift.svg';
import Tractor from 'components/Icons/tractor.svg';
import Farm from 'components/Icons/farm.svg';
import Undefined from 'components/Icons/undefined.svg';
import Boat from 'components/Icons/boat.svg';

import iSgv from 'assets/images/v_icons_combi/sgv@3x.png';
import iSgvChilled from 'assets/images/v_icons_combi/sgv_chilled@3x.png';
import iSgvFrozen from 'assets/images/v_icons_combi/sgv_frozen@3x.png';
import iMgv from 'assets/images/v_icons_combi/mgv@3x.png';
import iMgvChilled from 'assets/images/v_icons_combi/mgv_chilled@3x.png';
import iMgvFrozen from 'assets/images/v_icons_combi/mgv_frozen@3x.png';
import iHgv from 'assets/images/v_icons_combi/hgv@3x.png';
import iHgvChilled from 'assets/images/v_icons_combi/hgv_chilled@3x.png';
import iHgvFrozen from 'assets/images/v_icons_combi/hgv_frozen@3x.png';
import iMinibus from 'assets/images/v_icons_combi/minibus@3x.png';
import iSuv from 'assets/images/v_icons_combi/suv@3x.png';
import iPickup from 'assets/images/v_icons_combi/pickup@3x.png';
import iSedan from 'assets/images/v_icons_combi/sedan@3x.png';
import iMotorcycle from 'assets/images/v_icons_combi/motorcycle@3x.png';
import iTaxi from 'assets/images/v_icons_combi/taxi@3x.png';
import iForklift from 'assets/images/v_icons_combi/forklift@3x.png';
import iTractor from 'assets/images/v_icons_combi/traktor@3x.png';
import iFarm from 'assets/images/v_icons_combi/farm@3x.png';
import iUndefined from 'assets/images/v_icons_combi/uncknown@3x.png';
import iBoat from 'assets/images/v_icons_combi/boat@3x.png';

export const VEHICLE_KINDS = [
  {
    value: 'BOAT',
    text: 'Ship',
    icon: <Boat />,
    pic: iBoat,
  }, {
    value: 'FARM',
    text: 'Farm implementation',
    icon: <Farm />,
    pic: iFarm,
  }, {
    value: 'FORKLIFT',
    text: 'Forklift',
    icon: <Forklift />,
    pic: iForklift,
  }, {
    value: 'HGV',
    text: 'Heavy Goods Vehicle',
    icon: <Hgv />,
    pic: iHgv,
  }, {
    value: 'HGV_CHILLED',
    text: 'Heavy Goods Vehicle Chilled',
    icon: <HgvChilled />,
    pic: iHgvChilled,
  }, {
    value: 'HGV_FROZEN',
    text: 'Heavy Goods Vehicle Frozen',
    icon: <HgvFrozen />,
    pic: iHgvFrozen,
  }, {
    value: 'MGV',
    text: 'Medium Goods Vehicle',
    icon: <Mgv />,
    pic: iMgv,
  }, {
    value: 'MGV_CHILLED',
    text: 'Medium Goods Vehicle Chilled',
    icon: <MgvChilled />,
    pic: iMgvChilled,
  }, {
    value: 'MGV_FROZEN',
    text: 'Medium Goods Vehicle Frozen',
    icon: <MgvFrozen />,
    pic: iMgvFrozen,
  }, {
    value: 'MINI_BUS',
    text: 'Minibus',
    icon: <Minibus />,
    pic: iMinibus,
  }, {
    value: 'MOTORCYCLE',
    text: 'Motorcycle',
    icon: <Motorcycle />,
    pic: iMotorcycle,
  }, {
    value: 'PASSENGER_CAR',
    text: 'Passenger Car',
    icon: <Sedan />,
    pic: iSedan,
  }, {
    value: 'PICK_UP',
    text: 'Pick-Up',
    icon: <Pickup />,
    pic: iPickup,
  }, {
    value: 'SGV',
    text: 'Small Goods Vehicle',
    icon: <Sgv />,
    pic: iSgv,
  }, {
    value: 'SGV_CHILLED',
    text: 'Small Goods Vehicle Chilled',
    icon: <SgvChilled />,
    pic: iSgvChilled,
  }, {
    value: 'SGV_FROZEN',
    text: 'Small Goods Vehicle Frozen',
    icon: <SgvFrozen />,
    pic: iSgvFrozen,
  }, {
    value: 'SUV',
    text: 'SUV',
    icon: <Suv />,
    pic: iSuv,
  }, {
    value: 'TAXI',
    text: 'Taxi',
    icon: <Taxi />,
    pic: iTaxi,
  }, {
    value: 'TRACTOR',
    text: 'Tractor',
    icon: <Tractor />,
    pic: iTractor,
  }, {
    value: 'UNDEFINED',
    text: 'Undefined',
    icon: <Undefined />,
    pic: iUndefined,
  },
];

export function getVehicleByValue(value) {
  return VEHICLE_KINDS.filter(kind => kind.value === value)[0];
}
