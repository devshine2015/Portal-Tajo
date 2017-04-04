import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'change_password',
  'new_password',
  'repeat_password',
  'submit',
];

export const phrasesShape = shape({
  change_password: string.isRequired,
  new_password: string.isRequired,
  repeat_password: string.isRequired,
  submit: string.isRequired,
});

export default phrases;
