import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  pause: 'Pause',
  play: 'Play',
};

export const phrasesShape = shape({
  pause: string.isRequired,
  play: string.isRequired,
});

export default phrases;
