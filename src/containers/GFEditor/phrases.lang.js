import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    save: 'Save',
    cancel: 'Cancel',
    home_depot: 'Is home depot',
    location_name: 'Location Name',
    address: 'Address',
    radius: 'Radius',
    send_success: 'Succesfully sended ✓',
    send_fail: 'Something went wrong. Try later',
  },

  th: {
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    home_depot: 'Is home depot',
    location_name: 'Location Name',
    address: 'Address',
    radius: 'ขนาดรัศมี',
    send_success: 'ส่งสำเร็จ ✓',
    send_fail: 'เกิดข้อผิดพลาดบางอย่าง ลองอีกครั้ง',
  },
};

export const phrasesShape = shape({
  save: string.isRequired,
  cancel: string.isRequired,
  home_depot: string.isRequired,
  location_name: string.isRequired,
  address: string.isRequired,
  radius: string.isRequired,
  send_success: string.isRequired,
  send_fail: string.isRequired,
});

export default phrases;
