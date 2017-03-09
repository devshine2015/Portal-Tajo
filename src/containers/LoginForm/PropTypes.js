import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  username: 'Username',
  password: 'Password',
  login: 'Login',
  signin: 'Sign in',
  signing: 'signing',
};

export const phrasesShape = shape({
  username: string.isRequired,
  password: string.isRequired,
  login: string.isRequired,
  signin: string.isRequired,
});

export default phrases;
