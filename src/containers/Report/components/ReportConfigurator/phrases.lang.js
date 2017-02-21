import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    customise_report: 'Customise Report',
    generate_report: 'generate report',
    save_report: 'Save generated',
    customise_raw_events: 'Customise Raw Events',
  },

  th: {
    customise_report: 'รายงานกำหนดเอง',
    generate_report: 'สร้างรายงาน',
    save_report: 'บันทึกรายงาน',
    customise_raw_events: 'ข้อมูลเหตุการณ์กำหนดเอง',
  },
};

export const phrasesShape = shape({
  customise_report: string.isRequired,
  generate_report: string.isRequired,
  save_report: string.isRequired,
  customise_raw_events: string.isRequired,
});

export default phrases;
