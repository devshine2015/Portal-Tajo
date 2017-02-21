import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    fleet_summary_title: 'fleet summary',
  },

  th: {
    fleet_summary_title: 'ภาพรวมกลุ่มยานพาหนะ',
  },
};

export const phrasesShape = shape({
  fleet_summary_title: string.isRequired,
});

export default phrases;
