import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    select_date_text: 'select date here',
  },

  th: {
    select_date_text: 'เลือกวันที่',
  },
};

export const phrasesShape = shape({
  select_date_text: string.isRequired,
});

export default phrases;
