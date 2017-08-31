import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'changing',
];

export const phrasesShape = shape({
  changing: string.isRequired,
});

export default phrases;
