import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  choose_date_format: 'Choose date format for the report',
};

export const phrasesShape = shape({
  choose_date_format: string.isRequired,
});

export default phrases;
