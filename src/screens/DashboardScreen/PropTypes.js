import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  fleet_summary_title: 'fleet summary',
};

export const phrasesShape = shape({
  fleet_summary_title: string.isRequired,
});

export default phrases;
