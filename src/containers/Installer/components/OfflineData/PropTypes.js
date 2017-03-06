import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  send_success: 'Succesfully sended ✓',
  send_fail: 'Something went wrong. Try later',
  clean_success: 'Succesfully cleaned ✓',
};

export const phrasesShape = shape({
  send_success: string.isRequired,
  send_fail: string.isRequired,
  clean_success: string.isRequired,
});

export default phrases;
