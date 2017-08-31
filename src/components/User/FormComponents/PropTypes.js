import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'cancel',
];

export const phrasesShape = shape({
  cancel: string.isRequired,
});

export default phrases;
