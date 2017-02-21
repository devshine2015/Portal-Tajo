import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    send_success: 'Succesfully sended ✓',
    send_fail: 'Something went wrong. Try later',
  },

  th: {
    send_success: 'ส่งสำเร็จ ✓',
    send_fail: 'เกิดข้อผิดพลาดบางอย่าง ลองอีกครั้ง',
  },
};

export const phrasesShape = shape({
  send_success: string.isRequired,
  send_fail: string.isRequired,
});

export default phrases;
