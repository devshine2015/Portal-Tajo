import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

export default ['profile'];

export const phrasesShape = shape({
  profile: string.isRequired,
});
