import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;
const number = React.PropTypes.number;
const bool = React.PropTypes.bool;
const arrayOf = React.PropTypes.arrayOf;
const oneOf = React.PropTypes.oneOf;

export const vehicleOriginalShape = shape({
  id: string.isRequired,
  name: string,
  licensePlate: string.isRequired,
  make: string,
  model: string,
  year: string,
  created: string.isRequired,
  updated: string,
  kind: string,
  odometer: shape({
    value: number.isRequired,
    updated: string,
  }),
  deviceId: string,
  status: string.isRequired,
});

export const vehicleShape = shape({
  // taken from original.id
  id: string.isRequired,

  // original data from backend
  original: vehicleOriginalShape.isRequired,

  // true if not mathed search string and/or filter parameters.
  // usually updates by user input
  filteredOut: bool.isRequired,

  // latest coordinates of the vehicle taken from vehicle's stats,
  // [0, 0] if not defined.
  // updates by websocket
  pos: arrayOf(number).isRequired,

  // latest speed of the vehicle.
  // Km/h
  // 0 if not defined.
  // updates by websocket
  speed: number.isRequired,

  // distances passed by the vehicle
  dist: shape({
    // total amount of meters passed by vehicle.
    // meters
    total: number.isRequired,

    // amount of meters passed by vehicle since the last stop (?)
    // meters
    lastTrip: number,
  }).isRequired,

  // latest temperature provided by device.
  // ºC,
  // undefined by default.
  // updates by websocket.
  temp: number,

  // timestamp of the date
  // when last websocket event came for the vehicle.
  // made from original timestring passed from backend.
  lastUpdateSinceEpoch: number.isRequired,

  // true, if ws message don't have position.
  // updates by websocket.
  isDead: bool.isRequired,

  // true if delta between now() and lastUpdateSinceEpoch
  // more than some predefined threshold for delayed vehicles
  // and less for zombie
  // false by default
  isDelayed: bool.isRequired,

  // TODO - define the property
  // false dy default
  isDelayedWithIgnitionOff: bool.isRequired,

  // flag defining one of the possible cases
  // 0 - ignition off,
  // 1 - ignition on,
  // 2 - undefined.
  // TODO: what should be initilal ign status?
  // 1 by default
  ignitionOn: oneOf([0, 1, 2]).isRequired,

  // TODO - define the property.
  // 1 by default
  timeSinceUpdateMin: number.isRequired,

  // for maritime (?)
  // TODO - define the property.
  // 10 by default
  estimatedTravelKm: number.isRequired,
});
