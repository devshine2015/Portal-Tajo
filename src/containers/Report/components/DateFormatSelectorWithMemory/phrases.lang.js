import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    choose_date_format: 'Choose date format for the report',
    remember_choice: 'Remember my choice',
    forget_choice: 'Forget my choice',
  },

  th: {
    choose_date_format: 'เลือกรูปแบบวันที่สำหรับรายงาน',
    remember_choice: 'จำการตั้งค่า',
    forget_choice: 'ล้างการตั้งค่า',
  },
};

export const phrasesShape = shape({
  choose_date_format: string.isRequired,
  remember_choice: string.isRequired,
  forget_choice: string.isRequired,
});

export default phrases;
