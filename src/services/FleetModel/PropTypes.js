import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;
const number = React.PropTypes.number;

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
