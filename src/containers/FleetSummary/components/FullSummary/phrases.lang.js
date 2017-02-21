import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    vehicles_amount: 'vehicles in fleet',
    never_reported: 'vehicles never reported',
  },

  th: {
    vehicles_amount: 'คัน ในฟลีท',
    never_reported: 'คัน ไม่ส่งข้อมูล',
  },
};

export const phrasesShape = shape({
  vehicles_amount: string.isRequired,
  never_reported: string.isRequired,
});

export default phrases;
