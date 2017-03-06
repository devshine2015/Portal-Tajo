import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    choose_date_format: 'Choose date format for the report',
  },

  th: {
    choose_date_format: 'เลือกรูปแบบวันที่สำหรับรายงาน',
  },
};

export const phrasesShape = shape({
  choose_date_format: string.isRequired,
});

export default phrases;
