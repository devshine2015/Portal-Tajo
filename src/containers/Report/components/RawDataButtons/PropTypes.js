import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  save_btn_label: 'Save raw data',
  toggle_warn: 'I need to choose more vehicles',
  hint_text: 'Pick up to 3 vehicles for getting events',
};

export const phrasesShape = shape({
  save_btn_label: string.isRequired,
  toggle_warn: string.isRequired,
  hint_text: string.isRequired,
});

export default phrases;
