import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'email',
  'change_email',
  'verified',
  'password',
  'change_password',
];

export const phrasesShape = shape({
  email: string.isRequired,
  change_email: string.isRequired,
  verified: string.isRequired,
  password: string.isRequired,
  change_password: string.isRequired,
});

export default phrases;
