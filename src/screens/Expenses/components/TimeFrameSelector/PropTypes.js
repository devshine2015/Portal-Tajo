import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  select_date_text: 'select date here',
};

export const phrasesShape = shape({
  select_date_text: string.isRequired,
});

export default phrases;
