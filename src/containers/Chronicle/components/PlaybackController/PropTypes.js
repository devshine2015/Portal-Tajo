import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    pause: 'Pause',
    play: 'Play',
  },

  th: {
    pause: 'หยุด',
    play: 'เล่น',
  },
};

export const phrasesShape = shape({
  pause: string.isRequired,
  play: string.isRequired,
});

export default phrases;
