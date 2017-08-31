import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'choose_fleet',
];

export const phrasesShape = shape({
  choose_fleet: string.isRequired,
});

export default phrases;
