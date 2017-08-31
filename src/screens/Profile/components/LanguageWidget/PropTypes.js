import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

export default {
  language_settings_title: 'Language',
  language_settings_main_text: 'Application language',
};

export const phrasesShape = shape({
  language_settings_main_text: string.isRequired,
  language_settings_title: string.isRequired,
});
