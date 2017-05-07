import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  home_depot: 'Is home depot',
  location_name: 'Location Name',
  address: 'Address',
  radius: 'Radius',
  send_success: 'Succesfully sended ✓',
  send_fail: 'Something went wrong. Try later',
};

export const phrasesShape = shape({
  home_depot: string.isRequired,
  location_name: string.isRequired,
  address: string.isRequired,
  radius: string.isRequired,
  send_success: string.isRequired,
  send_fail: string.isRequired,
});

export default phrases;
