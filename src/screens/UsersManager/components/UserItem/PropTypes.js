import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'role',
  'close',
  'details',
  'delete',
  'last_login',
  'never',
  'confirm_delete_str1',
  'confirm_delete_str2',
  'confirm',
  'cancel',
];

export const phrasesShape = shape({
  role: string.isRequired,
  details: string.isRequired,
  close: string.isRequired,
  delete: string.isRequired,
  last_login: string.isRequired,
  never: string.isRequired,
  confirm_delete_str1: string.isRequired,
  confirm_delete_str2: string.isRequired,
  confirm: string.isRequired,
  cancel: string.isRequired,
});

export default phrases;
