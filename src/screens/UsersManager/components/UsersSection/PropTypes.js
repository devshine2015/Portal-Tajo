import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = ['add_user', 'users'];

export const phrasesShape = shape({
  add_user: string.isRequired,
  users: string.isRequired,
});

export default phrases;
