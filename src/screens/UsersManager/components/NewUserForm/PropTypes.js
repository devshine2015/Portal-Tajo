import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'choose_role',
  'password',
  'email',
  'add_new_user',
  'update',
  'create',
];

export const phrasesShape = shape({
  choose_role: string.isRequired,
  password: string.isRequired,
  email: string.isRequired,
  add_new_user: string.isRequired,
  update: string.isRequired,
  create: string.isRequired,
});

export default phrases;
