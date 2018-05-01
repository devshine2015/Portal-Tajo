import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  hide_text: 'Hide',
  show_text: 'Show',
  vehicles: 'Vehicles',
  locations: 'Locations',
};

export const phrasesShape = shape({
  hide_text: string.isRequired,
  show_text: string.isRequired,
  vehicles: string.isRequired,
  locations: string.isRequired,
});

export default phrases;
