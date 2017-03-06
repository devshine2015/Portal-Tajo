import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  search_placeholder: 'search',
};

export const phrasesShape = shape({
  search_placeholder: string.isRequired,
});

export default phrases;
