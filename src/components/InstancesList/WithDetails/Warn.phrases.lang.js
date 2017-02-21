import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    never_reported: 'never reported - check device',
  },

  th: {
    never_reported: 'ไม่ส่งข้อมูล - ตรวจสอบอุปกรณ์',
  },
};

export const phrasesShape = shape({
  never_reported: string.isRequired,
});

export default phrases;
