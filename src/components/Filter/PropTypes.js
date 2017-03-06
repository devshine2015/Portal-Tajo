import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    search_placeholder: 'search',
  },

  th: {
    search_placeholder: 'ค้นหา',
  },
};

export const phrasesShape = shape({
  search_placeholder: string.isRequired,
});

export default phrases;
