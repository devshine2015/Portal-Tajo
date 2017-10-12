
// // safe-checking
// const eventHasPos = evnt => evnt.hasOwnProperty('ev') && evnt.ev.hasOwnProperty('pos');

import { extractFuelNormalized } from 'services/FleetModel/utils/vehicleHelpers';


export const isPositionEvent = evnt => evnt.type === 'vehicle-position';
export const isFuelEvent = evnt => evnt.type === 'vehicle-fuel';
export const isTemperatureEvent = evnt => (evnt.type === 'vehicle-1wire-temperature'
  && evnt.ev.tempInfo !== undefined && !isNaN(evnt.ev.tempInfo));

export const eventPos = evnt => evnt.ev.pos.latlon;
export const eventSpeed = evnt => evnt.ev.pos.speed;
export const eventTemp = evnt => evnt.ev.tempInfo;
export const eventFuel = evnt => extractFuelNormalized(evnt.ev.fuelInfo);
export const eventCalculatedDeltaM = evnt => (evnt.calculatedDeltaM !== undefined ? evnt.calculatedDeltaM : 0);


export const eventSetCalculatedDeltaM = (evnt, deltaM) => { evnt.calculatedDeltaM = deltaM; };
