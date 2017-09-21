import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = [
  'vehicles_amount',
  'never_reported',
  'fleet_summary_title',
];

export const phrasesShape = shape({
  vehicles_amount: string.isRequired,
  never_reported: string.isRequired,
  fleet_summary_title: string.isRequired,
});

export default phrases;
