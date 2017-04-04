import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'changing',
];

export const phrasesShape = shape({
  changing: string.isRequired,
});

export default phrases;
