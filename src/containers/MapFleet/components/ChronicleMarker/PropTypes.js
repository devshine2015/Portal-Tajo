import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  lat: 'lat',
  lng: 'lng',
};

export const phrasesShape = shape({
  lat: string.isRequired,
  lng: string.isRequired,
});

export default phrases;
