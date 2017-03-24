import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'cancel',
];

export const phrasesShape = shape({
  cancel: string.isRequired,
});

export default phrases;
