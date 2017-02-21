import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    speed: 'speed',
    speed_km_h: 'km/h',
    temperature: 'temperature',
    never_reported: 'never reported - check device',
    remove_success: 'Succesfully removed',
    remove_fail: 'Remove failed',
    radius: 'Radius',
    address: 'Address',
    delete: 'Delete',
    no_data: 'no data...',
  },

  th: {
    speed: 'ความเร็ว',
    speed_km_h: 'กม./ชม.',
    temperature: 'อุณหภูมิ',
    never_reported: 'ไม่ส่งข้อมูล - ตรวจสอบอุปกรณ์',
    remove_success: 'ลบสำเร็จ',
    remove_fail: 'ลบไม่สำเร็จ',
    radius: 'ขนาดรัศมี',
    address: 'Address',
    delete: 'ลบ',
    no_data: 'ไม่มีข้อมูล...',
  },
};

const _warnings = {
  never_reported: string.isRequired,
};

const _vehicleDetailsShape = {
  speed: string.isRequired,
  speed_km_h: string.isRequired,
  temperature: string.isRequired,
};

const _gfDetailsShape = {
  remove_success: string.isRequired,
  remove_fail: string.isRequired,
  radius: string.isRequired,
  address: string.isRequired,
  delete: string.isRequired,
};

const _historyDetailsShape = {
  no_data: string.isRequired,
};

export const vehicleDetailsShape = shape(_vehicleDetailsShape);
export const warningsShape = shape(_warnings);
export const gfDetailsShape = shape(_gfDetailsShape);
export const historyDetailsShape = shape(_historyDetailsShape);

export const phrasesShape = shape(
  Object.assign({},
    _vehicleDetailsShape,
    _warnings,
    _gfDetailsShape,
    _historyDetailsShape,
  )
);

export default phrases;
