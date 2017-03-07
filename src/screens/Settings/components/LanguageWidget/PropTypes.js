import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

export default {
  language_settings_title: 'Language',
  language_settings_main_text: 'Application language',
};

export const phrasesShape = shape({
  language_settings_main_text: string.isRequired,
  language_settings_title: string.isRequired,
});
