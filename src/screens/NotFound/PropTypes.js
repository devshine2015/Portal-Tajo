import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = ['not_found'];

export const phrasesShape = shape({
  not_found: string.isRequired,
});

export default phrases;
