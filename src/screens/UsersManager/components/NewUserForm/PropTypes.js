import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'password',
  'email',
  'add_new_user',
  'update',
  'create',
];

export const phrasesShape = shape({
  password: string.isRequired,
  email: string.isRequired,
  add_new_user: string.isRequired,
  update: string.isRequired,
  create: string.isRequired,
});

export default phrases;
