import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = ['something_went_wrong'];

export const phrasesShape = shape({
  something_went_wrong: string.isRequired,
});

export default phrases;
