import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  customise_report: 'Customise Report',
  generate_report: 'generate report',
  save_report: 'Save generated',
  customise_raw_events: 'Customise Raw Events',
};

export const phrasesShape = shape({
  customise_report: string.isRequired,
  generate_report: string.isRequired,
  save_report: string.isRequired,
  customise_raw_events: string.isRequired,
});

export default phrases;
