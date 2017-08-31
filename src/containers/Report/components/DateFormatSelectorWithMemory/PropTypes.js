import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  choose_date_format: 'Choose date format for the report',
  remember_choice: 'Remember my choice',
  forget_choice: 'Forget my choice',
};

export const phrasesShape = shape({
  choose_date_format: string.isRequired,
  remember_choice: string.isRequired,
  forget_choice: string.isRequired,
});

export default phrases;
