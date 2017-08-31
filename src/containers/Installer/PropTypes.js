import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
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
