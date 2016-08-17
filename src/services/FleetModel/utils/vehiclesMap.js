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

export const VEHICLE_KINDS = [
  {
    value: 'FARM',
    text: 'Farm implementation',
    icon: <Farm />,
  }, {
    value: 'FORKLIFT',
    text: 'Forklift',
    icon: <Forklift />,
  }, {
    value: 'HGV',
    text: 'Heavy Goods Vehicle',
    icon: <Hgv />,
  }, {
    value: 'HGV_CHILLED',
    text: 'Heavy Goods Vehicle Chilled',
    icon: <HgvChilled />,
  }, {
    value: 'HGV_FROZEN',
    text: 'Heavy Goods Vehicle Frozen',
    icon: <HgvFrozen />,
  }, {
    value: 'MGV',
    text: 'Medium Goods Vehicle',
    icon: <Mgv />,
  }, {
    value: 'MGV_CHILLED',
    text: 'Medium Goods Vehicle Chilled',
    icon: <MgvChilled />,
  }, {
    value: 'MGV_FROZEN',
    text: 'Medium Goods Vehicle Frozen',
    icon: <MgvFrozen />,
  }, {
    value: 'MINI_BUS',
    text: 'Minibus',
    icon: <Minibus />,
  }, {
    value: 'MOTORCYCLE',
    text: 'Motorcycle',
    icon: <Motorcycle />,
  }, {
    value: 'PASSENGER_CAR',
    text: 'Passenger Car',
    icon: <Sedan />,
  }, {
    value: 'PICK_UP',
    text: 'Pick-Up',
    icon: <Pickup />,
  }, {
    value: 'SGV',
    text: 'Small Goods Vehicle',
    icon: <Sgv />,
  }, {
    value: 'SGV_CHILLED',
    text: 'Small Goods Vehicle Chilled',
    icon: <SgvChilled />,
  }, {
    value: 'SGV_FROZEN',
    text: 'Small Goods Vehicle Frozen',
    icon: <SgvFrozen />,
  }, {
    value: 'SUV',
    text: 'SUV',
    icon: <Suv />,
  }, {
    value: 'TAXI',
    text: 'Taxi',
    icon: <Taxi />,
  }, {
    value: 'TRACTOR',
    text: 'Tractor',
    icon: <Tractor />,
  },
];

export function getVehicleByValue(value) {
  return VEHICLE_KINDS.filter(kind => kind.value === value)[0];
}
