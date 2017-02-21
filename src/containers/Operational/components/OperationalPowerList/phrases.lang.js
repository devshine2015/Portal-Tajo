import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    vehicles: 'vehicles',
    locations: 'locations',
    vessels: 'vessels',
  },

  th: {
    vehicles: 'ยานพาหนะ',
    locations: 'สถานที่',
    vessels: 'เรือ',
  },
};

export const phrasesShape = shape({
  vehicles: string.isRequired,
  locations: string.isRequired,
  vessels: string.isRequired,
});

export default phrases;
