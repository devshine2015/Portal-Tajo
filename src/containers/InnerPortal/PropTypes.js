import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;
const number = PropTypes.number;
const arrayOf = PropTypes.arrayOf;

export default shape({
  name: string.isRequired,
  index: number.isRequired,
  path: string.isRequired,
  excludeRoles: arrayOf(string),
  includeRoles: arrayOf(string),
});
