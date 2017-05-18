
// // safe-checking
// const eventHasPos = evnt => evnt.hasOwnProperty('ev') && evnt.ev.hasOwnProperty('pos');

export const isPositionEvent = evnt => evnt.type === 'vehicle-position';

export const eventPos = evnt => evnt.ev.pos.latlon;

export const eventSpeed = evnt => evnt.ev.pos.speed;
