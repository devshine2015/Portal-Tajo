import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  vehicles: 'vehicles',
  locations: 'locations',
  vessels: 'vessels',
};

export const phrasesShape = shape({
  vehicles: string.isRequired,
  locations: string.isRequired,
  vessels: string.isRequired,
});

export default phrases;
