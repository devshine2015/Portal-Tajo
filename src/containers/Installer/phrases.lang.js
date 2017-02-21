import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    vehicle_name: 'Vehicle Name',
    license: 'License Plate Number',
    imei: 'IMEI',
    odo_value: 'Current Odometer value',
    odo_in_miles: 'ODO value in miles',
    sending: 'sending',
    send: 'Send',
    send_success: 'Succesfully sended ✓',
    save_locally: 'Save Locally',
    saved_locally: 'Saved locally ✓',
    cannot_save_locally: 'Cannot save to your device store',
    reset: 'Reset',
  },

  th: {
    vehicle_name: 'ชื่อยานพาหนะ',
    license: 'เลขทะเบียน',
    imei: 'IMEI',
    odo_value: 'เลขมาตรระยะทางปัจจุบัน',
    odo_in_miles: 'มาตรวัดระยะทางในหน่วยไมล์',
    sending: 'กำลังส่ง',
    send: 'ส่ง',
    send_success: 'ส่งสำเร็จ ✓',
    save_locally: 'บันทึกบนหน่วยความจำ',
    saved_locally: 'บันทึกลงหน่วยความจำเครื่องแล้ว ✓',
    cannot_save_locally: 'ไม่สามารถบันทึกลงหน่วยความจำได้',
    reset: 'รีเซ็ต',
  },
};

export const phrasesShape = shape({
  vehicle_name: string.isRequired,
  license: string.isRequired,
  imei: string.isRequired,
  odo_value: string.isRequired,
  odo_in_miles: string.isRequired,
  sending: string.isRequired,
  send: string.isRequired,
  send_success: string.isRequired,
  save_locally: string.isRequired,
  saved_locally: string.isRequired,
  cannot_save_locally: string.isRequired,
  reset: string.isRequired,
});

export default phrases;
