import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    send_success: 'Succesfully sended ✓',
    send_fail: 'Something went wrong. Try later',
    clean_success: 'Succesfully cleaned ✓',
  },

  th: {
    send_success: 'ส่งสำเร็จ ✓',
    send_fail: 'เกิดข้อผิดพลาดบางอย่าง ลองอีกครั้ง',
    clean_success: 'ล้างสำเร็จ ✓',
  },
};

export const phrasesShape = shape({
  send_success: string.isRequired,
  send_fail: string.isRequired,
  clean_success: string.isRequired,
});

export default phrases;
