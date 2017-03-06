import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  vehicles_amount: 'vehicles in fleet',
  never_reported: 'vehicles never reported',
};

export const phrasesShape = shape({
  vehicles_amount: string.isRequired,
  never_reported: string.isRequired,
});

export default phrases;
