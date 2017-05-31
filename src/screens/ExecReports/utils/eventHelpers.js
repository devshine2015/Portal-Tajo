
// // safe-checking
// const eventHasPos = evnt => evnt.hasOwnProperty('ev') && evnt.ev.hasOwnProperty('pos');

export const isPositionEvent = evnt => evnt.type === 'vehicle-position';
export const isTemperatureEvent = evnt => (evnt.type === 'vehicle-1wire-temperature'
  && evnt.ev.tempInfo !== undefined && !isNaN(evnt.ev.tempInfo));

export const eventPos = evnt => evnt.ev.pos.latlon;
export const eventSpeed = evnt => evnt.ev.pos.speed;

export const eventTemp = evnt => evnt.ev.tempInfo;
