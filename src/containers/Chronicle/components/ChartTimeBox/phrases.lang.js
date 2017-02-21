import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    loading: 'LOADING...',
    please_wait: 'please wait',
    no_data: 'NO DATA',
    please_select_vehicle: 'please select vehicle',
    max_speed: 'Max speed',
    max_temp: 'Max temp',
    min_temp: 'Min temp',
  },

  th: {
    loading: 'กำลังโหลด...',
    please_wait: 'โปรดรอ',
    no_data: 'ไม่มีข้อมูล',
    please_select_vehicle: 'โปรดเลือกยานพาหนะ',
    max_speed: 'ความเร็วสูงสุด',
    max_temp: 'อุณหภูมิสูงสุด',
    min_temp: 'อุณหภูมิต่ำสุด',
  },
};

export const phrasesShape = shape({
  loading: string.isRequired,
  please_wait: string.isRequired,
  no_data: string.isRequired,
  please_select_vehicle: string.isRequired,
  max_speed: string.isRequired,
  max_temp: string.isRequired,
  min_temp: string.isRequired,
});

export default phrases;
