import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    lat: 'lat',
    lng: 'lng',
  },

  th: {
    lat: 'ละติจูด',
    lng: 'ลองติจูด',
  },
};

export const phrasesShape = shape({
  lat: string.isRequired,
  lng: string.isRequired,
});

export default phrases;
