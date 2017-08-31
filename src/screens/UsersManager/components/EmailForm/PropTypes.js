import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'new_email',
  'change_email',
  'submit',
  'cancel',
];

export const phrasesShape = shape({
  new_email: string.isRequired,
  change_email: string.isRequired,
  submit: string.isRequired,
  cancel: string.isRequired,
});

export default phrases;
