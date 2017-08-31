import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  logout: 'logout',
};

export const phrasesShape = shape({
  logout: string.isRequired,
});

export default phrases;
