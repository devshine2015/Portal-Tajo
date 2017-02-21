import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    hide_text: 'Hide',
    show_text: 'Show',
    vehicles_text: 'Vehicles',
    locations_text: 'Locations',
  },

  th: {
    hide_text: 'ซ่อน',
    show_text: 'แสดง',
    vehicles_text: 'ยานพาหนะ',
    locations_text: 'สถานที่',
  },
};

export const phrasesShape = shape({
  hide_text: string.isRequired,
  show_text: string.isRequired,
  vehicles_text: string.isRequired,
  locations_text: string.isRequired,
});

export default phrases;
