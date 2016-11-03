import React from 'react';

const shape = React.PropTypes.shape;
const number = React.PropTypes.number;

export const amountsShape = shape({
  vehiclesAmount: number.isRequired,
  devicesAmount: number.isRequired,
  delayedAmount: number.isRequired,
  deadAmount: number.isRequired,
});

export default {
  amountsShape,
};
